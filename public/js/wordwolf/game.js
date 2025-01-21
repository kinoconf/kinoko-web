let displayPlayerCount = 0;
let cards = [];

function gameSetting(){
  document.querySelector('#section-1').style = 'display: none;';
  document.querySelector('#section-2').style = 'display: block;';
}

function inputName(){
  const playerCount = document.querySelector('#player_num');
  if (playerCount.value === '') {
    alert('プレイヤー数を入力してください');
    return;
  }
  const playerCountNum = parseInt(playerCount.value, 10);
  
  document.querySelector('#section-2').style = 'display: none;';
  const playerNameInputs = document.querySelector('#player_name_input');
  for (let i = 0; i < playerCountNum; i++) {
    const li = document.createElement('li');
    li.textContent = `プレイヤー${i + 1}：`;
    const playerNameInput = document.createElement('input');
    li.appendChild(playerNameInput);
    playerNameInput.type = 'text';
    playerNameInput.name = `player_name_${i}`;
    playerNameInput.id = `player_name_${i}`;
    playerNameInput.placeholder = `プレイヤー${i + 1}`;
    playerNameInputs.appendChild(li);
  }
  document.querySelector('#section-3').style = 'display: block;';
}
function deliveryCard(){
  const playerCount = document.querySelector('#player_num');
  const playerCountNum = parseInt(playerCount.value, 10);
  for (let i = 0; i < playerCountNum; i++) {
    const playerName = document.querySelector(`#player_name_${i}`);
    if (playerName.value === '') {
      alert('プレイヤー名を入力してください');
      return;
    }
  }
  const wordPear = wordList[Math.floor(Math.random() * wordList.length)];
  const wordSheffledPear = cardShuffle(wordPear);
  const baseCards = [...Array(playerCountNum)];
  baseCards.fill(wordSheffledPear[0]);
  baseCards.fill(wordSheffledPear[1], playerCountNum - 1);
  cards = cardShuffle(baseCards);

  document.querySelector('#section-3').style = 'display: none;';
  const playerNameConf = document.querySelector('#player_name_conf');
  playerNameConf.textContent = document.querySelector(`#player_name_${displayPlayerCount}`).value;
  document.querySelector('#section-4').style = 'display: block;';
  document.querySelector('#section-4-1').style = 'display: block;';
}

function openCard(){
  document.querySelector('#section-4-1').style = 'display: none;';
  const playerName = document.querySelector('#player_name');
  playerName.textContent = document.querySelector(`#player_name_${displayPlayerCount}`).value;
  const cardName = document.querySelector('#card_name');
  cardName.textContent = cards[displayPlayerCount];
  displayPlayerCount++;
  document.querySelector('#section-4-2').style = 'display: block;';
}

function nextPlayer(){
  if (displayPlayerCount === cards.length) {
    startGame();
    return;
  }
  document.querySelector('#section-4-2').style = 'display: none;';
  const playerNameConf = document.querySelector('#player_name_conf');
  playerNameConf.textContent = document.querySelector(`#player_name_${displayPlayerCount}`).value;
  document.querySelector('#section-4-1').style = 'display: block;';
}

function startGame(){
  document.querySelector('#section-4').style = 'display: none;';
  document.querySelector('#section-5').style = 'display: block;';

}
function finishGame(){
  document.querySelector('#section-5').style = 'display: none;';
  const playerCount = document.querySelector('#player_num');
  const answerList = document.querySelector('#answer');
  const playerCountNum = parseInt(playerCount.value, 10);
  for (let i = 0; i < playerCountNum; i++) {
    const playerName = document.querySelector(`#player_name_${i}`);
    const li = document.createElement('li');
    li.textContent = `${playerName.value}：${cards[i]}`;
    answerList.appendChild(li);
  }
  document.querySelector('#section-6').style = 'display: block;';

}
function reset(){
  document.querySelector('#section-2').style = 'display: none;';
  document.querySelector('#section-3').style = 'display: none;';
  document.querySelector('#section-4').style = 'display: none;';
  document.querySelector('#section-4-1').style = 'display: none;';
  document.querySelector('#section-4-2').style = 'display: none;';
  document.querySelector('#section-5').style = 'display: none;';
  document.querySelector('#section-6').style = 'display: none;';
  displayPlayerCount = 0;
  cards = [];
  document.querySelector('#player_num').value = '5';
  document.querySelector('#player_name_input').innerHTML = '';
  document.querySelector('#answer').innerHTML = '';
  document.querySelector('#section-1').style = 'display: block;';
}

function cardShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [array[i], array[r]] = [array[r], array[i]];
  }
  return array;
}

// お題のリスト
const wordList = [
  ['Java', 'Rust'],
  ['Windows', 'Mac'],
  ['スペシャリスト', 'ジェネラリスト']
];