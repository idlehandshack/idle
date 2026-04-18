document.addEventListener("DOMContentLoaded", () => {
    console.log("Base loaded");

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});

/* ========= DJANGO FLASH MESSAGES ========= */
const messages = document.querySelectorAll(".flash-message");

messages.forEach((msg, i) => {
  msg.style.opacity = "0";
  msg.style.transform = "translateY(-10px)";

  // staggered entrance
  setTimeout(() => {
    msg.style.transition = "all 0.4s ease";
    msg.style.opacity = "1";
    msg.style.transform = "translateY(0)";
  }, i * 150);

  // auto-dismiss after 4 s
  setTimeout(() => removeMessage(msg), 4000 + i * 200);

  const closeBtn = msg.querySelector(".close-btn");
  if (closeBtn) closeBtn.addEventListener("click", () => removeMessage(msg));
});

function removeMessage(msg) {
  if (!msg.isConnected) return; // already removed — skip
  msg.style.transition = "all 0.3s ease";
  msg.style.opacity = "0";
  msg.style.transform = "translateY(-10px)";
  setTimeout(() => msg.remove(), 300);
}
/* ============================================================
       TOAST
    ============================================================ */
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// Wire up data-toast buttons
document.querySelectorAll("[data-toast]").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    showToast(this.getAttribute("data-toast"));
  });
});

/* ============================================================
       HAMBURGER / MOBILE MENU
    ============================================================ */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("mobileMenuClose");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});

menuClose.addEventListener("click", () => {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
});

/* ============================================================
       COUNT-UP ANIMATION (triggered on scroll)
    ============================================================ */
function animateCount(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const suffix = el.getAttribute("data-suffix") || "+";
  const duration = 1800;
  const step = 16;
  const steps = Math.ceil(duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current++;
    const value = Math.round(easeOut(current / steps) * target);
    el.textContent = value + suffix;
    if (current >= steps) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

const countEls = document.querySelectorAll(".count-up");
let counted = false;

const observer = new IntersectionObserver(
  (entries) => {
    if (entries.some((e) => e.isIntersecting) && !counted) {
      counted = true;
      countEls.forEach((el) => animateCount(el));
    }
  },
  { threshold: 0.3 },
);

countEls.forEach((el) => observer.observe(el));

/* ============================================================
       HERO SLIDER DOTS (visual toggle only, extend to swap images)
    ============================================================ */
const heroImages = [
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2670",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2670",
];

const heroImg = document.querySelector(".hero-image-wrapper img");
const dots = document.querySelectorAll(".slider-dots .dot");
let currentSlide = 0;

function goToSlide(index) {
  currentSlide = index;
  heroImg.style.opacity = "0";
  heroImg.style.transition = "opacity 0.4s ease";
  setTimeout(() => {
    heroImg.src = heroImages[index];
    heroImg.style.opacity = "1";
  }, 400);
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

dots.forEach((dot, i) => {
  dot.style.cursor = "pointer";
  dot.addEventListener("click", () => goToSlide(i));
});

// Auto-advance every 5s
setInterval(() => {
  goToSlide((currentSlide + 1) % heroImages.length);
}, 5000);

/* ============================================================
       SCROLL-REVEAL (lightweight fade-in)
    ============================================================ */
const revealStyle = document.createElement("style");
revealStyle.textContent = `
      .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
      .reveal.visible { opacity: 1; transform: translateY(0); }
    `;
document.head.appendChild(revealStyle);

const revealTargets = [
  ".class-card",
  ".step-card",
  ".why-card",
  ".section-title",
  ".section-desc",
  ".why-us-title",
  ".cta-title",
  ".cta-desc",
];

revealTargets.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));
