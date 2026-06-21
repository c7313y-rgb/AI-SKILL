"use strict";

const GOOGLE_FORMS_CONFIG = {
  enabled: false,
  formActionUrl: "", // 例: https://docs.google.com/forms/d/e/xxxx/formResponse
  entries: {
    name: "entry.0000000001",
    email: "entry.0000000002",
    organization: "entry.0000000003",
    userType: "entry.0000000004",
    totalScore: "entry.0000000005",
    level: "entry.0000000006",
    interests: "entry.0000000007",
    recommendedCourses: "entry.0000000008",
    learningMode: "entry.0000000009",
    notes: "entry.0000000010",
    diagnosisJson: "entry.0000000011"
  }
};

const CATEGORIES = [
  { key: "literacy", label: "AI基礎理解", color: "#0978ee" },
  { key: "prompt", label: "プロンプト活用", color: "#14c4d8" },
  { key: "business", label: "業務改善", color: "#ff9f2f" },
  { key: "data", label: "データ活用", color: "#7b61ff" },
  { key: "automation", label: "開発・自動化", color: "#20b977" },
  { key: "governance", label: "ガバナンス", color: "#12a6a3" }
];

const INTERESTS = [
  { key: "productivity", label: "業務効率化", icon: "⚡", targets: { business: 88, prompt: 82, automation: 70, literacy: 70 } },
  { key: "documents", label: "資料作成・情報発信", icon: "📝", targets: { prompt: 88, literacy: 74, governance: 68 } },
  { key: "dataDecision", label: "データ分析・意思決定", icon: "📊", targets: { data: 88, business: 78, literacy: 70 } },
  { key: "revenue", label: "新規事業・収益化", icon: "💡", targets: { business: 86, data: 78, prompt: 76, governance: 70 } },
  { key: "implementation", label: "社内AI実装", icon: "🏢", targets: { business: 86, automation: 82, governance: 80, data: 74 } },
  { key: "development", label: "開発・自動化", icon: "⌘", targets: { automation: 90, prompt: 82, governance: 72 } },
  { key: "agent", label: "AIエージェント", icon: "🤖", targets: { automation: 92, data: 82, governance: 82, business: 78 } },
  { key: "learning", label: "学習・進路", icon: "🎓", targets: { literacy: 82, prompt: 80, data: 68, governance: 74 } },
  { key: "governance", label: "安全利用・ガバナンス", icon: "🛡", targets: { governance: 90, literacy: 80, data: 72 } }
];

const QUESTIONS = [
  { id: "q01", category: "AI基礎理解", text: "生成AIの得意・不得意、誤回答が起きる理由を説明できる", weights: { literacy: 1, governance: 0.3 } },
  { id: "q02", category: "AI基礎理解", text: "業務や学習の中で、AIに任せる部分と人が確認する部分を切り分けられる", weights: { literacy: 0.8, business: 0.5, governance: 0.4 } },
  { id: "q03", category: "プロンプト活用", text: "目的、条件、出力形式を指定して、文書作成・要約・調査を行える", weights: { prompt: 1, literacy: 0.2 } },
  { id: "q04", category: "プロンプト活用", text: "AIの回答をそのまま使わず、根拠確認・追加質問・修正指示で品質を上げられる", weights: { prompt: 0.8, governance: 0.5 } },
  { id: "q05", category: "業務改善", text: "日常業務の手順を分解し、AIで短縮・自動化できる箇所を見つけられる", weights: { business: 1, prompt: 0.3 } },
  { id: "q06", category: "業務改善", text: "Excel、スプレッドシート、議事録、レポートなどの業務をAIで効率化できる", weights: { business: 0.9, data: 0.3, prompt: 0.3 } },
  { id: "q07", category: "データ活用", text: "データやグラフから示唆を読み取り、意思決定や提案に活かせる", weights: { data: 1, business: 0.4 } },
  { id: "q08", category: "データ活用", text: "AIに分析の観点を出させ、仮説、KPI、検証方法を整理できる", weights: { data: 0.8, business: 0.6, prompt: 0.3 } },
  { id: "q09", category: "開発・自動化", text: "ノーコード/ローコードで、簡単な業務Botやワークフローを設計するイメージがある", weights: { automation: 1, business: 0.4 } },
  { id: "q10", category: "開発・自動化", text: "AIコーディング支援を使って、修正案、テスト、簡単なコード生成を進められる", weights: { automation: 1, prompt: 0.3, governance: 0.2 } },
  { id: "q11", category: "ガバナンス", text: "個人情報、著作権、機密情報、社内データ利用時の注意点を理解している", weights: { governance: 1, literacy: 0.3 } },
  { id: "q12", category: "ガバナンス", text: "AI利用ルール、承認フロー、レビュー観点をチーム内で整える必要性を説明できる", weights: { governance: 1, business: 0.4 } },
  { id: "q13", category: "DX推進", text: "AI導入テーマを、効果・実現性・リスク・優先順位で評価できる", weights: { business: 0.9, data: 0.5, governance: 0.3 } },
  { id: "q14", category: "DX推進", text: "現場ヒアリングから課題を抽出し、AI活用の要件や成果物に落とし込める", weights: { business: 1, prompt: 0.3, data: 0.2 } },
  { id: "q15", category: "データマネジメント", text: "社内データの所在、権限、品質、更新頻度を確認する観点を持っている", weights: { data: 0.9, governance: 0.5 } },
  { id: "q16", category: "データマネジメント", text: "RAGやナレッジ検索など、自社データをAIに参照させる仕組みを大まかに説明できる", weights: { data: 0.8, automation: 0.5, governance: 0.4 } },
  { id: "q17", category: "開発・実装", text: "Dify、Zapier、Make、Power Automateなどの自動化ツールで実装を検討できる", weights: { automation: 1, business: 0.4 } },
  { id: "q18", category: "開発・実装", text: "AIエージェント、API連携、評価ログ、運用改善の基本概念を理解している", weights: { automation: 0.9, governance: 0.5, data: 0.4 } },
  { id: "q19", category: "情報発信", text: "AIを使って企画書、LP、メール、SNS、プレゼンの初稿を作成し、目的に合わせて修正できる", weights: { prompt: 0.9, business: 0.4, literacy: 0.2 } },
  { id: "q20", category: "情報発信", text: "AI生成物のトーン、事実確認、引用、ブランド表現を確認して公開判断できる", weights: { prompt: 0.6, governance: 0.7 } },
  { id: "q21", category: "学習・育成", text: "自分やチームのAIスキル不足を言語化し、学習計画に落とし込める", weights: { literacy: 0.6, business: 0.5, governance: 0.2 } },
  { id: "q22", category: "学習・育成", text: "AI活用を一度で終わらせず、定着・共有・改善まで続ける仕組みを考えられる", weights: { business: 0.8, governance: 0.5 } },
  { id: "q23", category: "価値創出", text: "AI活用をコスト削減だけでなく、売上、顧客体験、新規サービスに結びつけて考えられる", weights: { business: 0.9, data: 0.4, prompt: 0.3 } },
  { id: "q24", category: "価値創出", text: "AI導入後の効果測定、KPI、ROI、改善サイクルを設計するイメージがある", weights: { business: 0.8, data: 0.7, governance: 0.3 } }
];

const ADULT_COURSES = [
  { id: "A01", title: "生成AI活用", tag: "全社員・入門", image: "course-01-genai.jpg", categories: ["literacy", "prompt", "governance"], interests: ["documents", "productivity", "learning", "revenue"], mode: "動画＋オンラインQA", hours: "3h動画＋1.5h", price: "動画8,000円/ID・Live22万円/20名", note: "AI基礎、プロンプト、調査、要約、文書作成、情報漏洩防止の入口に最適。" },
  { id: "A02", title: "Microsoft 365 Copilot / Copilot Studio活用", tag: "M365導入企業", image: "course-02-m365.jpg", categories: ["business", "prompt", "automation"], interests: ["productivity", "documents", "implementation"], mode: "オンラインLive", hours: "6h", price: "Live38万円/20名", note: "Word、Excel、PowerPoint、Outlook、TeamsでのCopilot活用と業務テンプレート化。" },
  { id: "A03", title: "Google Gemini活用", tag: "Google Workspace", image: "course-03-gemini.jpg", categories: ["business", "prompt", "literacy"], interests: ["productivity", "documents", "learning"], mode: "動画＋オンライン", hours: "4h", price: "動画10,000円/ID・Live25万円/20名", note: "Gmail、Docs、Slides、Drive連携を前提に、資料作成と業務効率化を進める。" },
  { id: "A04", title: "Excel業務改善", tag: "管理・営業・バックオフィス", image: "course-04-excel.jpg", categories: ["business", "data", "prompt"], interests: ["productivity", "dataDecision"], mode: "オンラインLive", hours: "5h", price: "Live30万円/20名", note: "関数、集計、可視化、レポート作成をAIで短縮し、日常業務の改善に直結。" },
  { id: "A05", title: "データAIプロジェクトマネジメント", tag: "管理職・PM", image: "course-05-project.jpg", categories: ["business", "data", "governance"], interests: ["implementation", "revenue", "dataDecision", "governance"], mode: "オンラインWS", hours: "1日", price: "Live45万円/15名", note: "PoC設計、KPI、ROI、リスク、要件整理まで扱う推進者向け。" },
  { id: "A06", title: "Dify活用", tag: "業務Bot・RAG", image: "course-06-dify.jpg", categories: ["automation", "data", "governance"], interests: ["implementation", "agent", "productivity"], mode: "Live必須", hours: "1日", price: "Live58万円/15名", note: "FAQ Bot、RAG、チャットボット、ワークフローの実装入口。" },
  { id: "A07", title: "Cursor入門", tag: "開発者・IT部門", image: "course-07-cursor.jpg", categories: ["automation", "prompt"], interests: ["development"], mode: "オンラインLive", hours: "4h", price: "Live28万円/15名", note: "AIコード補完、修正、リファクタリングの基本を短時間で習得。" },
  { id: "A08", title: "GitHub Copilot入門", tag: "開発組織", image: "course-08-github.jpg", categories: ["automation", "governance"], interests: ["development", "implementation"], mode: "オンラインLive", hours: "1日", price: "Live42万円/15名", note: "コード生成、レビュー、テスト生成、組織ポリシーまで扱う。" },
  { id: "A09", title: "Claude Code入門", tag: "高度開発", image: "course-09-claude.jpg", categories: ["automation", "prompt", "governance"], interests: ["development", "agent"], mode: "Live/対面推奨", hours: "1日", price: "Live60万円/10名", note: "プロジェクト読込、タスク分解、修正・テスト・デバッグの実践。" },
  { id: "A10", title: "仕様駆動開発（SDD）", tag: "PM・テックリード", image: "course-10-sdd.jpg", categories: ["automation", "business", "governance"], interests: ["development", "agent", "implementation"], mode: "WS必須", hours: "1日", price: "Live65万円/12名", note: "仕様書、受入条件、Definition of Done、AI開発ワークフローを整える。" },
  { id: "A11", title: "AIエージェント構築", tag: "上級・内製化", image: "course-11-agent.jpg", categories: ["automation", "data", "governance", "business"], interests: ["agent", "implementation", "revenue"], mode: "Live/対面必須", hours: "2日", price: "Live98万円/10名", note: "RAG、API連携、評価、ログ、運用設計まで扱うプレミアム講座。" }
];

const EDUCATION_COURSES = [
  { id: "E01", title: "AI講座 for education 基礎", tag: "全学年・入門", image: "student-learning.jpg", categories: ["literacy", "prompt", "governance"], interests: ["learning", "documents"], mode: "オンデマンド＋オンライン", hours: "2〜4コマ", price: "学校導入プラン", note: "生成AIの基本、安全利用、調べ方、まとめ方を学ぶ入口講座。" },
  { id: "E02", title: "生成AIリテラシー実践", tag: "情報・探究", image: "diagnosis-ui.jpg", categories: ["literacy", "prompt", "business"], interests: ["learning", "documents", "productivity"], mode: "授業・オンライン", hours: "4〜6コマ", price: "学校導入プラン", note: "AIを使った調査、要約、比較、発表資料作成を実践。" },
  { id: "E03", title: "AI×探究・課題解決PBL", tag: "探究学習", image: "business-learning.jpg", categories: ["business", "data", "prompt"], interests: ["learning", "revenue", "dataDecision"], mode: "ワークショップ", hours: "4〜8コマ", price: "学校導入プラン", note: "地域・企業テーマをAIで調査し、課題設定、仮説、発表まで行う。" },
  { id: "E04", title: "AIクリエイティブ表現", tag: "創作・表現", image: "overview-dashboard.jpg", categories: ["prompt", "literacy", "governance"], interests: ["documents", "learning"], mode: "授業・オンデマンド", hours: "2〜4コマ", price: "学校導入プラン", note: "文章、画像、4コマ、絵本、プレゼンなど、表現活動でAIを安全に活用。" },
  { id: "E05", title: "Python・データサイエンス基礎", tag: "発展・STEAM", image: "course-07-cursor.jpg", categories: ["data", "automation", "literacy"], interests: ["dataDecision", "development", "learning"], mode: "オンラインLive", hours: "6〜10コマ", price: "学校導入プラン", note: "データの読み取り、可視化、簡単なコード理解までを学ぶ。" },
  { id: "E06", title: "AI進路・キャリア探究", tag: "キャリア教育", image: "career-up.jpg", categories: ["literacy", "business", "data"], interests: ["learning", "revenue"], mode: "授業・ワークショップ", hours: "2〜4コマ", price: "学校導入プラン", note: "AI時代の職業変化、必要スキル、学習計画を自分ごと化する。" },
  { id: "E07", title: "AI安全利用・情報モラル", tag: "全校導入向け", image: "online-live.jpg", categories: ["governance", "literacy"], interests: ["governance", "learning"], mode: "オンデマンド＋確認テスト", hours: "1〜2コマ", price: "学校導入プラン", note: "著作権、個人情報、ファクトチェック、生成物の扱いを学ぶ。" }
];

const PACKAGES = [
  { id: "P1", title: "Lite：AI業務改善スターター", courses: ["A01", "A04"], price: "49.8万円", hours: "10h", target: "AIを何から始めるか整理したい部門", image: "package-business.jpg" },
  { id: "P2", title: "Office AI：Office/Google横断活用", courses: ["A01", "A02", "A03", "A04"], price: "98万円", hours: "12h", target: "全社展開・アンバサダー育成", image: "online-live.jpg" },
  { id: "P3", title: "Business PM：AI導入推進者育成", courses: ["A01", "A04", "A05", "A06"], price: "160万円", hours: "18h", target: "PoC設計・Dify活用・DX推進", image: "package-business.jpg" },
  { id: "P4", title: "Dev Starter：AIコーディング導入", courses: ["A07", "A08", "A10"], price: "130万円", hours: "16h", target: "開発組織のAI活用・品質担保", image: "course-10-sdd.jpg" },
  { id: "P5", title: "Agent Premium：AIエージェント内製化", courses: ["A06", "A09", "A10", "A11"], price: "260万円〜", hours: "30h", target: "RAG・Agent・SDD・内製化", image: "course-11-agent.jpg" },
  { id: "P6", title: "Enterprise：3か月伴走パック", courses: ["A05", "A06", "A11"], price: "350万円〜", hours: "40h〜", target: "PoC計画・評価設計・社内展開ロードマップ", image: "course-05-project.jpg" }
];

let latestResult = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function init() {
  renderInterests();
  renderQuestions();
  restoreDraft();
  bindEvents();
}

function renderInterests() {
  const root = $("#interestList");
  root.innerHTML = INTERESTS.map((item, idx) => `
    <label class="interest-chip">
      <input type="checkbox" name="interests" value="${item.key}" ${idx < 2 ? "checked" : ""}>
      <span>${item.icon} ${item.label}</span>
    </label>
  `).join("");
}

function renderQuestions() {
  const root = $("#questionList");
  const template = $("#questionTemplate");
  root.innerHTML = "";
  QUESTIONS.forEach((q, idx) => {
    const node = template.content.cloneNode(true);
    $(".qno", node).textContent = String(idx + 1).padStart(2, "0");
    $(".qcategory", node).textContent = q.category;
    $("h4", node).textContent = q.text;
    const rating = $(".rating-row", node);
    rating.setAttribute("aria-label", q.text);
    rating.innerHTML = [1,2,3,4,5].map(value => `
      <label title="${value}">
        <input type="radio" name="${q.id}" value="${value}" ${value === 3 ? "checked" : ""}>
        <span>${value}</span>
      </label>
    `).join("");
    root.appendChild(node);
  });
}

function bindEvents() {
  registerServiceWorker();
  setupScrollSpy();
  updateAnswerProgress();
  $$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => $(btn.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' })));
  $$(`#questionList input[type="radio"]`).forEach(input => input.addEventListener("change", updateAnswerProgress));
  $("#diagnosisForm").addEventListener("submit", handleDiagnosisSubmit);
  $("#demoFill").addEventListener("click", fillDemoAnswers);
  $("#saveDraft").addEventListener("click", saveDraft);
  $("#copyResult").addEventListener("click", copyResult);
  $("#downloadJson").addEventListener("click", downloadJson);
  $("#printReport").addEventListener("click", () => window.print());
  $("#copyPlan").addEventListener("click", copyPlan);
  $("#planForm").addEventListener("submit", handlePlanSubmit);
}

function updateAnswerProgress() {
  const bar = $("#answerProgress");
  if (!bar) return;
  const answered = QUESTIONS.filter(q => document.querySelector(`input[name="${q.id}"]:checked`)).length;
  bar.style.width = `${Math.round(answered / QUESTIONS.length * 100)}%`;
}

function setupScrollSpy() {
  const links = $$(".side-nav a[href^='#']");
  const targets = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!targets.length) return;
  const activate = () => {
    const y = window.scrollY + 140;
    let current = targets[0];
    for (const target of targets) { if (target.offsetTop <= y) current = target; }
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`));
  };
  window.addEventListener("scroll", activate, { passive: true });
  activate();
}

function registerServiceWorker() {
  if (location.protocol === "file:" || !("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function fillDemoAnswers() {
  QUESTIONS.forEach((q, index) => {
    const base = [4,4,5,4,4,4,3,4,3,2,4,3,4,3,3,2,2,2,4,3,4,3,3,3][index] || 3;
    const input = document.querySelector(`input[name="${q.id}"][value="${base}"]`);
    if (input) input.checked = true;
  });
  updateAnswerProgress();
  toast("デモ回答を入力しました");
}

function getFormData() {
  const form = $("#diagnosisForm");
  const data = Object.fromEntries(new FormData(form).entries());
  data.interests = $$('input[name="interests"]:checked').map(input => input.value);
  data.userType = data.userType || "adult";
  data.baseIncome = Number(data.baseIncome || 0);
  data.answers = {};
  QUESTIONS.forEach(q => {
    const checked = $(`input[name="${q.id}"]:checked`);
    data.answers[q.id] = checked ? Number(checked.value) : null;
  });
  return data;
}

function handleDiagnosisSubmit(event) {
  event.preventDefault();
  const data = getFormData();
  if (!data.interests.length) return showError("AIを活かしたいことを1つ以上選択してください。");
  const missing = QUESTIONS.filter(q => !data.answers[q.id]);
  if (missing.length) return showError("未回答の設問があります。すべての設問に回答してください。");
  latestResult = calculateResult(data);
  renderResult(latestResult);
  saveDraft();
  updateAnswerProgress();
  $("#result").classList.remove("hidden");
  $("#result").scrollIntoView({ behavior: "smooth" });
}

function calculateResult(data) {
  const categoryTotals = Object.fromEntries(CATEGORIES.map(c => [c.key, { weighted: 0, max: 0 }]));
  QUESTIONS.forEach(q => {
    const answer = data.answers[q.id];
    Object.entries(q.weights).forEach(([key, weight]) => {
      categoryTotals[key].weighted += answer * 20 * weight;
      categoryTotals[key].max += 100 * weight;
    });
  });
  const categoryScores = Object.fromEntries(CATEGORIES.map(c => {
    const item = categoryTotals[c.key];
    return [c.key, item.max ? Math.round((item.weighted / item.max) * 100) : 0];
  }));
  const weightedAverage = Math.round(CATEGORIES.reduce((sum, c) => sum + categoryScores[c.key], 0) / CATEGORIES.length);
  const level = getLevel(weightedAverage);
  const interestObjects = data.interests.map(key => INTERESTS.find(i => i.key === key)).filter(Boolean);
  const targetScores = buildTargets(interestObjects, data.userType);
  const gaps = Object.entries(targetScores).map(([key, target]) => {
    const category = CATEGORIES.find(c => c.key === key);
    const current = categoryScores[key] || 0;
    return { key, label: category?.label || key, target, current, gap: Math.max(0, target - current) };
  }).sort((a,b) => b.gap - a.gap);
  const courses = recommendCourses(data, categoryScores, gaps);
  const useCases = buildUseCases(data, categoryScores);
  const learningPath = buildLearningPath(data, gaps, courses);
  const value = buildValueEstimate(data, weightedAverage, categoryScores);
  return {
    generatedAt: new Date().toISOString(),
    profile: data,
    categoryScores,
    totalScore: weightedAverage,
    level,
    targetScores,
    gaps,
    courses,
    useCases,
    learningPath,
    value
  };
}

function getLevel(score) {
  if (score >= 92) return { name: "AI Transformation Leader", badge: "S+", comment: "AIを使う人ではなく、AIで成果の出方を設計できる水準です。社内・学校内の標準化、Bot/Agent化、研修展開まで主導できます。" };
  if (score >= 82) return { name: "AI Growth Driver", badge: "S", comment: "AI活用を成果に変え始めています。実装・データ・ガバナンスを接続すれば、組織の推進役としてかなり強い状態です。" };
  if (score >= 70) return { name: "AI Business Operator", badge: "A", comment: "日常業務でAIを武器化できる水準です。次は自分専用の型を作り、再現性のある成果物に変える段階です。" };
  if (score >= 58) return { name: "AI Practical Starter", badge: "B", comment: "基礎と実践の橋を渡り始めています。プロンプト、データ活用、業務分解を伸ばすと一気に使える場面が増えます。" };
  if (score >= 40) return { name: "AI Foundation Builder", badge: "C", comment: "AIを学び始める準備はできています。まずは安全利用と基本プロンプトを固め、毎日の小さな業務で成功体験を作りましょう。" };
  return { name: "AI Rookie", badge: "D", comment: "まだ伸びしろが大きい状態です。最初の2週間で、調べる・まとめる・直す・比べるの4用途を習慣化すると変化が出ます。" };
}

function buildTargets(interests, userType) {
  const targets = Object.fromEntries(CATEGORIES.map(c => [c.key, userType === "student" ? 68 : 72]));
  interests.forEach(item => {
    Object.entries(item.targets).forEach(([key, value]) => {
      targets[key] = Math.max(targets[key] || 0, userType === "student" ? Math.min(value, 84) : value);
    });
  });
  return targets;
}

function recommendCourses(data, categoryScores, gaps) {
  const source = data.userType === "student" ? EDUCATION_COURSES : ADULT_COURSES;
  const interests = new Set(data.interests);
  const lowCats = gaps.filter(g => g.gap >= 10).map(g => g.key);
  const scored = source.map(course => {
    let score = 0;
    course.categories.forEach(cat => {
      score += (100 - (categoryScores[cat] || 0)) * 0.12;
      if (lowCats.includes(cat)) score += 16;
    });
    course.interests.forEach(interest => {
      if (interests.has(interest)) score += 22;
    });
    if (data.userType === "adult" && categoryScores.literacy < 58 && course.id === "A01") score += 32;
    if (data.userType === "student" && categoryScores.literacy < 58 && course.id === "E01") score += 32;
    if (data.userType === "adult" && interests.has("development") && ["A07","A08","A10"].includes(course.id)) score += 18;
    if (data.userType === "adult" && interests.has("agent") && ["A06","A09","A10","A11"].includes(course.id)) score += 18;
    return { ...course, matchScore: Math.round(score) };
  }).sort((a,b) => b.matchScore - a.matchScore);
  const top = uniqueBy(scored, "id").slice(0,5);
  const packageRec = data.userType === "adult" ? recommendPackage(top, data, categoryScores) : null;
  return { top, packageRec };
}

function recommendPackage(topCourses, data, categoryScores) {
  const topIds = new Set(topCourses.map(c => c.id));
  const selected = PACKAGES.map(pkg => {
    let score = pkg.courses.reduce((sum, id) => sum + (topIds.has(id) ? 30 : 0), 0);
    if (data.interests.includes("agent") && pkg.id === "P5") score += 40;
    if (data.interests.includes("development") && pkg.id === "P4") score += 32;
    if (data.interests.includes("implementation") && pkg.id === "P3") score += 34;
    if (data.interests.includes("productivity") && pkg.id === "P1") score += 25;
    if (categoryScores.literacy < 58 && pkg.id === "P2") score += 15;
    return { ...pkg, score };
  }).sort((a,b) => b.score - a.score)[0];
  return selected;
}

function buildUseCases(data, scores) {
  const items = [];
  if (scores.prompt >= 65) items.push("調査、要約、資料作成、議事録整理、メール作成の品質と速度を上げられます。");
  if (scores.business >= 65) items.push("業務プロセスを分解し、AIで短縮できる作業を見つけやすい状態です。");
  if (scores.data >= 65) items.push("データやグラフから示唆を読み取り、企画・改善提案に活かせます。");
  if (scores.automation >= 65) items.push("Bot、自動化、AIコーディング支援など、実装寄りのテーマに進めます。");
  if (scores.governance >= 65) items.push("安全利用、情報管理、社内ルール整備の観点を持ってAI活用を進められます。");
  if (items.length < 3) items.push("基礎理解とプロンプト活用を補強すると、日常業務・学習で使える場面が増えます。", "関心テーマを1つに絞って実践課題を作ると、短期間で成長を実感できます。");
  return items.slice(0,5);
}

function buildLearningPath(data, gaps, courses) {
  const path = [];
  const add = (title, text) => path.push({ title, text });
  if (gaps.find(g => g.key === "literacy" && g.gap > 12)) add("AI基礎理解を整える", "生成AIの仕組み、得意・不得意、リスクを先に押さえると、その後の実践が安定します。");
  if (gaps.find(g => g.key === "prompt" && g.gap > 10)) add("プロンプト活用を型化する", "目的、条件、出力形式、確認観点をテンプレート化して、日常業務・学習で繰り返し使います。");
  if (gaps.find(g => g.key === "business" && g.gap > 10)) add("業務・課題を分解する", "AIを使う前に、対象業務・課題・成果物・KPIを整理すると効果が出やすくなります。");
  if (gaps.find(g => g.key === "data" && g.gap > 10)) add("データ活用を補強する", "データの読み方、可視化、仮説、意思決定へのつなげ方を学びます。");
  if (gaps.find(g => g.key === "automation" && g.gap > 10)) add("実装・自動化に進む", "Dify、AIコーディング、ノーコード、エージェント設計など、実装の選択肢を広げます。");
  if (gaps.find(g => g.key === "governance" && g.gap > 10)) add("安全利用とルールを整える", "個人情報、機密情報、著作権、レビュー、ログ、運用ルールを学びます。");
  if (path.length === 0) add("関心テーマで実践課題を作る", "現在のスキル水準は高めです。推奨講座を使い、社内・学校内で使える成果物を作る段階です。");
  const topCourse = courses.top[0]?.title;
  if (topCourse) add(`推奨講座「${topCourse}」で実践する`, "講座の成果物を自分の業務・学習テーマに置き換え、すぐ使える形にします。");
  return path.slice(0,6);
}

function buildValueEstimate(data, totalScore, scores) {
  if (data.userType === "student") {
    return {
      kind: "student",
      title: "将来の活用領域",
      text: "AIスキルは、進学、探究学習、情報発信、データ分析、将来の職業選択で横断的に活かせます。",
      items: [
        { label: "探究・レポート", value: scores.prompt >= 60 ? "活用しやすい" : "基礎から補強" },
        { label: "データ・STEAM", value: scores.data >= 60 ? "発展可能" : "読み解きから" },
        { label: "進路・キャリア", value: totalScore >= 70 ? "強みにできる" : "学習計画で伸ばせる" }
      ]
    };
  }
  const multiplier = totalScore >= 90 ? 1.30 : totalScore >= 75 ? 1.22 : totalScore >= 60 ? 1.14 : totalScore >= 40 ? 1.07 : 1.00;
  const base = Number(data.baseIncome || 0);
  const estimate = base ? Math.round(base * multiplier) : 0;
  return {
    kind: "adult",
    multiplier,
    base,
    estimate,
    title: "報酬額見込み（参考）",
    text: "AI関連求人の賃金プレミアム報道等を参考にした相対的な目安です。個別の報酬、昇給、転職成果を保証するものではありません。",
    items: [
      { label: "現在入力額", value: base ? `${base.toLocaleString()}万円` : "未入力" },
      { label: "参考倍率", value: `${multiplier.toFixed(2)}x` },
      { label: "スキル反映後の目安", value: estimate ? `${estimate.toLocaleString()}万円` : "+5〜30%の相対目安" }
    ]
  };
}


function getPercentile(score) {
  if (score >= 92) return 3;
  if (score >= 82) return 8;
  if (score >= 70) return 18;
  if (score >= 58) return 35;
  if (score >= 40) return 58;
  return 78;
}

function getNextQuest(result) {
  const biggest = result.gaps.find(g => g.gap > 0) || result.gaps[0];
  if (!biggest) return "実践成果物を公開";
  const map = {
    literacy: "AI基礎を2時間で総点検",
    prompt: "プロンプトを業務テンプレ化",
    business: "業務プロセスをAI化設計",
    data: "データ読解と可視化を補強",
    automation: "Bot/Agent化に挑戦",
    governance: "安全利用ルールを整備"
  };
  return map[biggest.key] || `${biggest.label}を補強`;
}

function buildUnlocks(result) {
  const top = Object.entries(result.categoryScores).sort((a,b)=>b[1]-a[1])[0];
  const topLabel = CATEGORIES.find(c => c.key === top?.[0])?.label || "AI活用";
  const firstCourse = result.courses.top[0]?.title || "推奨講座";
  const valueText = result.value.kind === "adult"
    ? (result.value.estimate ? `${result.value.estimate.toLocaleString()}万円目安` : `${result.value.multiplier.toFixed(2)}x目安`)
    : "進路・探究で強みにできる";
  return [
    { icon: "🏅", title: `称号：${result.level.name}`, text: `バッジ ${result.level.badge}。プロフィールや面談で説明しやすいAIスキル称号です。` },
    { icon: "⚡", title: `最強領域：${topLabel}`, text: `${top?.[1] || 0}点。ここを起点に成果物を作ると評価されやすいです。` },
    { icon: "🚀", title: `次の解放条件`, text: getNextQuest(result) },
    { icon: "💎", title: "市場価値シグナル", text: valueText }
  ];
}

function renderResult(result) {
  const percentile = getPercentile(result.totalScore);
  const nextQuest = getNextQuest(result);
  $("#totalScore").textContent = result.totalScore;
  $("#levelName").textContent = result.level.name;
  $("#levelComment").textContent = result.level.comment;
  $("#resultTitle").textContent = `${result.level.badge} Rank｜${result.level.name}`;
  $("#rankBadge").textContent = `Rank ${result.level.badge}`;
  $("#percentileBadge").textContent = `推定 上位${percentile}%クラス`;
  $("#nextQuestBadge").textContent = `Next Quest：${nextQuest}`;
  $("#resultLead").textContent = `${result.profile.personName || "あなた"}のAIスキルは${result.totalScore}点。${result.level.name}として、いま使える強み・市場価値シグナル・次の解放条件をまとめました。`;
  $("#unlockGrid").innerHTML = buildUnlocks(result).map(item => `
    <article class="unlock-card"><span>${item.icon}</span><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p></article>
  `).join("");
  drawScore(result.totalScore);
  drawRadar(result.categoryScores, result.targetScores);
  $("#useCaseList").innerHTML = result.useCases.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("#gapList").innerHTML = result.gaps.slice(0,6).map(g => `
    <div class="gap-item">
      <b>${g.label}</b>
      <div class="meter"><span style="width:${Math.min(100, g.current)}%"></span></div>
      <em>${g.current}/${g.target}</em>
    </div>
  `).join("");
  renderValue(result.value);
  $("#learningPath").innerHTML = result.learningPath.map(item => `<li><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p></li>`).join("");
  renderCourses(result);
  syncPlanForm(result);
}

function drawScore(score) {
  const canvas = $("#scoreCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height, cx = w/2, cy = h/2, r = 94;
  ctx.clearRect(0,0,w,h);
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#e8f2fc";
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
  const grad = ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,"#0b6ff0"); grad.addColorStop(.55,"#14c8d8"); grad.addColorStop(1,"#f7b733");
  ctx.strokeStyle = grad; ctx.lineCap = "round";
  ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2, -Math.PI/2 + (Math.PI*2*score/100)); ctx.stroke();
  ctx.fillStyle = "#07172c"; ctx.font = "900 62px Inter, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(score, cx, cy-6);
  ctx.fillStyle = "#617187"; ctx.font = "900 18px Inter, system-ui, sans-serif";
  ctx.fillText("/100", cx, cy+42);
}

function drawRadar(scores, targets) {
  const canvas = $("#radarCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height, cx = w/2, cy = h/2+8, r = Math.min(w,h)*0.33;
  ctx.clearRect(0,0,w,h);
  const n = CATEGORIES.length;
  const point = (i, value) => {
    const angle = -Math.PI/2 + i * Math.PI*2/n;
    const rr = r * value/100;
    return [cx + Math.cos(angle)*rr, cy + Math.sin(angle)*rr];
  };
  ctx.strokeStyle = "#dbe8f6"; ctx.lineWidth = 1;
  for (let ring=1; ring<=4; ring++) {
    ctx.beginPath();
    for (let i=0; i<n; i++) {
      const [x,y] = point(i, ring*25);
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.closePath(); ctx.stroke();
  }
  CATEGORIES.forEach((c,i)=>{
    const [x,y]=point(i,100);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.stroke();
    ctx.fillStyle="#203654"; ctx.font="bold 12px system-ui, sans-serif"; ctx.textAlign = x < cx-5 ? "right" : x > cx+5 ? "left" : "center";
    ctx.fillText(c.label, x + (x<cx?-8:x>cx?8:0), y + (y<cy?-8:18));
  });
  function polygon(values, stroke, fill, dash=false){
    ctx.beginPath();
    CATEGORIES.forEach((c,i)=>{ const [x,y]=point(i,values[c.key]||0); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
    ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=stroke; ctx.lineWidth=3; ctx.setLineDash(dash?[5,5]:[]); ctx.stroke(); ctx.setLineDash([]);
  }
  polygon(targets,"#9ab3cc","rgba(154,179,204,.10)",true);
  polygon(scores,"#0978ee","rgba(9,120,238,.18)");
  CATEGORIES.forEach((c,i)=>{ const [x,y]=point(i,scores[c.key]||0); ctx.fillStyle="#0978ee"; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill(); });
}

function renderValue(value) {
  $("#valueEstimate").innerHTML = `
    <div class="value-box">
      <strong>${escapeHtml(value.kind === "adult" ? (value.estimate ? `${value.estimate.toLocaleString()}万円` : `${value.multiplier.toFixed(2)}x`) : value.title)}</strong>
      <small>${escapeHtml(value.text)}</small>
    </div>
    ${value.items.map(item => `<div class="gap-item"><b>${escapeHtml(item.label)}</b><div class="meter"><span style="width:70%"></span></div><em>${escapeHtml(item.value)}</em></div>`).join("")}
  `;
}

function renderCourses(result) {
  const isStudent = result.profile.userType === "student";
  $("#courseAudienceLabel").textContent = isStudent ? "AI講座 for educationから提案" : "企業向け実践AI講座から提案";
  $("#courseRecommendations").innerHTML = result.courses.top.slice(0,5).map(course => `
    <article class="course-card">
      <img src="./assets/${course.image}" alt="${escapeHtml(course.title)}のイメージ">
      <div class="course-body">
        <span class="tag">${escapeHtml(course.tag)}</span>
        <h4>${escapeHtml(course.title)}</h4>
        <p>${escapeHtml(course.note)}</p>
        <div class="course-meta"><span>${escapeHtml(course.mode)}</span><span>${escapeHtml(course.hours)}</span><span>${escapeHtml(course.price)}</span></div>
      </div>
    </article>
  `).join("");
  const pkg = result.courses.packageRec;
  const pkgRoot = $("#packageRecommendation");
  if (!isStudent && pkg) {
    pkgRoot.classList.add("active");
    pkgRoot.innerHTML = `<img src="./assets/${pkg.image}" alt="${escapeHtml(pkg.title)}"><div><b>組み合わせプラン例</b><h4>${escapeHtml(pkg.title)}</h4><p>${escapeHtml(pkg.target)}</p><div class="course-meta"><span>${escapeHtml(pkg.hours)}</span><span>${escapeHtml(pkg.price)}</span></div></div>`;
  } else {
    pkgRoot.classList.remove("active");
    pkgRoot.innerHTML = "";
  }
}

function syncPlanForm(result) {
  const profile = result.profile;
  const form = $("#planForm");
  form.contactName.value = profile.personName || "";
  form.contactOrg.value = profile.organization || "";
  form.notes.value = `診断スコア：${result.totalScore}/100\nレベル：${result.level.name}\n関心テーマ：${profile.interests.map(k => INTERESTS.find(i => i.key === k)?.label || k).join("、")}\n推奨講座：${result.courses.top.slice(0,3).map(c => c.title).join("、")}`;
  form.diagnosisJson.value = JSON.stringify(result, null, 2);
}

function saveDraft() {
  localStorage.setItem("aiSkillDiagnosisDraft", JSON.stringify(getFormData()));
  toast("一時保存しました");
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem("aiSkillDiagnosisDraft");
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([key, value]) => {
      if (["answers", "interests"].includes(key)) return;
      const el = $(`[name="${key}"]`);
      if (!el) return;
      if (el.type === "radio") {
        const radio = $(`[name="${key}"][value="${value}"]`);
        if (radio) radio.checked = true;
      } else {
        el.value = value;
      }
    });
    if (Array.isArray(data.interests)) {
      $$('input[name="interests"]').forEach(input => input.checked = data.interests.includes(input.value));
    }
    if (data.answers) {
      Object.entries(data.answers).forEach(([qid, value]) => {
        const input = $(`input[name="${qid}"][value="${value}"]`);
        if (input) input.checked = true;
      });
    }
  } catch (e) {
    console.warn("draft restore failed", e);
  }
}

function copyResult() {
  if (!latestResult) return showError("先に診断を実行してください。");
  navigator.clipboard.writeText(buildPlainText(latestResult)).then(() => toast("診断結果をコピーしました"));
}

function copyPlan() {
  if (!latestResult) return showError("先に診断を実行してください。");
  navigator.clipboard.writeText($("#planForm").notes.value).then(() => toast("学習プランをコピーしました"));
}

function downloadJson() {
  if (!latestResult) return showError("先に診断を実行してください。");
  const blob = new Blob([JSON.stringify(latestResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ai-skill-diagnosis-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function handlePlanSubmit(event) {
  event.preventDefault();
  if (!latestResult) return showError("先に診断を実行してください。");
  const form = event.currentTarget;
  const data = new FormData(form);
  if (!GOOGLE_FORMS_CONFIG.enabled || !GOOGLE_FORMS_CONFIG.formActionUrl) {
    localStorage.setItem("aiSkillDiagnosisPlan", JSON.stringify(Object.fromEntries(data.entries())));
    toast("送信デモとして保存しました。Googleフォーム設定後に実送信できます。");
    return;
  }
  const payload = new FormData();
  const entries = GOOGLE_FORMS_CONFIG.entries;
  const recommended = latestResult.courses.top.slice(0,3).map(c => c.title).join("、");
  const interests = latestResult.profile.interests.map(k => INTERESTS.find(i => i.key === k)?.label || k).join("、");
  const mapping = {
    [entries.name]: data.get("contactName"),
    [entries.email]: data.get("email"),
    [entries.organization]: data.get("contactOrg"),
    [entries.userType]: latestResult.profile.userType === "student" ? "生徒・学生" : "社会人",
    [entries.totalScore]: latestResult.totalScore,
    [entries.level]: latestResult.level.name,
    [entries.interests]: interests,
    [entries.recommendedCourses]: recommended,
    [entries.learningMode]: data.get("learningMode"),
    [entries.notes]: data.get("notes"),
    [entries.diagnosisJson]: JSON.stringify(latestResult)
  };
  Object.entries(mapping).forEach(([key, value]) => { if (key) payload.append(key, value ?? ""); });
  fetch(GOOGLE_FORMS_CONFIG.formActionUrl, { method: "POST", mode: "no-cors", body: payload })
    .then(() => toast("学習プランを送信しました"))
    .catch(() => showError("Googleフォームへの送信に失敗しました。設定をご確認ください。"));
}

function buildPlainText(result) {
  return [
    "AIスキル診断結果",
    `スコア：${result.totalScore}/100`,
    `Rank：${result.level.badge}`,
    `称号：${result.level.name}`,
    `Next Quest：${getNextQuest(result)}`,
    `コメント：${result.level.comment}`,
    "",
    "領域別スコア：",
    ...CATEGORIES.map(c => `・${c.label}: ${result.categoryScores[c.key]}`),
    "",
    "推奨講座：",
    ...result.courses.top.slice(0,3).map((c,i) => `${i+1}. ${c.title}（${c.mode} / ${c.price}）`),
    "",
    "先に学ぶ順番：",
    ...result.learningPath.map((p,i) => `${i+1}. ${p.title} - ${p.text}`)
  ].join("\n");
}

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char]));
}

function toast(message) {
  const old = $(".toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function showError(message) {
  const old = $(".error-banner");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "error-banner";
  el.innerHTML = `<b>確認してください</b><span>${escapeHtml(message)}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5200);
}

document.addEventListener("DOMContentLoaded", init);
