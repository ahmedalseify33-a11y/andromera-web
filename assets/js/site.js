/* Andromera — site.js
   Nav toggle + scroll reveals. Nothing else.
   ≤ 12 KB uncompressed.
   ---------------------------------------------------- */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── NAV SCROLL STATE ─────────────────────────────── */
  var header = document.querySelector(".site-header");
  var scrollThreshold = 80;
  var lastScrolled = false;

  function checkScroll() {
    var scrolled = window.scrollY > scrollThreshold;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("is-scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }

  /* ── MOBILE MENU ──────────────────────────────────── */
  var hamburger = document.querySelector(".nav__hamburger");
  var mobileMenu = document.querySelector(".mobile-menu");
  var menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a, button") : [];
  var focusableInMenu = [];

  function openMenu() {
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
    // Collect focusable elements
    focusableInMenu = Array.from(mobileMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])'));
    if (focusableInMenu.length) focusableInMenu[0].focus();
  }

  function closeMenu() {
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
    hamburger.focus();
  }

  function toggleMenu() {
    var isOpen = hamburger.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", toggleMenu);

    // Close on Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
      }
      // Focus trap
      if (e.key === "Tab" && mobileMenu.classList.contains("is-open")) {
        if (focusableInMenu.length === 0) return;
        var first = focusableInMenu[0];
        var last = focusableInMenu[focusableInMenu.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // Close on link click
    menuLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on backdrop click
    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  /* ── WORD REVEAL (H1) ─────────────────────────────── */
  function splitWordReveal(element) {
    if (element.dataset.wordRevealReady === "true") return;

    var text = element.textContent || "";
    var parts = text.split(/(\s+)/);
    var wordIndex = 0;

    element.textContent = "";
    element.setAttribute("aria-label", text.trim());

    parts.forEach(function (part) {
      if (!part.trim()) {
        element.appendChild(document.createTextNode(part));
        return;
      }
      var word = document.createElement("span");
      word.className = "word-reveal__word";
      word.setAttribute("aria-hidden", "true");
      word.style.setProperty("--word-index", wordIndex);
      word.textContent = part;
      element.appendChild(word);
      wordIndex++;
    });

    element.dataset.wordRevealReady = "true";
    element.classList.add("is-ready");
  }

  function initWordReveals() {
    var elements = Array.from(document.querySelectorAll("[data-word-reveal]"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("is-ready", "is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, io) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach(function (el) {
      splitWordReveal(el);
      observer.observe(el);
    });
  }

  /* ── FADE-UP REVEALS ──────────────────────────────── */
  function initFadeUps() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-up").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, io) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".fade-up").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── WHATSAPP FLOAT ───────────────────────────────── */
  function initWhatsAppFloat() {
    var btn = document.querySelector(".whatsapp-float");
    if (!btn) return;

    var shown = false;
    function checkWhatsApp() {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (progress >= 0.3 && !shown) {
        btn.classList.add("is-visible");
        shown = true;
      }
    }

    window.addEventListener("scroll", checkWhatsApp, { passive: true });
    checkWhatsApp();
  }

  /* ── TIMELINE OBSERVER ────────────────────────────── */
  function initTimeline() {
    var timeline = document.querySelector(".timeline");
    if (!timeline) return;

    var steps = Array.from(timeline.querySelectorAll(".timeline__step"));
    var progressBar = timeline.querySelector(".timeline__progress-bar");
    if (!steps.length) return;

    if (reduceMotion) {
      steps.forEach(function (step) { step.classList.add("is-active"); });
      if (progressBar) progressBar.style.transform = "scaleY(1)";
      return;
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-active");
              updateProgressBar();
            }
          });
        },
        { threshold: 0.4, rootMargin: "0px 0px -20% 0px" }
      );

      steps.forEach(function (step) { observer.observe(step); });
    } else {
      steps.forEach(function (step) { step.classList.add("is-active"); });
    }

    function updateProgressBar() {
      if (!progressBar) return;
      var activeCount = steps.filter(function (s) { return s.classList.contains("is-active"); }).length;
      var ratio = activeCount / steps.length;
      var isDesktop = window.innerWidth >= 1000;
      if (isDesktop) {
        progressBar.style.transform = "scaleX(" + ratio + ")";
      } else {
        progressBar.style.transform = "scaleY(" + ratio + ")";
      }
    }

    window.addEventListener("scroll", updateProgressBar, { passive: true });
    window.addEventListener("resize", updateProgressBar, { passive: true });
  }

  /* ── VIDEO FAÇADE ─────────────────────────────────── */
  function initVideoFacade() {
    var frame = document.querySelector("[data-video-frame]");
    if (!frame) return;
    var btn = frame.querySelector("[data-video-play]");
    var media = frame.querySelector("[data-video-media]");
    if (!btn || !media) return;

    btn.addEventListener("click", function () {
      media.innerHTML =
        '<iframe class="video-frame__iframe" title="Andromera brand film" ' +
        'src="https://fast.wistia.net/embed/iframe/rdjieby67t?autoPlay=true&playerColor=00D4AA" ' +
        'allow="autoplay; fullscreen" frameborder="0" scrolling="no" ' +
        'width="100%" height="100%"></iframe>';
    });
  }

  /* ── DETAILS ANCHOR TARGETING ─────────────────────── */
  function openTargetRow() {
    var hash = location.hash ? location.hash.substring(1) : "";
    if (!hash) return;
    var el = document.getElementById(hash);
    if (el && el.tagName === "DETAILS") {
      el.open = true;
    }
  }

  /* ── AUDIT FORM HANDLER ────────────────────────────── */
  function initAuditForm() {
    var form = document.querySelector("#audit-form");
    if (!form) return;

    var stuckTextarea = form.querySelector("#audit-stuck");
    var charCount = form.querySelector("#char-count");
    var submittedOnce = false;

    if (stuckTextarea && charCount) {
      stuckTextarea.addEventListener("input", function () {
        charCount.textContent = stuckTextarea.value.length + " / 300";
      });
    }

    function validateField(group, input) {
      var isValid = true;
      if (input.type === "radio") {
        var checked = form.querySelector('input[name="' + input.name + '"]:checked');
        isValid = !!checked;
      } else {
        isValid = input.value.trim().length > 0;
      }

      group.classList.toggle("has-error", !isValid);
      input.setAttribute("aria-invalid", !isValid ? "true" : "false");
      return isValid;
    }

    function validateForm() {
      var firstInvalid = null;
      var allValid = true;

      var groups = Array.from(form.querySelectorAll(".form-group"));
      groups.forEach(function (group) {
        var input = group.querySelector("input, textarea");
        if (!input) return;

        var valid = validateField(group, input);
        if (!valid) {
          allValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) firstInvalid.focus();
      return allValid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submittedOnce = true;

      if (!validateForm()) return;

      var brand = (form.querySelector("#audit-brand").value || "").trim();
      var handle = (form.querySelector("#audit-handle").value || "").trim().replace(/^@/, "");
      var categoryEl = form.querySelector('input[name="category"]:checked');
      var category = categoryEl ? categoryEl.value : "";
      var stuck = (form.querySelector("#audit-stuck").value || "").trim();
      var name = (form.querySelector("#audit-name").value || "").trim();

      var msg = "Hi Andromera — I'd like the free brand audit.\n\n" +
                "Brand: " + brand + "\n" +
                "Instagram: @" + handle + "\n" +
                "Category: " + category + "\n" +
                "What's stuck: " + stuck + "\n\n" +
                "— " + name;

      var waUrl = "https://wa.me/201508824638?text=" + encodeURIComponent(msg);
      window.open(waUrl, "_blank", "noopener");
    });
  }

  /* ── INIT ─────────────────────────────────────────── */
  window.addEventListener("scroll", checkScroll, { passive: true });
  window.addEventListener("hashchange", openTargetRow);
  checkScroll();

  document.addEventListener("DOMContentLoaded", function () {
    initWordReveals();
    initFadeUps();
    initWhatsAppFloat();
    initTimeline();
    initVideoFacade();
    openTargetRow();
    initAuditForm();
  });
})();
