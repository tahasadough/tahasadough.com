// Theme
window.toggleTheme = function () {
  var html = document.documentElement;
  var isLight = html.classList.toggle("light");
  var theme = isLight ? "light" : "dark";
  localStorage.setItem("theme", theme);
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
    btn.setAttribute("aria-pressed", isLight);
  }
  var icon = document.getElementById("theme-icon");
  if (icon) {
    icon.classList.add("scale-110", "rotate-180");
    setTimeout(function () {
      icon.innerHTML = isLight
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
      icon.classList.remove("scale-110", "rotate-180");
    }, 300);
  }
};

// Navbar scroll effect
(function initNavbar() {
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var navbar = document.getElementById("navbar");
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// Hero flower — entrance + parallax (spring physics)
(function initFlowerParallax() {
  var initialTop = 0;
  var targetY = 0, targetR = 0;
  var currentY = 0, currentR = 0;
  var velY = 0, velR = 0;
  var running = false;
  var STIFFNESS = 0.03;
  var DAMPING = 0.6;

  function entrance() {
    var inner = document.getElementById("hero-flower-inner");
    if (!inner) return;
    var img = inner.querySelector("img");
    if (!img) return;
    img.style.transform = "translateY(30px) rotate(-30deg) scale(0.75)";
    img.style.opacity = "0.2";
    void img.getBoundingClientRect();
    img.style.transform = "";
    img.style.opacity = "";
  }

  function updateTarget() {
    var wrapper = document.getElementById("hero-flower");
    var inner = document.getElementById("hero-flower-inner");
    if (!wrapper || !inner) return;
    if (!initialTop) {
      initialTop = wrapper.getBoundingClientRect().top + window.scrollY;
    }
    var scrollY = window.scrollY;
    var p = Math.max(0, Math.min(1, (scrollY - (initialTop - 500)) / 1300));
    targetY = p * 230;
    targetR = p * 45;
    if (!running) {
      running = true;
      tick();
    }
  }

  function tick() {
    var inner = document.getElementById("hero-flower-inner");
    if (!inner) { running = false; return; }
    var forceY = (targetY - currentY) * STIFFNESS;
    var forceR = (targetR - currentR) * STIFFNESS;
    velY = (velY + forceY) * DAMPING;
    velR = (velR + forceR) * DAMPING;
    currentY += velY;
    currentR += velR;
    inner.style.transform =
      "translateY(" + currentY.toFixed(2) + "px) rotate(" + currentR.toFixed(2) + "deg)";
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

  // Re-init after HTMX swap
  document.addEventListener("htmx:afterSettle", function () {
    initialTop = 0;
    entrance();
    updateTarget();
  });
})();

// Offline page detection
(function initOffline() {
  var msg = document.getElementById("offline-message");
  var link = document.getElementById("go-home-link");
  if (!msg) return;
  function update() {
    if (navigator.onLine) {
      msg.textContent = "Back online! Try refreshing the page.";
      if (link) link.style.display = "inline-block";
    } else {
      msg.textContent =
        "The page you requested isn't cached. Connect to the internet and try again.";
      if (link) link.style.display = "none";
    }
  }
  update();
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
})();

// Service worker
(function initSW() {
  if ("serviceWorker" in navigator) {
    var registration = null;
    var notif = document.getElementById("update-notification");
    function showUpdate() {
      if (notif) notif.style.display = "";
    }
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (reg) {
        registration = reg;
        if (reg.waiting) {
          showUpdate();
        }
        reg.addEventListener("updatefound", function () {
          var installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", function () {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdate();
            }
          });
        });
      })
      .catch(function () {});
  }
})();

window.onSWUpdateClick = function () {
  var notif = document.getElementById("update-notification");
  if (notif) notif.style.display = "none";
  navigator.serviceWorker.ready.then(function (reg) {
    var waiting = reg.waiting;
    if (waiting) {
      waiting.postMessage("SKIP_WAITING");
      waiting.addEventListener("statechange", function () {
        if (waiting.state === "activated") {
          window.location.reload();
        }
      });
    }
  });
};

// HTMX — smooth page navigation
(function initHtmxNav() {
  if (typeof htmx === "undefined") return;

  htmx.config.globalViewTransitions = true;
  var hasAnchor = false;

  document.addEventListener("htmx:beforeSwap", function (e) {
    if (e.detail.target !== document.body) return;
    var anchor =
      (e.detail.pathInfo && e.detail.pathInfo.anchor) ||
      (e.detail.requestConfig &&
        e.detail.requestConfig.url &&
        e.detail.requestConfig.url.split("#")[1]);
    hasAnchor = !!anchor;
    if (!hasAnchor) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });

  document.addEventListener("htmx:afterSettle", function () {
    var navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    if (!hasAnchor) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });
})();
