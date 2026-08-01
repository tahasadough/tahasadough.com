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
  btn?.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
  btn?.setAttribute("aria-pressed", String(isLight));

  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  icon.classList.add("scale-110", "rotate-180");
  setTimeout(() => icon.classList.remove("scale-110", "rotate-180"), 300);
};

const flower = document.getElementById("hero-flower-inner");
if (flower && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const base =
    document.getElementById("hero-flower").getBoundingClientRect().top +
    scrollY;
  let p = 0,
    v = 0;

  const step = () => {
    const target = Math.max(0, Math.min(1, (scrollY - base + 500) / 1300));
    p += v = (v + (target - p) * 0.03) * 0.6;
    flower.style.transform = `translateY(${(p * 230).toFixed(2)}px) rotate(${(p * 45).toFixed(2)}deg)`;
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
