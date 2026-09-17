/* ThreatX — shared frontend utilities (navigation + toasts) */

(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(function () {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");

    // Mobile menu toggle
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        var icon = toggle.querySelector("i");
        if (icon) {
          icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
      });
      document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains("is-open")) {
          menu.classList.remove("is-open");
          var icon = toggle.querySelector("i");
          if (icon) icon.className = "fa-solid fa-bars";
          document.body.style.overflow = "";
        }
      });
    }

    // Dropdowns on mobile (tap to open)
    document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
      var trigger = dd.querySelector(".nav-dropdown-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          var open = dd.classList.toggle("is-open");
          if (open) {
            document.querySelectorAll(".nav-dropdown.is-open").forEach(function (other) {
              if (other !== dd) other.classList.remove("is-open");
            });
          }
        }
      });
      document.addEventListener("click", function (e) {
        if (!dd.contains(e.target) && window.innerWidth <= 900) {
          dd.classList.remove("is-open");
        }
      });
    });
  });

  // Global toast helper (optional; pages may keep their own message logic)
  window.showToast = function (message, type) {
    var known = document.getElementById("messageBox");
    var text = document.getElementById("messageText");
    if (known && text) {
      text.textContent = message;
      known.className = "message-box show " + (type || "success");
      setTimeout(function () { known.classList.remove("show"); }, 3200);
      return;
    }
    var toast = document.createElement("div");
    toast.className = "message-box show " + (type || "success");
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 400);
    }, 3200);
  };
})();