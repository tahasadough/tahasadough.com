const notif = document.getElementById("update-notification");
const showUpdate = () => { if (notif) notif.style.display = ""; };

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      if (reg.waiting) showUpdate();

      reg.addEventListener("updatefound", () => {
        reg.installing?.addEventListener("statechange", () => {
          if (reg.installing?.state === "installed" && navigator.serviceWorker.controller) {
            showUpdate();
          }
        });
      });
    })
    .catch(() => {});
}

window.onSWUpdateClick = () => {
  if (notif) notif.style.display = "none";
  navigator.serviceWorker.ready.then((reg) => {
    const { waiting } = reg;
    if (!waiting) return;
    waiting.postMessage("SKIP_WAITING");
    waiting.addEventListener("statechange", () => {
      if (waiting.state === "activated") window.location.reload();
    });
  });
};
