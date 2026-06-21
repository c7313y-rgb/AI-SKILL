# AIスキル診断アプリ / GitHub Pages公開版

個人のAIスキル習得度を診断し、スキルスコア、活用領域、関心領域とのギャップ、推奨講座、学習ロードマップ、報酬額・市場価値の参考情報を可視化する静的Webアプリです。

## 今回の最終改修内容

- 既存機能を維持
  - 24問診断
  - 6領域スコアリング
  - AIスキル習得度の総合判定
  - 関心領域別のスキル差分表示
  - 推奨講座・組み合わせプラン提案
  - 学習ロードマップ生成
  - JSON保存 / コピー / 印刷PDF
  - Googleフォーム連携用フォーム
- UIを高品位なダッシュボード型に改修
  - シャープな書体設計
  - 高コントラストのカードUI
  - スマホ・タブレット・PC対応
  - GitHub Pagesで崩れにくい相対パス構成
- 実写版イメージ素材をアプリ表示向けに再生成・最適化
  - ヒーロービジュアル
  - 診断結果ダッシュボード
  - 講座カード
  - 業務活用・学習・キャリアアップシーン
- 診断結果画面を強化
  - AI Skill Passport風の称号表示
  - Rank S+/S/A/B/C/D
  - 推定上位クラス表示
  - Next Quest表示
  - 強み・解放条件・市場価値シグナル
  - 講座導線の強化
- PWA対応
  - `manifest.webmanifest`
  - `sw.js`
  - アプリアイコン
  - `.nojekyll`

## ファイル構成

```text
/
├── index.html
├── styles.css
├── script.js
├── manifest.webmanifest
├── sw.js
├── .nojekyll
├── README.md
├── DEPLOY_CHECKLIST.md
├── GOOGLE_FORMS_SETUP.md
└── assets/
    ├── hero-ai-skill.jpg
    ├── result-dashboard.jpg
    ├── diagnosis-ui.jpg
    ├── overview-dashboard.jpg
    ├── course-*.jpg
    ├── icon-192.png
    └── icon-512.png
```

## GitHub Pages公開手順

1. このZIPを展開します。
2. 中身をGitHubリポジトリのルートに配置します。
3. GitHubにpushします。
4. GitHubのリポジトリ画面で `Settings` → `Pages` を開きます。
5. `Build and deployment` で以下を指定します。
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. 表示されたURLにアクセスします。

既存URL `https://c7313y-rgb.github.io/AI-skillcheck/` で公開する場合は、`AI-skillcheck` リポジトリのルートにこの中身を上書き配置してください。

## Googleフォーム連携

`GOOGLE_FORMS_SETUP.md` を参照し、`script.js` 内の `GOOGLE_FORMS_CONFIG` を設定してください。未設定でもアプリ本体は動作し、送信デモはブラウザ内保存として扱われます。

## 動作確認

- `node --check script.js`
- `node --check sw.js`
- HTML内IDとJS参照IDの整合確認
- 画像参照パス確認

## 注意

本アプリの報酬額・市場価値表示は参考情報です。個別の昇給、転職、報酬増加を保証するものではありません。
