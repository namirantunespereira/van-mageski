
(() => {
  const track = document.getElementById('ig-track');
  const prevBtn = document.querySelector('.ig-nav.prev');
  const nextBtn = document.querySelector('.ig-nav.next');
  const files = ['ph-1','ph-2','ph-3','ph-4','ph-5','ph-6'];

  files.forEach(name => {
    const fig = document.createElement('figure'); fig.className='ig-card';
    const img = new Image(); img.alt='Trabalho do portfólio'; img.loading='lazy'; img.decoding='async';
    img.src = `assets/img/${name}.jpg`;
    fig.appendChild(img); track.appendChild(fig);
  });

  let animating = false;
  function stepWidth(){
    const first = track.querySelector('.ig-card');
    if(!first) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '22');
    return first.getBoundingClientRect().width + gap;
  }

  function animateTo(offset, then){
    track.classList.add('is-animating');
    track.style.transform = `translateX(${offset}px)`;
    const onEnd = ()=>{
      track.classList.remove('is-animating');
      track.style.transform = 'translateX(0)';
      track.removeEventListener('transitionend', onEnd);
      then && then();
      animating = false;
    };
    track.addEventListener('transitionend', onEnd);
  }

  function next(){
    if(animating) return; animating = true;
    const w = stepWidth();
    animateTo(-w, ()=> track.appendChild(track.firstElementChild));
  }
  function prev(){
    if(animating) return; animating = true;
    const w = stepWidth();
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(${-w}px)`;
    requestAnimationFrame(()=> animateTo(0));
  }

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);

  // Drag (mouse/touch)
  let pulling=false, startX=0, deltaX=0;
  const THRESHOLD = 60;

  function onDown(x){ if(animating) return; pulling=true; deltaX=0; startX=x; track.classList.remove('is-animating'); track.classList.add('dragging'); }
  function onMove(x){ if(!pulling) return; deltaX = x - startX; track.style.transform = `translateX(${deltaX}px)`; }
  function onUp(){
    if(!pulling) return;
    pulling=false;
    track.classList.remove('dragging');
    if(Math.abs(deltaX) > THRESHOLD){ deltaX < 0 ? next() : prev(); }
    else {
      track.classList.add('is-animating');
      track.style.transform = 'translateX(0)';
      track.addEventListener('transitionend', ()=> track.classList.remove('is-animating'), {once:true});
    }
  }

  track.addEventListener('mousedown', e=>{ e.preventDefault(); onDown(e.clientX); });
  window.addEventListener('mousemove', e=> onMove(e.clientX));
  window.addEventListener('mouseup', onUp);
  track.addEventListener('touchstart', e=> onDown(e.touches[0].clientX), {passive:true});
  track.addEventListener('touchmove',  e=> onMove(e.touches[0].clientX), {passive:true});
  track.addEventListener('touchend', onUp);
})();
