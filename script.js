// ══════════════════════════════════════════
//  SLIDESHOW ENGINE
// ══════════════════════════════════════════
const TOTAL = 10;
let current = 1;
let animating = false;

const slides = Array.from({ length: TOTAL }, (_, i) =>
  document.getElementById('s' + (i + 1))
);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const dotsNav = document.getElementById('dots');

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.title = 'Ir a diapositiva ' + (i + 1);
  d.addEventListener('click', () => goTo(i + 1));
  dotsNav.appendChild(d);
});

function getDots() { return dotsNav.querySelectorAll('.dot'); }

function updateUI() {
  counter.textContent = current + ' / ' + TOTAL;
  prevBtn.disabled = current === 1;
  nextBtn.innerHTML = current === TOTAL
    ? 'Inicio <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
    : 'Siguiente <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M9 18l6-6-6-6"/></svg>';
  getDots().forEach((d, i) => d.classList.toggle('active', i === current - 1));
}

function goTo(next, direction) {
  if (animating || next === current) return;
  if (next < 1) next = 1;
  if (next > TOTAL) next = 1; // wrap to start
  animating = true;
  const dir = (direction !== undefined) ? direction : (next > current ? 1 : -1);

  const outSlide = slides[current - 1];
  const inSlide = slides[next - 1];

  // Set entering slide off-screen
  inSlide.style.transition = 'none';
  inSlide.classList.remove('active', 'exit-left', 'exit-right', 'enter-left', 'enter-right');
  inSlide.classList.add(dir > 0 ? 'enter-right' : 'enter-left');
  inSlide.style.opacity = '0';

  // Scroll inner to top on entry
  const inner = inSlide.querySelector('.slide-inner');
  if (inner) inner.scrollTop = 0;

  // Force reflow
  inSlide.offsetHeight;

  inSlide.style.transition = '';
  requestAnimationFrame(() => {
    // Slide out current
    outSlide.classList.remove('active');
    outSlide.classList.add(dir > 0 ? 'exit-left' : 'exit-right');

    // Slide in next
    inSlide.classList.remove('enter-right', 'enter-left');
    inSlide.classList.add('active');
    inSlide.style.opacity = '';

    current = next;
    updateUI();
    triggerSlideAnimations(inSlide);

    setTimeout(() => {
      outSlide.classList.remove('exit-left', 'exit-right');
      animating = false;
    }, 480);
  });
}

function triggerSlideAnimations(slide) {
  // Animate bars when entering slide 8 (indicators)
  if (slide.id === 's8') {
    setTimeout(() => {
      slide.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }, 150);
  }
}

// ── CONTROLS ──
nextBtn.addEventListener('click', () => {
  if (current === TOTAL) goTo(1, 1);
  else goTo(current + 1, 1);
});
prevBtn.addEventListener('click', () => goTo(current - 1, -1));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1, 1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1, -1);
});

// Touch swipe
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 60) dx < 0 ? goTo(current + 1, 1) : goTo(current - 1, -1);
});

updateUI();

// ══════════════════════════════════════════
//  PARTICLES (Slide 1)
// ══════════════════════════════════════════
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLS = ['#3b82f644', '#8b5cf644', '#6366f133', '#1e40af33', '#ec489922'];
  function rand(a, b) { return Math.random() * (b - a) + a; }

  for (let i = 0; i < 90; i++) {
    pts.push({
      x: rand(0, W), y: rand(0, H),
      r: rand(1, 3.5),
      vx: rand(-.25, .25), vy: rand(-.35, -.05),
      c: COLS[Math.floor(Math.random() * COLS.length)],
      a: rand(.3, .9)
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) p.y = H + 10;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ══════════════════════════════════════════
//  MÚSICA — MP3 local + control de volumen
// ══════════════════════════════════════════
(function () {
  const audio    = document.getElementById('bgMusic');
  const btn      = document.getElementById('musicBtn');
  const iPlay    = document.getElementById('iPlay');
  const iPause   = document.getElementById('iPause');
  const waves    = document.getElementById('waveBars');
  const slider   = document.getElementById('volSlider');
  const volPct   = document.getElementById('volPct');
  const volDown  = document.getElementById('volDown');
  const volUp    = document.getElementById('volUp');

  let playing = false;

  // Volumen inicial
  const INIT_VOL = 0.40;
  audio.volume = INIT_VOL;
  setSlider(Math.round(INIT_VOL * 100));

  // ── helpers ──
  function setSlider(val) {
    val = Math.max(0, Math.min(100, val));
    slider.value = val;
    slider.style.setProperty('--pct', val + '%');
    volPct.textContent = val + '%';
    audio.volume = val / 100;
  }

  function setPlaying(state) {
    playing = state;
    iPlay.style.display  = state ? 'none'  : 'block';
    iPause.style.display = state ? 'block' : 'none';
    state ? waves.classList.add('on') : waves.classList.remove('on');
  }

  // ── play / pause ──
  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  // ── slider ──
  slider.addEventListener('input', () => setSlider(Number(slider.value)));

  // ── botones − y + ──
  volDown.addEventListener('click', () => setSlider(Number(slider.value) - 10));
  volUp.addEventListener('click',   () => setSlider(Number(slider.value) + 10));

  // ── reset visual al terminar (por si acaso) ──
  audio.addEventListener('ended', () => setPlaying(false));
})();
