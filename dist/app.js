const languageKey = 'portfolio-language-v2';
let language = 'en';
try { language = localStorage.getItem(languageKey) || 'en'; } catch {}
if (!['en', 'ko'].includes(language)) language = 'en';
const dialog = document.querySelector('#case-dialog');
const caseContent = document.querySelector('#case-content');
let activeProject = null;
let activeGallery = 0;
let activeStep = 0;
let returnHash = '#work';
let returnFocus = null;
let pushedCase = false;
const words = {
  role: {en:'My role',ko:'담당한 작업'}, tools:{en:'Tools',ko:'사용 도구'},
  process:{en:'How it works',ko:'작업 흐름'}, next:{en:'Next project',ko:'다음 프로젝트'},
  gallery:{en:'Project images',ko:'프로젝트 이미지'}, photo:{en:'View image',ko:'이미지 보기'},
};
const tr = value => typeof value === 'string' ? value : value[language];
const escapeHTML = str => String(str).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function setLanguage(lang, persist = true) {
  language = ['ko', 'en'].includes(lang) ? lang : 'en';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = translations[el.dataset.i18n][language]; });
  document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
  document.querySelectorAll('[data-alt-en]').forEach(el => { el.alt = language === 'ko' ? el.dataset.altKo : el.dataset.altEn; });
  document.title = language === 'ko' ? '이재우 — 연구와 소프트웨어' : 'Jaewoo Lee — Selected work';
  document.querySelector('meta[name="description"]').content = language === 'ko' ? '이재우의 연구와 프로젝트. 컴퓨터비전, 디지털 트윈, 3D 도구와 앱.' : 'Jaewoo Lee — computer vision, wireless digital twins, 3D tools and apps.';
  if (persist) { try { localStorage.setItem(languageKey, language); } catch {} }
  if (activeProject) renderCase();
}
function renderCase() {
  const p = activeProject;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const w = key => escapeHTML(tr(words[key]));
  const txt = x => escapeHTML(tr(x));
  const gallery = p.gallery.length ? `<figure class="gallery" aria-label="${w('gallery')}"><div class="gallery-stage"><img id="gallery-image" src="assets/${p.gallery[activeGallery].src}" alt="${txt(p.gallery[activeGallery].caption)}"></div><figcaption class="gallery-caption" id="gallery-caption" aria-live="polite">${txt(p.gallery[activeGallery].caption)}</figcaption>${p.gallery.length>1?`<div class="gallery-meta"><div class="gallery-thumbs">${p.gallery.map((im,i)=>`<button class="gallery-thumb" data-image="${i}" aria-label="${w('photo')} ${i+1}" aria-pressed="${i===activeGallery}"><img src="assets/${im.src}" alt=""></button>`).join('')}</div><span class="gallery-count" id="gallery-count">${activeGallery+1} / ${p.gallery.length}</span></div>`:''}</figure>` : '';
  const metrics = p.metrics.length ? `<div class="case-metrics">${p.metrics.map(m=>`<div><b>${escapeHTML(m.value)}</b><p>${txt(m.label)}</p></div>`).join('')}</div>` : '';
  const process = p.process.length ? `<section class="case-process"><h2 class="process-heading">${w('process')}</h2><div class="process-tabs" role="tablist" aria-label="${w('process')}">${p.process.map((step,i)=>`<button class="process-tab" role="tab" id="step-${i}" data-step="${i}" aria-controls="process-panel" aria-selected="${i===activeStep}" tabindex="${i===activeStep?0:-1}">${txt(step.title)}</button>`).join('')}</div><div class="process-panel" id="process-panel" role="tabpanel" aria-labelledby="step-${activeStep}" tabindex="0">${stepMarkup()}</div></section>` : '';
  caseContent.innerHTML = `<article class="case-content"><div class="case-heading"><p class="eyebrow">${txt(p.category)}</p><span class="eyebrow">${escapeHTML(p.year)}</span></div><h1 id="case-title">${txt(p.title)}</h1><p class="case-lead">${txt(p.lead)}</p><div class="case-meta"><div><h2>${w('role')}</h2><p>${txt(p.role)}</p></div><div><h2>${w('tools')}</h2><p>${escapeHTML(p.stack)}</p></div></div>${gallery}${metrics}${process}${p.sections.map(s=>`<section class="case-section"><h2>${txt(s.title)}</h2><p>${txt(s.body)}</p></section>`).join('')}<div class="case-footer">${p.links.map(l=>`<a class="text-link" href="${escapeHTML(l.url)}" target="_blank" rel="noreferrer">${txt(l.label)}</a>`).join('')}</div><p class="case-source">${txt(p.source)}</p><a class="next-project" href="#project/${next.id}" data-project="${next.id}"><span>${w('next')}</span><strong>${txt(next.title)}</strong></a></article>`;
}
function stepMarkup() {
  const s = activeProject.process[activeStep];
  return `<span class="process-index" aria-hidden="true">0${activeStep+1}</span><div><h3>${escapeHTML(tr(s.title))}</h3><p>${escapeHTML(tr(s.body))}</p></div>`;
}
function selectStep(index, focus = false) {
  activeStep = index;
  const tabs = [...caseContent.querySelectorAll('[data-step]')];
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  const panel = document.querySelector('#process-panel');
  panel.setAttribute('aria-labelledby',`step-${index}`); panel.innerHTML=stepMarkup();
  if(focus) tabs[index].focus();
}
function openCase(id) {
  const p = projects.find(project=>project.id===id);
  if(!p) return;
  if(!dialog.open) { returnFocus=document.activeElement; }
  activeProject=p; activeGallery=0; activeStep=0; renderCase();
  document.body.classList.add('case-open');
  if(!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
  document.querySelector('#close-case').focus({preventScroll:true});
}
function hideCase() {
  if(dialog.open) dialog.close();
  activeProject=null; document.body.classList.remove('case-open');
  returnFocus?.focus({preventScroll:true});
}
function closeCase() {
  hideCase();
  if(location.hash.startsWith('#project/')) {
    if(pushedCase) { pushedCase=false; history.back(); }
    else history.replaceState(null,'',returnHash);
  }
}
function route() {
  if(location.hash.startsWith('#project/')) openCase(location.hash.slice(9));
  else if(dialog.open) hideCase();
}
document.addEventListener('click',event=>{
  const langButton=event.target.closest('[data-lang]');
  if(langButton) {setLanguage(langButton.dataset.lang);return;}
  const card=event.target.closest('[data-project]');
  if(card) {
    event.preventDefault();
    if(!dialog.open) {returnHash=location.hash||'#work';pushedCase=true;history.pushState(null,'',card.getAttribute('href'));}
    else history.replaceState(null,'',card.getAttribute('href'));
    openCase(card.dataset.project);return;
  }
  const thumbnail=event.target.closest('[data-image]');
  if(thumbnail&&activeProject) {
    activeGallery=Number(thumbnail.dataset.image);
    const image=activeProject.gallery[activeGallery];
    document.querySelector('#gallery-image').src='assets/'+image.src;
    document.querySelector('#gallery-image').alt=tr(image.caption);
    document.querySelector('#gallery-caption').textContent=tr(image.caption);
    document.querySelector('#gallery-count').textContent=`${activeGallery+1} / ${activeProject.gallery.length}`;
    caseContent.querySelectorAll('[data-image]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.image)===activeGallery)));return;
  }
  const step=event.target.closest('[data-step]');
  if(step) selectStep(Number(step.dataset.step));
});
dialog.addEventListener('keydown',event=>{
  if(!event.target.matches('[data-step]')) return;
  const length=activeProject.process.length;
  let n=activeStep;
  if(event.key==='ArrowRight')n=(n+1)%length;
  else if(event.key==='ArrowLeft')n=(n+length-1)%length;
  else if(event.key==='Home')n=0;
  else if(event.key==='End')n=length-1;
  else return;
  event.preventDefault();selectStep(n,true);
});
document.querySelector('#close-case').addEventListener('click',closeCase);
document.querySelector('#case-home').addEventListener('click',event=>{event.preventDefault();closeCase();});
dialog.addEventListener('cancel',event=>{event.preventDefault();closeCase();});
dialog.addEventListener('click',event=>{if(event.target===dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeCase();}});
addEventListener('hashchange',route);
setLanguage(language,false);route();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches&&'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const navLinks=[...document.querySelectorAll('.site-header nav a')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href')));
let queued=false;
function updateScroll() {
  const max=document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty('--reading-progress',`${max>0?scrollY/max*100:0}%`);
  let current=null;sections.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.4)current=section.id;});
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-5)current='contact';
  navLinks.forEach(a=>{if(a.hash==='#'+current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  queued=false;
}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
if(matchMedia('(hover: hover)').matches) document.querySelectorAll('.project-image').forEach(card=>{
  card.addEventListener('pointermove',event=>{
    if(reducedMotion.matches)return;
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${((event.clientX-r.left)/r.width-.5)*7}px`);
    card.style.setProperty('--my',`${((event.clientY-r.top)/r.height-.5)*7}px`);
  });
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--mx','0px');card.style.setProperty('--my','0px');});
});
