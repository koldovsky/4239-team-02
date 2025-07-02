const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header-nav__panel-mobile");
const menuLinks = document.querySelectorAll(".header-nav__menu-link-mobile");
const header = document.querySelector(".header");

function toggleMenu() {
  burger.classList.toggle("is-active");
  nav.classList.toggle("is-open");
  document.body.classList.toggle("no-scroll");
  header.classList.toggle("no-scroll");
}

function closeMenu() {
  burger.classList.remove("is-active");
  nav.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  header.classList.remove("no-scroll");
}

burger.addEventListener("click", toggleMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
