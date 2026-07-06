/* ============================================================
   EDIT ME — easy content config
   ============================================================ */
const CHANNELS = [
  "<span class='tv-text-big'>Niaz's</span><span class='tv-text-small'>portfolio</span>",
  "Working at<br>tahams",
  "let's create"
];
let channelIndex = 0;
let isOn = true;

/* ============================================================
   TV — CHANNEL SWITCH
   ============================================================ */
const tvScreen = document.getElementById('tvScreen');
const tvText   = document.getElementById('tvText');
const tvStatic = document.getElementById('tvStatic');
const knobChannel = document.getElementById('knobChannel');
const knobPower = document.getElementById('knobPower');
const powerLight = document.getElementById('powerLight');

/* only runs on pages that actually have the TV hero (index.html) */
if (tvScreen && tvText && tvStatic && knobChannel && knobPower && powerLight) {
  const switchChannel = () => {
    if (!isOn) return;
    tvStatic.style.opacity = '0.9';
    tvText.style.opacity = '0';
    setTimeout(() => {
      channelIndex = (channelIndex + 1) % CHANNELS.length;
      tvText.innerHTML = CHANNELS[channelIndex];
    }, 90);
    setTimeout(() => {
      tvStatic.style.opacity = '0.06';
      tvText.style.opacity = '1';
    }, 220);
  };
  knobChannel.addEventListener('click', switchChannel);

  const togglePower = () => {
    isOn = !isOn;
    tvScreen.classList.toggle('is-off', !isOn);
    powerLight.classList.toggle('is-off', !isOn);
  };
  knobPower.addEventListener('click', togglePower);
}

/* ============================================================
   CUSTOM CURSOR (skipped automatically on touch devices)
   ============================================================ */
if (window.matchMedia('(pointer: fine)').matches) {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'rgba(255,63,142,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = 'rgba(255,63,142,0.35)';
    });
  });
}

/* ============================================================
   NAV — compact on scroll
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* logo -> scroll to top (homepage only; project pages link back to index.html normally) */
const navLogo = document.querySelector('.nav-logo');
if (navLogo && navLogo.getAttribute('href') === '#') {
  navLogo.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 70);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
