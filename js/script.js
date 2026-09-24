"use strict";

// Mobile navigation supports keyboard dismissal and restores focus on Escape.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-shell")) setMenuOpen(false);
});

window.matchMedia("(max-width: 850px)").addEventListener("change", () => setMenuOpen(false));

// Close the mobile menu when navigating to a section.
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((link) => {
  link.addEventListener("click", () => {
    const destination = document.querySelector(link.getAttribute("href"));
    if (navigation.contains(link) && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      if (destination) {
        destination.focus({ preventScroll: true });
      } else {
        menuToggle.focus();
      }
    }
  });
});
