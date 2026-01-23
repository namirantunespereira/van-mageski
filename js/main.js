/* Van Mageski — One Page scroll (nav -> smooth scroll + seção ativa) */

const navLinks = Array.from(document.querySelectorAll('[data-scroll]'));
const modal = document.querySelector('.modal');
const modalImg = modal?.querySelector('img');
const modalTitle = modal?.querySelector('.title');
const modalDesc = modal?.querySelector('[data-desc]');

// Smooth scroll com offset do header sticky
function scrollToId(id){
  const el = document.querySelector(id);
  if(!el) return;
  const header = document.querySelector('.header');
  const offset = (header?.getBoundingClientRect().height || 0) + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    const target = a.getAttribute('href');
    if(target?.startsWith('#')){
      e.preventDefault();
      scrollToId(target);
      history.replaceState(null, '', target);
    }
  });
});

// Destaque automático do menu (IntersectionObserver)
const sections = Array.from(document.querySelectorAll('section[id]'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = '#' + entry.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { root: null, threshold: 0.45 });
sections.forEach(s => obs.observe(s));

// Portfólio: chips (filtro fake) + modal simples
const chips = Array.from(document.querySelectorAll('.chip'));
const items = Array.from(document.querySelectorAll('[data-cat]'));

function setFilter(cat){
  chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === cat)));
  items.forEach(it => {
    const ok = (cat === 'tudo') || it.dataset.cat.split(',').includes(cat);
    it.style.display = ok ? '' : 'none';
  });
}

chips.forEach(c => c.addEventListener('click', () => setFilter(c.dataset.filter)));
setFilter('tudo');

items.forEach(a => {
  a.addEventListener('click', (e) => {
    if(!modal) return;
    e.preventDefault();
    modalTitle.textContent = a.dataset.title || 'Portfólio';
    modalDesc.textContent = a.dataset.desc || 'Descrição curta da peça e intenção artística.';
    modalImg.src = a.querySelector('img').src;
    modal.setAttribute('aria-hidden','false');
  });
});

modal?.addEventListener('click', (e) => {
  const close = e.target.closest('[data-close]');
  if(close || e.target === modal){
    modal.setAttribute('aria-hidden','true');
  }
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false'){
    modal.setAttribute('aria-hidden','true');
  }
});