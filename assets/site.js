/* KA Studio: edit OPTIONAL_SOCIAL to add real public profiles; the form endpoint is in index.html.
 * Never place your personal receiving email address in website source code.
 */
'use strict';
// Placeholder links currently point to official platform homepages.
// To use your own profile, replace the blank profileUrl with its actual public HTTPS URL.
const OPTIONAL_SOCIAL = [
  { label: 'Google Scholar', profileUrl: '', demoUrl: 'https://scholar.google.com/' },
  { label: 'ORCID', profileUrl: '', demoUrl: 'https://orcid.org/' },
  { label: 'LinkedIn', profileUrl: '', demoUrl: 'https://www.linkedin.com/' },
  { label: 'ResearchGate', profileUrl: '', demoUrl: 'https://www.researchgate.net/' },
  { label: 'YouTube', profileUrl: '', demoUrl: 'https://www.youtube.com/' },
  { label: 'WeChat', profileUrl: '', demoUrl: 'https://www.wechat.com/' },
  { label: 'Facebook', profileUrl: '', demoUrl: 'https://www.facebook.com/' },
  { label: 'X', profileUrl: '', demoUrl: 'https://x.com/' }
];
const dict = {
  en: {navAbout:'About',navResearch:'Research',navPublications:'Publications',navUpdates:'Updates',navContact:'Contact',theme:'Theme',eyebrow:'Applied statistics · Research & collaboration',heroStatement:'Statistical methods for meaningful questions and reliable decisions.',heroSummary:'My work spans causal inference, missing data, biostatistics and quantitative analysis — connecting rigorous methodology with real-world evidence.',exploreResearch:'Explore research ↗',viewPublications:'Selected publications',researchLens:'RESEARCH LENS',heroNote:'Methods, applications and interdisciplinary exchange.',aboutTitle:'About me',aboutLead:'I am a researcher in applied statistics interested in how we can draw trustworthy conclusions from complex and incomplete data.',aboutBody:'My research and applied work bring together causal methodology, public health, observational studies and quantitative evaluation. I am particularly interested in developing analysis that is both statistically rigorous and useful to researchers across disciplines.',researchTitle:'Research directions',publicationsTitle:'Publications',publicationNote:'Selected peer-reviewed work. Article links lead to DOI records.',updatesTitle:'Notes & updates',updatesNote:'Brief milestones and announcements, newest first.',contactTitle:'Get in touch',contactLead:'For research conversations, collaborations or professional enquiries, please use the contact form.',privacyNote:'My receiving email is not published on this website.',nameLabel:'Your name',emailLabel:'Your email',topicLabel:'Enquiry type',messageLabel:'Message',consentLabel:'I agree to submit my information for a response to this enquiry.',sendButton:'Send enquiry',footer:'Personal academic homepage · GitHub Pages',navExperience:'Experience',navSkills:'Skills',navAwards:'Awards',experienceTitle:'Employment & consultancy',employmentTitle:'Employment and research appointments',consultancyTitle:'Selected consultancy experience',skillsTitle:'Analytical skills',awardsTitle:'Awards & activities',manuscriptsTitle:'Manuscripts under review / in progress'},
  zh: {navAbout:'关于',navResearch:'研究',navPublications:'论文',navUpdates:'动态',navContact:'联系',theme:'主题',eyebrow:'应用统计 · 研究与合作',heroStatement:'用统计方法回答重要问题，支持可靠决策。',heroSummary:'研究领域包括因果推断、缺失数据、生物统计与定量分析，注重统计方法与实际问题的联系。',exploreResearch:'研究方向 ↗',viewPublications:'代表论文',researchLens:'研究重点',heroNote:'方法、应用与跨学科交流。',aboutTitle:'关于我',aboutLead:'我从事应用统计研究，关注如何从复杂和不完整的数据中获得可靠结论。',aboutBody:'我的研究结合因果方法、公共卫生、观察性研究与定量评估，致力于严谨且具有应用价值的统计分析。',researchTitle:'研究方向',publicationsTitle:'学术论文',publicationNote:'精选同行评议论文，链接指向 DOI 记录。',updatesTitle:'学术动态',updatesNote:'近期成果与学术活动。',contactTitle:'联系与合作',contactLead:'如需讨论研究合作或专业事务，请使用联系表单。',privacyNote:'我的收件邮箱不会在网站上公开。',nameLabel:'您的姓名',emailLabel:'您的邮箱',topicLabel:'咨询类型',messageLabel:'留言',consentLabel:'我同意提交信息以便获得回复。',sendButton:'发送留言',footer:'个人学术主页 · GitHub Pages',navExperience:'经历',navSkills:'技能',navAwards:'荣誉',experienceTitle:'工作与咨询经历',employmentTitle:'工作与研究经历',consultancyTitle:'咨询项目经验',skillsTitle:'分析技能',awardsTitle:'奖项与活动',manuscriptsTitle:'审稿中及进行中的稿件'},
  es: {navAbout:'Sobre mí',navResearch:'Investigación',navPublications:'Publicaciones',navUpdates:'Novedades',navContact:'Contacto',theme:'Tema',eyebrow:'Estadística aplicada · Investigación y colaboración',heroStatement:'Métodos estadísticos para preguntas relevantes y decisiones fiables.',heroSummary:'Mi trabajo abarca inferencia causal, datos faltantes, bioestadística y análisis cuantitativo.',exploreResearch:'Explorar investigación ↗',viewPublications:'Publicaciones',researchLens:'LÍNEAS DE INVESTIGACIÓN',heroNote:'Métodos, aplicaciones y colaboración interdisciplinaria.',aboutTitle:'Sobre mí',aboutLead:'Investigo en estadística aplicada y en cómo obtener conclusiones fiables de datos complejos e incompletos.',aboutBody:'Mi trabajo reúne metodología causal, salud pública, estudios observacionales y evaluación cuantitativa.',researchTitle:'Áreas de investigación',publicationsTitle:'Publicaciones',publicationNote:'Artículos seleccionados con enlaces DOI.',updatesTitle:'Noticias',updatesNote:'Novedades académicas y presentaciones.',contactTitle:'Contacto',contactLead:'Para colaboraciones e invitaciones profesionales, utilice el formulario.',privacyNote:'Mi dirección de correo no es pública.',nameLabel:'Nombre',emailLabel:'Correo electrónico',topicLabel:'Tipo de consulta',messageLabel:'Mensaje',consentLabel:'Acepto enviar mis datos para recibir respuesta.',sendButton:'Enviar consulta',footer:'Página académica personal · GitHub Pages',navExperience:'Experiencia',navSkills:'Competencias',navAwards:'Distinciones',experienceTitle:'Empleo y consultoría',employmentTitle:'Experiencia laboral e investigadora',consultancyTitle:'Consultorías seleccionadas',skillsTitle:'Competencias analíticas',awardsTitle:'Premios y actividades',manuscriptsTitle:'Manuscritos en revisión / preparación'},
  fr: {navAbout:'À propos',navResearch:'Recherche',navPublications:'Publications',navUpdates:'Actualités',navContact:'Contact',theme:'Thème',eyebrow:'Statistique appliquée · Recherche et collaboration',heroStatement:'Des méthodes statistiques pour des questions importantes et des décisions fiables.',heroSummary:'Mes travaux portent sur l’inférence causale, les données manquantes, la biostatistique et l’analyse quantitative.',exploreResearch:'Explorer la recherche ↗',viewPublications:'Publications choisies',researchLens:'AXES DE RECHERCHE',heroNote:'Méthodes, applications et échanges interdisciplinaires.',aboutTitle:'À propos',aboutLead:'Je travaille en statistique appliquée afin de tirer des conclusions fiables de données complexes et incomplètes.',aboutBody:'Mes recherches associent méthodes causales, santé publique, études observationnelles et évaluation quantitative.',researchTitle:'Axes de recherche',publicationsTitle:'Publications',publicationNote:'Articles sélectionnés avec liens DOI.',updatesTitle:'Notes et actualités',updatesNote:'Activités et annonces scientifiques.',contactTitle:'Me contacter',contactLead:'Pour échanger sur la recherche ou une collaboration, utilisez le formulaire.',privacyNote:'Mon adresse de réception n’est pas publiée ici.',nameLabel:'Nom',emailLabel:'Adresse e-mail',topicLabel:'Objet',messageLabel:'Message',consentLabel:'J’accepte de transmettre mes informations pour recevoir une réponse.',sendButton:'Envoyer',footer:'Page académique personnelle · GitHub Pages',navExperience:'Expérience',navSkills:'Compétences',navAwards:'Distinctions',experienceTitle:'Emploi et conseil',employmentTitle:'Parcours professionnel et scientifique',consultancyTitle:'Missions de conseil',skillsTitle:'Compétences analytiques',awardsTitle:'Prix et activités',manuscriptsTitle:'Manuscrits en évaluation / préparation'},
  ar: {navAbout:'نبذة',navResearch:'الأبحاث',navPublications:'المنشورات',navUpdates:'المستجدات',navContact:'اتصل',theme:'المظهر',eyebrow:'الإحصاء التطبيقي · البحث والتعاون',heroStatement:'أساليب إحصائية لأسئلة مهمة وقرارات موثوقة.',heroSummary:'تشمل اهتماماتي الاستدلال السببي والبيانات المفقودة والإحصاء الحيوي والتحليل الكمي.',exploreResearch:'استكشف الأبحاث ↗',viewPublications:'منشورات مختارة',researchLens:'محاور البحث',heroNote:'الأساليب والتطبيقات والتعاون متعدد التخصصات.',aboutTitle:'نبذة عني',aboutLead:'أعمل في الإحصاء التطبيقي لاستخلاص استنتاجات موثوقة من البيانات المعقدة وغير المكتملة.',aboutBody:'يجمع عملي بين المنهجيات السببية والصحة العامة والدراسات الرصدية والتقييم الكمي.',researchTitle:'مجالات البحث',publicationsTitle:'المنشورات',publicationNote:'أبحاث مختارة مع روابط DOI.',updatesTitle:'الأخبار والتحديثات',updatesNote:'أنشطة وإعلانات أكاديمية مختصرة.',contactTitle:'التواصل',contactLead:'للتعاون البحثي أو الاستفسارات المهنية، يرجى استخدام النموذج.',privacyNote:'عنوان بريدي المستلم غير منشور على الموقع.',nameLabel:'الاسم',emailLabel:'البريد الإلكتروني',topicLabel:'نوع الاستفسار',messageLabel:'الرسالة',consentLabel:'أوافق على إرسال معلوماتي للحصول على رد.',sendButton:'إرسال',footer:'صفحة أكاديمية شخصية · GitHub Pages',navExperience:'الخبرة',navSkills:'المهارات',navAwards:'الجوائز',experienceTitle:'الخبرة المهنية والاستشارية',employmentTitle:'الوظائف والمناصب البحثية',consultancyTitle:'خبرة استشارية مختارة',skillsTitle:'المهارات التحليلية',awardsTitle:'الجوائز والأنشطة',manuscriptsTitle:'مخطوطات قيد المراجعة أو الإعداد'}
};
const root = document.documentElement;
const byId = id => document.getElementById(id);
const year = byId('year'); if (year) year.textContent = new Date().getFullYear();
function applyLanguage(code) {
  const lang = dict[code] ? code : 'en';
  root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(node => { const value = dict[lang][node.dataset.i18n]; if (value) node.textContent = value; });
  byId('language').value = lang;
  try { localStorage.setItem('ka-language',lang); } catch (_) {}
}
let savedLang = 'en'; try { savedLang = localStorage.getItem('ka-language') || 'en'; } catch (_) {}
applyLanguage(savedLang);
byId('language').addEventListener('change',e=>applyLanguage(e.target.value));
let savedTheme = ''; try { savedTheme = localStorage.getItem('ka-theme') || ''; } catch (_) {}
if (savedTheme === 'dark') root.dataset.theme = 'dark';
byId('themeToggle').addEventListener('click',()=>{ root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try {localStorage.setItem('ka-theme',root.dataset.theme);}catch(_){} });
// Keep the links working even before personal profile URLs are added.
// The links exist in HTML, so they remain clickable even with JavaScript disabled.
const socialBox = byId('optionalSocialLinks');
if (socialBox) OPTIONAL_SOCIAL.forEach(profile => {
  const link = [...socialBox.querySelectorAll('[data-profile]')].find(el => el.dataset.profile === profile.label);
  if (!link) return;
  const personal = /^https:\/\/[^\s]+$/i.test(profile.profileUrl) ? profile.profileUrl : '';
  link.href = personal || profile.demoUrl;
  link.textContent = profile.label + ' ↗';
  link.title = personal ? 'Open personal profile' : 'Open official platform homepage';
});

// Contact form: native HTML POST to the Formspree action in index.html.
// Do NOT disable the send button or intercept submit with fetch().
// This remains functional even if site.js fails to load or the browser blocks AJAX.


// Accessibility: manual page zoom, with a persistent setting per browser.
// Valid range is 90–125% in 5% increments; never store personal information.
(function setupPageZoom() {
  const minus = document.getElementById('zoomOut');
  const plus = document.getElementById('zoomIn');
  const label = document.getElementById('zoomLevel');
  if (!minus || !plus || !label) return;
  const min = 90, max = 125, step = 5;
  let size = 100;
  try {
    const stored = Number(localStorage.getItem('ka-page-zoom'));
    if (Number.isFinite(stored) && stored >= min && stored <= max && stored % step === 0) size = stored;
  } catch (_) { /* Works even when storage is blocked. */ }
  function update() {
    // CSS zoom reflows the whole page, including pixel-sized headings and controls.
    document.body.style.zoom = String(size / 100);
    label.textContent = size + '%';
    minus.disabled = size <= min;
    plus.disabled = size >= max;
    try { localStorage.setItem('ka-page-zoom', String(size)); } catch (_) {}
  }
  minus.addEventListener('click', () => { size = Math.max(min, size - step); update(); });
  plus.addEventListener('click', () => { size = Math.min(max, size + step); update(); });
  update();
})();


// Independent SVG animation: smooth normal-distribution curves, no libraries/network.
// Animation automatically pauses in background tabs and honors reduced-motion settings.
(function initDistributionAnimation() {
  const plot = document.getElementById('distributionPlot');
  const toggle = document.getElementById('distToggle');
  const restart = document.getElementById('distRestart');
  if (!plot || !toggle || !restart) return;
  const lines = [1, 2, 3].map(n => document.getElementById('distLine' + n));
  const areas = [1, 2, 3].map(n => document.getElementById('distArea' + n));
  if (lines.some(el => !el) || areas.some(el => !el)) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduceMotion.matches, raf = 0, phase = 0, last = 0;
  function draw(t) {
    const settings = [
      [265 + 29 * Math.sin(t * 0.85), 91 + 8 * Math.sin(t * 0.7)],
      [415 + 31 * Math.sin(t * 0.66 + 1.9), 77 + 10 * Math.cos(t * 0.8)],
      [570 + 24 * Math.sin(t * 0.92 + 3.1), 62 + 8 * Math.sin(t * 0.62 + 1)]
    ];
    settings.forEach(([mean, sd], i) => {
      let path = '', area = '';
      for (let x = 30; x <= 770; x += 5) {
        const z = (x - mean) / sd;
        const y = 213 - 150 * Math.exp(-0.5 * z * z);
        path += (x === 30 ? 'M' : 'L') + x + ',' + y.toFixed(2);
      }
      area = path + 'L770,213L30,213Z';
      lines[i].setAttribute('d', path);
      areas[i].setAttribute('d', area);
    });
  }
  function refreshButton() {
    toggle.textContent = playing ? 'Pause animation' : 'Play animation';
    toggle.setAttribute('aria-pressed', String(!playing));
  }
  function frame(now) {
    raf = 0;
    if (!playing || document.hidden || reduceMotion.matches) return;
    if (last) phase += Math.min((now - last) / 1000, 0.08);
    last = now;
    draw(phase);
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (!playing || document.hidden || reduceMotion.matches || raf) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
  toggle.addEventListener('click', () => { playing = !playing; refreshButton(); playing ? start() : stop(); });
  restart.addEventListener('click', () => { phase = 0; draw(phase); stop(); if (playing) start(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  const motionChanged = () => { if (reduceMotion.matches) { playing = false; stop(); draw(0); } refreshButton(); if (playing) start(); };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', motionChanged);
  draw(0);
  refreshButton();
  start();
})();
