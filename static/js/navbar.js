let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 50);
    ticking = false;
  });
});
