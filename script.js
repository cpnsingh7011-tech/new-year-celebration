/* ======================
   DATE & TEXT LOGIC
====================== */
const ENV = window.ENV || {};
const newYearDate = new Date(ENV.countdownDate || "January 1, 2026 00:00:00").getTime();
const title = document.getElementById("title");
const wishText = document.getElementById("wishText");
const overlay = document.getElementById("overlay");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
let celebrantName = localStorage.getItem("celebrantName") || "";
let halted = false;
const timers = [];

/* ======================
   55+ RANDOM WISHES
====================== */
const wishes = [
  "May this year bring you endless happiness ✨",
  "New Year, New Dreams, New Achievements 🎯",
  "Success and peace follow you all year long 🌟",
  "Cheers to health, wealth, and happiness 🥂",
  "Make this year legendary 🚀",
  "Every moment is a fresh beginning 🌈",
  "Dream big. Act bold. Win big 💪",
  "New hopes, new beginnings 🎉",
  "Wishing you prosperity and peace 🕊️",
  "Turn your dreams into reality ✨",
  "Smiles, success & surprises await 😊",
  "Happiness knocks on your door 🚪",
  "New year, stronger you 💥",
  "Your success story starts now 📖",
  "May luck be always with you 🍀",
  "Let joy be your superpower ⚡",
  "Big wins coming your way 🏆",
  "Make memories worth keeping 📸",
  "Grow, glow & go beyond 🌟",
  "Best year loading… ⏳",
  "Hustle smarter this year 🧠",
  "Shine brighter than ever 💫",
  "New goals, new victories 🎯",
  "May peace find you always ☮️",
  "Your breakthrough year 💎",
  "Happiness is your default mode 😄",
  "This year belongs to you 👑",
  "Let success chase you 🏃‍♂️",
  "More love, less stress ❤️",
  "New energy, new mindset 🔥",
  "Create magic every day ✨",
  "Welcome growth & gratitude 🌱",
  "Make today amazing 🌞",
  "Be unstoppable 🚀",
  "Celebrate every win 🥳",
  "Rise stronger every day 💪",
  "Joy multiplies this year 🎊",
  "Good vibes only ✌️",
  "Win silently, succeed loudly 🏆",
  "Your year to shine 🌟",
  "Let happiness overflow 🌊",
  "Peace, power & positivity 🔮",
  "Level up your life 🎮",
  "You are unstoppable ⚡",
  "New Year. New Power 💥",
  "Make it unforgettable 📅",
  "Build your dream life 🏗️",
  "Stay winning 🥇",
  "Prosperity everywhere 💰",
  "Happiness unlocked 🔓",
  "Welcome abundance 🌸",
  "Success starts today 🎯",
  "Chase excellence 🏁",
  "Best chapters ahead 📘"
];

function randomWish() {
  const w = wishes[Math.floor(Math.random() * wishes.length)];
  wishText.innerText = celebrantName ? `${celebrantName}, ${w}` : w;
}
randomWish();
timers.push(setInterval(randomWish, 4000));

/* ======================
   COUNTDOWN + TEXT SWITCH
====================== */
function formatTitle(now) {
  const suffix = celebrantName ? `, ${celebrantName}` : "";
  return now >= newYearDate
    ? `🎉 Happy New Year 2026${suffix} 🎉`
    : `🎊 Happy New Year in Advance${suffix} 🎊`;
}
timers.push(setInterval(() => {
  const now = new Date().getTime();
  title.innerText = formatTitle(now);
}, 1000));

function applyName(name) {
  celebrantName = name;
  localStorage.setItem("celebrantName", name);
  title.innerText = formatTitle(new Date().getTime());
  randomWish();
}

function celebrateBurst() {
  const cx = Math.floor(window.innerWidth / 2);
  for (let i = 0; i < 6; i++) fireworks.push(new Firework(cx + (Math.random() - 0.5) * 120));
  createRipple(cx, Math.floor(window.innerHeight / 2));
}

if (celebrantName) {
  overlay.style.display = "none";
  applyName(celebrantName);
} else {
  overlay.style.display = "flex";
  setTimeout(() => nameInput && nameInput.focus(), 100);
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = (nameInput.value || "").trim();
  if (!v) return;
  overlay.style.display = "none";
  applyName(v);
  celebrateBurst();
});

/* ======================
   FIREWORKS SETUP
====================== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
resizeCanvas();

let fireworks = [];
let particles = [];
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const intensityMobile = ENV.fireworksIntensityMobile || 35;
const intensityDesktop = ENV.fireworksIntensityDesktop || 60;

class Firework {
  constructor(x = Math.random() * window.innerWidth) {
    this.x = x;
    this.y = window.innerHeight;
    this.targetY = Math.random() * window.innerHeight / 2;
    this.color = `hsl(${Math.random() * 360},100%,50%)`;
    this.speed = Math.random() * 4 + 4;
  }
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      const count = isMobile ? intensityMobile : intensityDesktop;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }
      fireworks.splice(fireworks.indexOf(this), 1);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2;
    this.speedX = Math.random() * 8 - 4;
    this.speedY = Math.random() * 8 - 4;
    this.life = 80;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/* ======================
   CLICK CELEBRATION
====================== */
window.addEventListener("click", (e) => {
  for (let i = 0; i < 3; i++) {
    fireworks.push(new Firework(e.clientX));
  }
  randomWish();
});
window.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  if (!t) return;
  for (let i = 0; i < 3; i++) {
    fireworks.push(new Firework(t.clientX));
  }
  randomWish();
}, { passive: true });

/* ======================
   ANIMATION LOOP
====================== */
function animate() {
  if (halted) return;
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  if (Math.random() < 0.05) fireworks.push(new Firework());

  fireworks.forEach(f => { f.update(); f.draw(); });
  particles.forEach((p, i) => {
    if (p.life <= 0) particles.splice(i, 1);
    else { p.update(); p.draw(); }
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
});

/* ======================
   COUNTDOWN TIMER FIX
====================== */
function updateCountdown() {
  const now = new Date().getTime();
  const diff = newYearDate - now;

  if (diff <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}
updateCountdown();
timers.push(setInterval(updateCountdown, 1000));
/* ======================
   DEEP GRADIENT RIPPLE
====================== */
const rippleContainer = document.getElementById("ripple-container");
function createRipple(x, y) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";

  ripple.style.setProperty("--c1", `hsla(${Math.random()*360},100%,60%,0.9)`);
  ripple.style.setProperty("--c2", `hsla(${Math.random()*360},100%,50%,0.6)`);
  ripple.style.setProperty("--c3", `hsla(${Math.random()*360},100%,40%,0.3)`);

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  rippleContainer.appendChild(ripple);
  setTimeout(() => ripple.remove(), ENV.rippleDurationMs || 1400);
}
window.addEventListener("click", (e) => {
  createRipple(e.clientX, e.clientY);
});
window.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  if (!t) return;
  createRipple(t.clientX, t.clientY);
}, { passive: true });

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  const k = (e.key || "").toLowerCase();
  const blocked =
    k === "f12" ||
    (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
    (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(k)) ||
    (e.metaKey && ["u","s","p","a","c","x","v"].includes(k));
  if (blocked) e.preventDefault();
});
["copy","cut","paste","dragstart","selectstart"].forEach(evt => {
  document.addEventListener(evt, (e) => e.preventDefault());
});
let devtoolsActive = false;
function checkDevtools() {
  if (ENV.enableDevtoolsShield === false) return;
  const threshold = 160;
  const open =
    (window.outerWidth - window.innerWidth > threshold) ||
    (window.outerHeight - window.innerHeight > threshold);
  if (open && !devtoolsActive) {
    devtoolsActive = true;
    engageLockdown();
  } else if (!open && devtoolsActive) {
    devtoolsActive = false;
    releaseLockdown();
  }
}
setInterval(checkDevtools, 1000);

function engageLockdown() {
  halted = true;
  while (timers.length) clearInterval(timers.pop());
  const shield = document.createElement("div");
  shield.className = "shield";
  const msg = document.createElement("div");
  msg.className = "msg";
  msg.textContent = "Protected mode is active";
  shield.appendChild(msg);
  document.body.appendChild(shield);
}
function releaseLockdown() {
  halted = false;
  document.querySelectorAll(".shield").forEach(s => s.remove());
  // restart timers
  timers.push(setInterval(randomWish, 4000));
  timers.push(setInterval(() => {
    const now = new Date().getTime();
    title.innerText = formatTitle(now);
  }, 1000));
  timers.push(setInterval(updateCountdown, 1000));
  requestAnimationFrame(animate);
}
function applyTheme() {
  const t = ENV.theme || {};
  const root = document.documentElement;
  if (t.primary) root.style.setProperty("--primary", t.primary);
  if (t.secondary) root.style.setProperty("--secondary", t.secondary);
  if (t.accent) root.style.setProperty("--accent", t.accent);
  if (t.text) root.style.setProperty("--text", t.text);
  if (t.bg) root.style.setProperty("--bg", t.bg);
}
applyTheme();
