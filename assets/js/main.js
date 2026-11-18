/* DOV Pastelería · interacciones */
(function () {
  "use strict";

  var doc = document;
  var head = doc.getElementById("site-head");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header state --------------------------------------------------------- */
  var lastScroll = -1;
  function updateHeader() {
    var y = window.scrollY || window.pageYOffset;
    if (y === lastScroll) return;
    lastScroll = y;
    if (!head) return;
    head.classList.toggle("is-scrolled", y > 34);
  }
  updateHeader();
  window.addEventListener("scroll", function () {
    window.requestAnimationFrame(updateHeader);
  }, { passive: true });

  /* Mobile menu ---------------------------------------------------------- */
  var mobileMenu = doc.getElementById("mobile-menu");
  var menuToggle = doc.querySelector(".menu-toggle");
  var menuClose = doc.querySelector("[data-close-menu]");
  var lastFocus = null;

  function openMenu() {
    if (!mobileMenu) return;
    lastFocus = doc.activeElement;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
    if (menuToggle) menuToggle.setAttribute("aria-label", "Cerrar menú");
    doc.body.classList.add("is-locked");
    if (menuClose) menuClose.focus();
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.setAttribute("aria-label", "Abrir menú");
    doc.body.classList.remove("is-locked");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (mobileMenu && mobileMenu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("is-open")) closeMenu();
  });

  /* Background video toggles -------------------------------------------- */
  doc.querySelectorAll("[data-video-toggle]").forEach(function (btn) {
    var section = btn.closest("section");
    var video = section ? section.querySelector("video") : null;
    if (!video) return;
    var label = btn.querySelector("span");

    function paint(paused) {
      btn.classList.toggle("is-paused", paused);
      if (label) label.textContent = paused ? "Reproducir video" : "Pausar video";
      btn.setAttribute("aria-label", paused ? "Reproducir video" : "Pausar video");
    }

    btn.addEventListener("click", function () {
      if (video.paused) {
        var play = video.play();
        if (play && typeof play.catch === "function") play.catch(function () {});
        paint(false);
      } else {
        video.pause();
        paint(true);
      }
    });

    if (reduceMotion) {
      video.pause();
      paint(true);
    }
  });

  /* Product filters ------------------------------------------------------ */
  var filterButtons = Array.prototype.slice.call(doc.querySelectorAll("[data-filter]"));
  var productCards = Array.prototype.slice.call(doc.querySelectorAll(".product-card"));

  function applyFilter(cat) {
    filterButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-filter") === cat;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    productCards.forEach(function (card) {
      var cats = (card.getAttribute("data-cat") || "").split(/\s+/);
      var show = cat === "todos" || cats.indexOf(cat) !== -1;
      card.classList.toggle("is-hidden", !show);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter") || "todos");
    });
  });

  doc.querySelectorAll("[data-filter-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      applyFilter(link.getAttribute("data-filter-link") || "todos");
    });
  });

  /* Product dialog ------------------------------------------------------- */
  var products = {
    medialunas: {
      title: "Medialunas de manteca",
      tag: "Panadería",
      desc: "Doradas, hojaldradas y recién salidas del horno. Dulces o saladas, son el clásico que nunca falla. También hay medialunas rellenas y de masa madre.",
      img: "assets/img/medialunas.jpg"
    },
    croissant: {
      title: "Croissant de chocolate",
      tag: "Pastelería",
      desc: "Hojaldre de manteca, corazón de chocolate y una terminación que se disfruta despacio. Ideal para la merienda o para regalar.",
      img: "assets/img/croissant.jpg"
    },
    chocotorta: {
      title: "Chocotorta",
      tag: "Pastelería",
      desc: "El clásico argentino en versión DOV: capas generosas, chocolate y dulce de leche de verdad. Se puede pedir por porción o entera.",
      img: "assets/img/chocotorta.jpg"
    },
    pan: {
      title: "Pan de masa madre",
      tag: "Panadería",
      desc: "Corteza crujiente, miga húmeda y el sabor que solo da el tiempo de fermentación. Recién horneado, todos los días.",
      img: "assets/img/pan.jpg"
    },
    rogel: {
      title: "Rogel",
      tag: "Pastelería",
      desc: "Capas finas, dulce de leche y merengue. Un clásico de la pastelería argentina que en DOV tiene sabor casero.",
      img: "assets/img/rogel.jpg"
    },
    tarta: {
      title: "Tarta del café",
      tag: "Café & salado",
      desc: "La opción salada para el mediodía o la merienda en DOV Café. Consultanos por la variedad del día.",
      img: "assets/img/cafe-tarta.jpg"
    },
    crumble: {
      title: "Crumble de manzana",
      tag: "Pastelería",
      desc: "Manzana, avena y canela. Tibio, casero y perfecto con un café. Una de las opciones que siempre aparece en la vitrina.",
      img: "assets/img/crumble.jpg"
    },
    frutos: {
      title: "Frutos rojos",
      tag: "Pastelería",
      desc: "Ácido, dulce y fresco. Una de las tantas tentaciones de la vitrina, ideal para quienes buscan algo distinto.",
      img: "assets/img/frutos-rojos.jpg"
    }
  };

  var dialog = doc.getElementById("product-dialog");
  var dialogImg = doc.getElementById("product-dialog-img");
  var dialogTag = doc.getElementById("product-dialog-tag");
  var dialogTitle = doc.getElementById("product-dialog-title");
  var dialogDesc = doc.getElementById("product-dialog-desc");
  var dialogBtn = doc.getElementById("product-dialog-btn");

  function openProduct(key) {
    var p = products[key];
    if (!p || !dialog) return;
    if (dialogImg) { dialogImg.src = p.img; dialogImg.alt = p.title + " de DOV"; }
    if (dialogTag) dialogTag.textContent = p.tag;
    if (dialogTitle) dialogTitle.textContent = p.title;
    if (dialogDesc) dialogDesc.textContent = p.desc;
    if (dialogBtn) {
      dialogBtn.href = "https://wa.me/5492235388289?text=" + encodeURIComponent("Hola DOV! Quiero consultar por " + p.title + ".");
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  doc.querySelectorAll("[data-open-product]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openProduct(btn.getAttribute("data-open-product"));
    });
  });
  doc.querySelectorAll("[data-close-product]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (dialog && typeof dialog.close === "function") dialog.close();
      else if (dialog) dialog.removeAttribute("open");
    });
  });
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  /* Order form -> WhatsApp ---------------------------------------------- */
  var form = doc.getElementById("order-form");
  var status = doc.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (doc.getElementById("name") || {}).value || "";
      var branch = (doc.getElementById("branch") || {}).value || "";
      var topic = (doc.getElementById("topic") || {}).value || "";
      var message = (doc.getElementById("message") || {}).value || "";
      name = name.trim();
      message = message.trim();

      if (!name) {
        if (status) { status.textContent = "Contanos tu nombre para poder responderte."; status.classList.add("is-error"); }
        var nameField = doc.getElementById("name");
        if (nameField) nameField.focus();
        return;
      }
      if (!topic) {
        if (status) { status.textContent = "Elegí una opción para saber qué estás buscando."; status.classList.add("is-error"); }
        var topicField = doc.getElementById("topic");
        if (topicField) topicField.focus();
        return;
      }

      var text = "Hola DOV! Soy " + name + ".\n" +
        "Sucursal: " + branch + ".\n" +
        "Consulta: " + topic + ".";
      if (message) text += "\n" + message;

      if (status) {
        status.classList.remove("is-error");
        status.textContent = "Abriendo WhatsApp con tu mensaje listo para enviar…";
      }
      window.open("https://wa.me/5492235388289?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  /* Reveal on scroll ----------------------------------------------------- */
  var revealItems = doc.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* Year ----------------------------------------------------------------- */
  var year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
