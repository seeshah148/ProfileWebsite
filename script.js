const themeButton = document.querySelector("[data-theme-toggle]");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function updateTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  const isDark = theme === "dark";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
}

updateTheme(getPreferredTheme());

themeButton.addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme;
  updateTheme(currentTheme === "dark" ? "light" : "dark");
});
const menuButton = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector("#primary-navigation");

function closeMenu() {
  navigationMenu.dataset.open = "false";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.textContent = "Menu";
}

menuButton.addEventListener("click", () => {
  const isOpen = navigationMenu.dataset.open === "true";

  navigationMenu.dataset.open = String(!isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );
  menuButton.textContent = isOpen ? "Menu" : "Close";
});

navigationMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigationMenu.dataset.open === "true") {
    closeMenu();
    menuButton.focus();
  }
});
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  document.body.classList.add("has-js");

  const revealItems = document.querySelectorAll(
    "main section:not(#home), footer"
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}