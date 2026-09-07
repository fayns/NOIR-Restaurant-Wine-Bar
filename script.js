const mobileMenu = document.querySelector(".mobile-menu");
const menuToggle = document.querySelector(".menu-toggle");
const body = document.body;

menuToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const siblings = [...entry.target.parentElement.querySelectorAll(".reveal")];
      const index = siblings.indexOf(entry.target);

      entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorRing) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;

    cursorDot.style.left = `${targetX}px`;
    cursorDot.style.top = `${targetY}px`;
  });

  const animateCursor = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;

    cursorRing.style.left = `${currentX}px`;
    cursorRing.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.querySelectorAll("a, button, select").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorRing.style.width = "46px";
      cursorRing.style.height = "46px";
      cursorRing.style.borderColor = "rgba(217, 255, 103, 0.8)";
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.style.width = "30px";
      cursorRing.style.height = "30px";
      cursorRing.style.borderColor = "rgba(236, 232, 223, 0.55)";
    });
  });
}

const reservationForm = document.querySelector(".reservation-form");
const formStatus = document.querySelector(".form-status");

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(reservationForm);
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    formStatus.textContent = "Please enter your name.";
    return;
  }

  formStatus.textContent = `Thanks, ${name}. Your request has been received.`;

  reservationForm.reset();
});

const dateInput = document.querySelector('input[type="date"]');

if (dateInput) {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];

  dateInput.min = localToday;
}
