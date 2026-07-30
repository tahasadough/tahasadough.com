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
