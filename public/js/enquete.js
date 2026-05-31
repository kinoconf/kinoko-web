const CHART_COLORS = [
  "#228b22", "#daa520", "#cd853f", "#3cb371",
  "#a0522d", "#6b8e23", "#d2691e", "#2e8b57",
  "#b8860b", "#8fbc8f", "#556b2f", "#f4a460",
  "#9acd32", "#8b4513", "#5f9ea0", "#deb887",
  "#2f4f2f", "#c8a951",
];

const TRAILING_LABELS = ["回答しない", "その他"];

function sortEntries(entries, sortOrder) {
  if (sortOrder) {
    return [...entries].sort(([a], [b]) => {
      const ai = sortOrder.indexOf(a);
      const bi = sortOrder.indexOf(b);
      if (ai === -1 && bi === -1) return b[1] - a[1];
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }
  return [...entries].sort(([labelA, countA], [labelB, countB]) => {
    const aTrail = TRAILING_LABELS.includes(labelA);
    const bTrail = TRAILING_LABELS.includes(labelB);
    if (aTrail && !bTrail) return 1;
    if (!aTrail && bTrail) return -1;
    return countB - countA;
  });
}

function buildVoteLabel(data, config, respondentCount) {
  const total = Object.values(data).reduce((s, v) => s + v, 0);
  if (config.multipleChoice) {
    return `回答者数：${respondentCount}票　／　延べ回答数：${total}票`;
  }
  return `有効投票数：${total}票`;
}

function renderChart(containerId, question, data, config, respondentCount) {
  const entries = Object.entries(data);
  const sorted = sortEntries(entries, config.sortOrder);
  const labels = sorted.map(([label]) => label);
  const series = sorted.map(([, count]) => count);
  const total = series.reduce((s, v) => s + v, 0);

  const options = {
    chart: {
      type: "pie",
      height: 380,
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    series,
    labels,
    colors: CHART_COLORS.slice(0, labels.length),
    legend: {
      position: "bottom",
      fontFamily: "'BIZ UDPGothic', sans-serif",
      fontSize: "12px",
      markers: { size: 8 },
      itemMargin: { horizontal: 8, vertical: 4 },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const count = opts.w.config.series[opts.seriesIndex];
        return `${count}票`;
      },
      style: { fontSize: "11px", fontFamily: "'BIZ UDPGothic', sans-serif" },
      dropShadow: { enabled: false },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}票（${((val / total) * 100).toFixed(1)}%）`,
      },
    },
    stroke: { width: 2, colors: ["#fff"] },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { height: 320 },
          legend: { position: "bottom", fontSize: "11px" },
          dataLabels: { enabled: false },
        },
      },
    ],
  };

  new ApexCharts(document.getElementById(containerId), options).render();
}

async function init() {
  const res = await fetch("./enquete_result.json");
  const allData = await res.json();

  const meta = allData["_meta"] || {};

  if (meta.updated_at) {
    const el = document.getElementById("updated-at");
    if (el) el.textContent = `更新日：${meta.updated_at}`;
  }

  // Q1の合計を回答者数の基準とする
  const q1Data = allData["1.あなたの年齢をお教えください"] || {};
  const respondentCount = Object.values(q1Data).reduce((s, v) => s + v, 0);

  const grid = document.getElementById("charts-grid");

  Object.entries(allData)
    .filter(([key]) => !key.startsWith("_"))
    .forEach(([question, data], i) => {
      const config = QUESTION_CONFIG[question] || { sortOrder: null, multipleChoice: false };
      const chartId = `chart-${i}`;
      const voteLabel = buildVoteLabel(data, config, respondentCount);

      const card = document.createElement("div");
      card.className = "chart-card";
      card.innerHTML = `
        <h2 class="chart-title">${question}</h2>
        <p class="vote-count">${voteLabel}</p>
        <div id="${chartId}" class="chart-area"></div>
      `;
      grid.appendChild(card);

      renderChart(chartId, question, data, config, respondentCount);
    });
}

init();
