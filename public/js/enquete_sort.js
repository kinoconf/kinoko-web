// 各設問のソート順・複数回答フラグの定義
// sortOrder: null → 票数の多い順（「回答しない」「その他」は末尾固定）
// sortOrder: [...] → 指定の順序で表示
// multipleChoice: true → 延べ回答数と回答者数を両方表示

const QUESTION_CONFIG = {
  "1.あなたの年齢をお教えください": {
    sortOrder: ["〜19歳", "20〜29歳", "30〜39歳", "40〜49歳", "50〜59歳", "60歳〜"],
    multipleChoice: false,
  },
  "2.あなたのお住まいを教えてください": {
    sortOrder: ["北海道", "東北", "関東", "中部", "近畿", "中国", "九州沖縄", "回答しない"],
    multipleChoice: false,
  },
  "3.どこでこのカンファレンスを知りましたか？（複数回答可）": {
    sortOrder: null,
    multipleChoice: true,
  },
  "4.あなたの職業を教えてください": {
    sortOrder: null,
    multipleChoice: false,
  },
  "5.あなたが所属する企業の業種を教えてください": {
    sortOrder: null,
    multipleChoice: false,
  },
  "6.あなたが所属する企業の規模を教えてください": {
    sortOrder: ["-100名", "101-400名", "401-1000名", "1001-名", "所属していない", "回答しない"],
    multipleChoice: false,
  },
  "今後のキャリア形成において、現在実践している、または今後検討したい働き方はありますか？": {
    sortOrder: null,
    multipleChoice: false,
  },
  "AIの進歩によってご自身のキャリアが影響を受けている・受けそうだと感じていますか？": {
    sortOrder: ["強く感じている", "まぁ感じている", "わからない", "あまり感じていない", "全く感じない", "回答しない"],
    multipleChoice: false,
  },
  "エンジニアとして最も「やりがい」を感じる瞬間はどれですか？": {
    sortOrder: null,
    multipleChoice: false,
  },
};
