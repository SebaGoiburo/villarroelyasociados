/* =====================================================================
   Villarroel & Asociados Consultora — Interacciones del sitio
   Navegación mobile, FAQ acordeón, formulario nativo, medición de eventos.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Medición de eventos (GA4 / GTM dataLayer) ---------- */
  // Eventos: click_whatsapp, form_submit, click_email, click_phone
  function track(eventName, params) {
    var payload = Object.assign({ event: eventName }, params || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
    // Útil para depurar en desarrollo:
    if (window.console && window.location.hostname === "localhost") {
      console.log("[track]", eventName, params || {});
    }
  }
  window.vaTrack = track;

  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (href.indexOf("wa.me") > -1 || href.indexOf("api.whatsapp") > -1) {
      track("click_whatsapp", { location: link.dataset.waLocation || "site" });
    } else if (href.indexOf("mailto:") === 0) {
      track("click_email", {});
    } else if (href.indexOf("tel:") === 0) {
      track("click_phone", {});
    }
  });

  /* ---------- Menú mobile (hamburguesa) ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- FAQ acordeón ---------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var expanded = btn.getAttribute("aria-expanded") === "true";
      // Cerrar otros del mismo grupo
      var group = btn.closest(".faq");
      if (group) {
        group.querySelectorAll(".faq__q").forEach(function (other) {
          if (other !== btn) {
            other.setAttribute("aria-expanded", "false");
            other.nextElementSibling.style.maxHeight = null;
          }
        });
      }
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });

  /* ---------- Formulario nativo + WhatsApp prearmado ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var success = document.querySelector("#form-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrap = field.closest(".field") || field.closest(".checkbox");
        var ok = field.type === "checkbox" ? field.checked : String(field.value).trim() !== "";
        if (field.type === "email" && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (wrap) wrap.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;

      track("form_submit", {
        tipo_organizacion: (form.querySelector("#org-type") || {}).value || "",
        servicio_interes: (form.querySelector("#service") || {}).value || ""
      });

      // Mostrar confirmación nativa
      if (success) {
        success.classList.add("show");
        success.setAttribute("tabindex", "-1");
        success.focus();
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();

      // NOTA: conectar este envío a un backend / servicio de email + registro de leads.
    });

    // Quitar estado de error al escribir
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      f.addEventListener("input", function () {
        var wrap = f.closest(".field") || f.closest(".checkbox");
        if (wrap) wrap.classList.remove("invalid");
      });
    });
  }

  /* ---------- Filtro de categorías en Recursos ---------- */
  var pills = document.querySelectorAll(".cat-pill");
  var articles = document.querySelectorAll("[data-category]");
  if (pills.length && articles.length) {
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        var cat = pill.dataset.filter;
        pills.forEach(function (p) { p.dataset.active = "false"; });
        pill.dataset.active = "true";
        articles.forEach(function (art) {
          var show = cat === "all" || art.dataset.category === cat;
          art.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Año dinámico en footer ---------- */
  var yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
