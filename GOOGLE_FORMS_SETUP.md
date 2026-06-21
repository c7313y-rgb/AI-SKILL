# Googleフォーム連携設定手順

このアプリは静的Webアプリのため、サーバーを使わずにGoogleフォームの `formResponse` へPOST送信します。

## 1. Googleフォームに作成する項目

以下をすべて「記述式」または「段落」で作成してください。

1. お名前
2. メールアドレス
3. 所属・学校・会社
4. 利用者タイプ
5. AIスキル習得度
6. レベル
7. 関心テーマ
8. 推奨講座
9. 希望する学習形式
10. メモ・補足
11. 診断JSON

## 2. formResponse URLを取得

1. Googleフォームを作成
2. フォームをプレビュー表示
3. ブラウザの「ページのソースを表示」
4. `form action=".../formResponse"` を検索
5. URLを `script.js` の `formActionUrl` に貼り付け

## 3. entry IDを取得

フォームの各入力欄には `entry.xxxxxxxxx` というIDが割り当てられます。
プレビュー画面のHTMLソースから各設問に対応する `entry.` を取得し、`script.js` の `entries` に貼り付けてください。

## 4. script.jsの設定例

```js
const GOOGLE_FORMS_CONFIG = {
  enabled: true,
  formActionUrl: "https://docs.google.com/forms/d/e/xxxxxxxx/formResponse",
  entries: {
    name: "entry.1111111111",
    email: "entry.2222222222",
    organization: "entry.3333333333",
    userType: "entry.4444444444",
    totalScore: "entry.5555555555",
    level: "entry.6666666666",
    interests: "entry.7777777777",
    recommendedCourses: "entry.8888888888",
    learningMode: "entry.9999999999",
    notes: "entry.1010101010",
    diagnosisJson: "entry.1212121212"
  }
};
```

## 5. 動作確認

1. GitHub Pagesへアップロード
2. 診断を実行
3. 学習プラン送信フォームを入力
4. Googleフォームの回答タブに届くか確認

## 注意

- GoogleフォームはCORSの都合上、送信成功/失敗の詳細レスポンスを返しません。
- `mode: "no-cors"` のため、ブラウザ上は送信リクエスト完了を成功扱いにしています。
- 実運用前に必ず回答タブで着信確認してください。
