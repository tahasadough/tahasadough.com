const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
const setThemeColor = (isLight) =>
  themeColor?.setAttribute("content", isLight ? "#faf5ef" : "#000000");

setThemeColor(root.classList.contains("light"));

window.toggleTheme = () => {
  const isLight = root.classList.toggle("light");
  const theme = isLight ? "light" : "dark";
  localStorage.setItem("theme", theme);
  setThemeColor(isLight);

  const btn = document.getElementById("theme-toggle");
  btn?.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  btn?.setAttribute("aria-pressed", String(isLight));

  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.classList.add("scale-110", "rotate-180");
  setTimeout(() => icon.classList.remove("scale-110", "rotate-180"), 300);
};

const STIFFNESS = 0.03;
const DAMPING = 0.6;

let initialTop = 0;
let currentY = 0, currentR = 0;
let velY = 0, velR = 0;
let targetY = 0, targetR = 0;
let running = false;

const inner = () => document.getElementById("hero-flower-inner");

function entrance() {
  const el = inner();
  const img = el?.querySelector("img");
  if (!img) return;
  img.style.transform = "translateY(30px) rotate(-30deg) scale(0.75)";
  img.style.opacity = "0.2";
  void img.getBoundingClientRect();
  img.style.transform = "";
  img.style.opacity = "";
}

function updateTarget() {
  const wrapper = document.getElementById("hero-flower");
  const el = inner();
  if (!wrapper || !el) return;
  if (!initialTop) {
    initialTop = wrapper.getBoundingClientRect().top + window.scrollY;
  }
  const p = Math.max(0, Math.min(1, (window.scrollY - (initialTop - 500)) / 1300));
  targetY = p * 230;
  targetR = p * 45;
  if (!running) {
    running = true;
    tick();
  }
}

function tick() {
  const el = inner();
  if (!el) { running = false; return; }
  const forceY = (targetY - currentY) * STIFFNESS;
  const forceR = (targetR - currentR) * STIFFNESS;
  velY = (velY + forceY) * DAMPING;
  velR = (velR + forceR) * DAMPING;
  currentY += velY;
  currentR += velR;
  el.style.transform = `translateY(${currentY.toFixed(2)}px) rotate(${currentR.toFixed(2)}deg)`;
  if (
    Math.abs(currentY - targetY) > 0.01 ||
    Math.abs(currentR - targetR) > 0.01 ||
    Math.abs(velY) > 0.005 ||
    Math.abs(velR) > 0.005
  ) {
    requestAnimationFrame(tick);
  } else {
    running = false;
    currentY = targetY;
    currentR = targetR;
  }
}

entrance();
window.addEventListener("scroll", updateTarget);
updateTarget();
