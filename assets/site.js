/* KA Studio: only edit the OPTIONAL_SOCIAL and FORM_ENDPOINT values below.
 * Never place your personal receiving email address in website source code.
 */
'use strict';
const FORM_ENDPOINT = ''; // Example: 'https://formspree.io/f/your-id'; configure privately at form provider.
const OPTIONAL_SOCIAL = [
  { label: 'Google Scholar', url: '' },
  { label: 'ORCID', url: '' },
  { label: 'LinkedIn', url: '' },
  { label: 'ResearchGate', url: '' },
  { label: 'X', url: '' }
];
const dict = {
  en: {navAbout:'About',navResearch:'Research',navPublications:'Publications',navUpdates:'Updates',navContact:'Contact',theme:'Theme',eyebrow:'Applied statistics · Research & collaboration',heroStatement:'Statistical methods for meaningful questions and reliable decisions.',heroSummary:'My work spans causal inference, missing data, biostatistics and quantitative analysis — connecting rigorous methodology with real-world evidence.',exploreResearch:'Explore research ↗',viewPublications:'Selected publications',researchLens:'RESEARCH LENS',heroNote:'Methods, applications and interdisciplinary exchange.',aboutTitle:'About me',aboutLead:'I am a researcher in applied statistics interested in how we can draw trustworthy conclusions from complex and incomplete data.',aboutBody:'My research and applied work bring together causal methodology, public health, observational studies and quantitative evaluation. I am particularly interested in developing analysis that is both statistically rigorous and useful to researchers across disciplines.',researchTitle:'Research directions',publicationsTitle:'Publications',publicationNote:'Selected peer-reviewed work. Article links lead to DOI records.',updatesTitle:'Notes & updates',updatesNote:'Brief milestones and announcements, newest first.',contactTitle:'Get in touch',contactLead:'For research conversations, collaborations or professional enquiries, please use the contact form.',privacyNote:'My receiving email is not published on this website.',nameLabel:'Your name',emailLabel:'Your email',topicLabel:'Enquiry type',messageLabel:'Message',consentLabel:'I agree to submit my information for a response to this enquiry.',sendButton:'Send enquiry',footer:'Personal academic homepage · GitHub Pages'},
  zh: {navAbout:'关于',navResearch:'研究',navPublications:'论文',navUpdates:'动态',navContact:'联系',theme:'主题',eyebrow:'应用统计 · 研究与合作',heroStatement:'用统计方法回答重要问题，支持可靠决策。',heroSummary:'研究领域包括因果推断、缺失数据、生物统计与定量分析，注重统计方法与实际问题的联系。',exploreResearch:'研究方向 ↗',viewPublications:'代表论文',researchLens:'研究重点',heroNote:'方法、应用与跨学科交流。',aboutTitle:'关于我',aboutLead:'我从事应用统计研究，关注如何从复杂和不完整的数据中获得可靠结论。',aboutBody:'我的研究结合因果方法、公共卫生、观察性研究与定量评估，致力于严谨且具有应用价值的统计分析。',researchTitle:'研究方向',publicationsTitle:'学术论文',publicationNote:'精选同行评议论文，链接指向 DOI 记录。',updatesTitle:'学术动态',updatesNote:'近期成果与学术活动。',contactTitle:'联系与合作',contactLead:'如需讨论研究合作或专业事务，请使用联系表单。',privacyNote:'我的收件邮箱不会在网站上公开。',nameLabel:'您的姓名',emailLabel:'您的邮箱',topicLabel:'咨询类型',messageLabel:'留言',consentLabel:'我同意提交信息以便获得回复。',sendButton:'发送留言',footer:'个人学术主页 · GitHub Pages'},
  es: {navAbout:'Sobre mí',navResearch:'Investigación',navPublications:'Publicaciones',navUpdates:'Novedades',navContact:'Contacto',theme:'Tema',eyebrow:'Estadística aplicada · Investigación y colaboración',heroStatement:'Métodos estadísticos para preguntas relevantes y decisiones fiables.',heroSummary:'Mi trabajo abarca inferencia causal, datos faltantes, bioestadística y análisis cuantitativo.',exploreResearch:'Explorar investigación ↗',viewPublications:'Publicaciones',researchLens:'LÍNEAS DE INVESTIGACIÓN',heroNote:'Métodos, aplicaciones y colaboración interdisciplinaria.',aboutTitle:'Sobre mí',aboutLead:'Investigo en estadística aplicada y en cómo obtener conclusiones fiables de datos complejos e incompletos.',aboutBody:'Mi trabajo reúne metodología causal, salud pública, estudios observacionales y evaluación cuantitativa.',researchTitle:'Áreas de investigación',publicationsTitle:'Publicaciones',publicationNote:'Artículos seleccionados con enlaces DOI.',updatesTitle:'Noticias',updatesNote:'Novedades académicas y presentaciones.',contactTitle:'Contacto',contactLead:'Para colaboraciones e invitaciones profesionales, utilice el formulario.',privacyNote:'Mi dirección de correo no es pública.',nameLabel:'Nombre',emailLabel:'Correo electrónico',topicLabel:'Tipo de consulta',messageLabel:'Mensaje',consentLabel:'Acepto enviar mis datos para recibir respuesta.',sendButton:'Enviar consulta',footer:'Página académica personal · GitHub Pages'},
  fr: {navAbout:'À propos',navResearch:'Recherche',navPublications:'Publications',navUpdates:'Actualités',navContact:'Contact',theme:'Thème',eyebrow:'Statistique appliquée · Recherche et collaboration',heroStatement:'Des méthodes statistiques pour des questions importantes et des décisions fiables.',heroSummary:'Mes travaux portent sur l’inférence causale, les données manquantes, la biostatistique et l’analyse quantitative.',exploreResearch:'Explorer la recherche ↗',viewPublications:'Publications choisies',researchLens:'AXES DE RECHERCHE',heroNote:'Méthodes, applications et échanges interdisciplinaires.',aboutTitle:'À propos',aboutLead:'Je travaille en statistique appliquée afin de tirer des conclusions fiables de données complexes et incomplètes.',aboutBody:'Mes recherches associent méthodes causales, santé publique, études observationnelles et évaluation quantitative.',researchTitle:'Axes de recherche',publicationsTitle:'Publications',publicationNote:'Articles sélectionnés avec liens DOI.',updatesTitle:'Notes et actualités',updatesNote:'Activités et annonces scientifiques.',contactTitle:'Me contacter',contactLead:'Pour échanger sur la recherche ou une collaboration, utilisez le formulaire.',privacyNote:'Mon adresse de réception n’est pas publiée ici.',nameLabel:'Nom',emailLabel:'Adresse e-mail',topicLabel:'Objet',messageLabel:'Message',consentLabel:'J’accepte de transmettre mes informations pour recevoir une réponse.',sendButton:'Envoyer',footer:'Page académique personnelle · GitHub Pages'},
  ar: {navAbout:'نبذة',navResearch:'الأبحاث',navPublications:'المنشورات',navUpdates:'المستجدات',navContact:'اتصل',theme:'المظهر',eyebrow:'الإحصاء التطبيقي · البحث والتعاون',heroStatement:'أساليب إحصائية لأسئلة مهمة وقرارات موثوقة.',heroSummary:'تشمل اهتماماتي الاستدلال السببي والبيانات المفقودة والإحصاء الحيوي والتحليل الكمي.',exploreResearch:'استكشف الأبحاث ↗',viewPublications:'منشورات مختارة',researchLens:'محاور البحث',heroNote:'الأساليب والتطبيقات والتعاون متعدد التخصصات.',aboutTitle:'نبذة عني',aboutLead:'أعمل في الإحصاء التطبيقي لاستخلاص استنتاجات موثوقة من البيانات المعقدة وغير المكتملة.',aboutBody:'يجمع عملي بين المنهجيات السببية والصحة العامة والدراسات الرصدية والتقييم الكمي.',researchTitle:'مجالات البحث',publicationsTitle:'المنشورات',publicationNote:'أبحاث مختارة مع روابط DOI.',updatesTitle:'الأخبار والتحديثات',updatesNote:'أنشطة وإعلانات أكاديمية مختصرة.',contactTitle:'التواصل',contactLead:'للتعاون البحثي أو الاستفسارات المهنية، يرجى استخدام النموذج.',privacyNote:'عنوان بريدي المستلم غير منشور على الموقع.',nameLabel:'الاسم',emailLabel:'البريد الإلكتروني',topicLabel:'نوع الاستفسار',messageLabel:'الرسالة',consentLabel:'أوافق على إرسال معلوماتي للحصول على رد.',sendButton:'إرسال',footer:'صفحة أكاديمية شخصية · GitHub Pages'}
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
const socialBox = byId('optionalSocialLinks');
OPTIONAL_SOCIAL.forEach(profile=>{
  if (!/^https:\/\//i.test(profile.url)) return;
  const a=document.createElement('a');a.textContent=profile.label+' ↗';a.href=profile.url;a.target='_blank';a.rel='noopener noreferrer';socialBox.appendChild(a);
});
const form=byId('contactForm'), send=byId('sendButton'), status=byId('formStatus');
if (/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(FORM_ENDPOINT)) {
  form.action=FORM_ENDPOINT;send.disabled=false;status.textContent='';
  form.addEventListener('submit',async e=>{
    e.preventDefault(); if (!form.reportValidity()) return; send.disabled=true;status.textContent='Sending…';
    try { const r=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}); if (!r.ok) throw new Error('Unable to deliver'); form.reset(); status.textContent='Your enquiry was submitted.'; }
    catch(_) {status.textContent='Your message could not be delivered. Please try again later.';}
    finally{send.disabled=false;}
  });
} else { status.textContent='Contact form requires setup before it can receive messages.'; }
