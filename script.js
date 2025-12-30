/* ======================
   DATE & TEXT LOGIC
====================== */
const newYearDate = new Date("January 1, 2026 00:00:00").getTime();
const title = document.getElementById("title");
const wishText = document.getElementById("wishText");

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
  wishText.innerText = wishes[Math.floor(Math.random() * wishes.length)];
}
randomWish();
setInterval(randomWish, 4000);

/* ======================
   COUNTDOWN + TEXT SWITCH
====================== */
setInterval(() => {
  const now = new Date().getTime();
  if (now >= newYearDate) {
    title.innerText = "🎉 Happy New Year 2026 🎉";
  } else {
    title.innerText = "🎊 Happy New Year in Advance 🎊";
  }
}, 1000);

/* ======================
   FIREWORKS SETUP
====================== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

class Firework {
  constructor(x = Math.random() * canvas.width) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.color = `hsl(${Math.random() * 360},100%,50%)`;
    this.speed = Math.random() * 4 + 4;
  }
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      for (let i = 0; i < 60; i++) {
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
  for (let i = 0; i < 4; i++) {
    fireworks.push(new Firework(e.clientX));
  }
  randomWish();
});

/* ======================
   ANIMATION LOOP
====================== */
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
setInterval(updateCountdown, 1000);
/* ======================
   DEEP GRADIENT RIPPLE
====================== */
const rippleContainer = document.getElementById("ripple-container");

function createRipple(x, y) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  rippleContainer.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1400);
}

window.addEventListener("click", (e) => {
  createRipple(e.clientX, e.clientY);
});
function createRipple(x, y) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";

  ripple.style.setProperty("--c1", `hsla(${Math.random()*360},100%,60%,0.9)`);
  ripple.style.setProperty("--c2", `hsla(${Math.random()*360},100%,50%,0.6)`);
  ripple.style.setProperty("--c3", `hsla(${Math.random()*360},100%,40%,0.3)`);

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  rippleContainer.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1400);
}
