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

  /* ── INIT ─────────────────────────────────────────── */
  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();

  document.addEventListener("DOMContentLoaded", function () {
    initWordReveals();
    initFadeUps();
    initWhatsAppFloat();
  });
})();
