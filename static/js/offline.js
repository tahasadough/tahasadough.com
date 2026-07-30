const msg = document.getElementById("offline-message");
const link = document.getElementById("go-home-link");

const update = () => {
  if (!msg) return;
  if (navigator.onLine) {
    msg.textContent = "Back online! Try refreshing the page.";
    if (link) link.style.display = "inline-block";
  } else {
    msg.textContent = "The page you requested isn't cached. Connect to the internet and try again.";
    if (link) link.style.display = "none";
  }
};

update();
window.addEventListener("online", update);
window.addEventListener("offline", update);
