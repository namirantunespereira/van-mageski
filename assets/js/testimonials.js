
(() => {
  const track = document.getElementById('t-track');
  if(!track) return;

  // Autoplay infinito: move 1 card por vez e reordena no final
  let animating = false;
  let timer = null;
  const AUTOPLAY_MS = 2800;

  function stepWidth(){
    const first = track.querySelector('.t-card');
    if(!first) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '16');
    return first.getBoundingClientRect().width + gap;
  }

  function next(){
    if(animating) return;
    animating = true;
    const w = stepWidth();
    track.classList.add('is-animating');
    track.style.transform = `translateX(${-w}px)`;
    const onEnd = () => {
      track.classList.remove('is-animating');
      track.style.transform = 'translateX(0)';
      track.appendChild(track.firstElementChild);
      animating = false;
      track.removeEventListener('transitionend', onEnd);
    };
    track.addEventListener('transitionend', onEnd);
  }

  function start(){
    if(timer) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stop(){
    if(!timer) return;
    clearInterval(timer);
    timer = null;
  }

  // Pausa ao interagir (hover/focus/toque)
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  track.addEventListener('touchstart', stop, {passive:true});
  track.addEventListener('touchend', start);
  track.addEventListener('focusin', stop);
  track.addEventListener('focusout', start);

  // Start
  if(document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);
})();
