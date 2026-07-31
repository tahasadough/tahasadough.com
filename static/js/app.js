const root = document.documentElement;

window.toggleTheme = () => {
  const isLight = root.classList.toggle("light");
  const theme = isLight ? "light" : "dark";
  localStorage.setItem("theme", theme);

  const btn = document.getElementById("theme-toggle");
  btn?.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  btn?.setAttribute("aria-pressed", String(isLight));

  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.classList.add("scale-110", "rotate-180");
  setTimeout(() => {
    icon.innerHTML = isLight
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    icon.classList.remove("scale-110", "rotate-180");
  }, 300);
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 50);
    ticking = false;
  });
});

const onHome = () => window.location.pathname === "/";

document.addEventListener("click", (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const link = e.target.closest('a[href="/"], a[href^="/#"]');
  if (!link || !onHome()) return;
  e.preventDefault();
  const target = link.hash ? document.querySelector(link.hash) : null;
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

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
