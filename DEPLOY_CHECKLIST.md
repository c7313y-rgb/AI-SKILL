# GitHub Pages公開チェックリスト

## 配置前

- [ ] `index.html` がリポジトリ直下にある
- [ ] `styles.css` がリポジトリ直下にある
- [ ] `script.js` がリポジトリ直下にある
- [ ] `assets/` フォルダがリポジトリ直下にある
- [ ] `.nojekyll` がある
- [ ] `manifest.webmanifest` がある
- [ ] `sw.js` がある

## GitHub Pages設定

- [ ] Settings → Pages を開く
- [ ] Source: Deploy from a branch
- [ ] Branch: main
- [ ] Folder: /root
- [ ] 保存後、公開URLを開く

## 表示確認

- [ ] ヒーロー画像が表示される
- [ ] サイドメニューが表示される
- [ ] スマホ幅でレイアウトが崩れない
- [ ] 「診断をはじめる」へ移動できる
- [ ] 24問が表示される
- [ ] 回答進捗バーが動く
- [ ] デモ回答ボタンが動く
- [ ] 診断結果が表示される
- [ ] レーダーチャートが表示される
- [ ] 推奨講座カード画像が表示される
- [ ] JSON保存ができる
- [ ] 印刷 / PDFができる

## よくある失敗

- 画面が白い：`index.html` がルートに置かれていない可能性があります。
- 画像が出ない：`assets` フォルダを丸ごとアップロードしてください。
- 古い表示のまま：ブラウザのキャッシュを削除するか、GitHub Pagesの反映を数分待ってください。
- Googleフォームに送信されない：`script.js` の `GOOGLE_FORMS_CONFIG` が未設定です。
