function init() {
  // Anna Snitko - Block 1
  import("./global.header-burger.js");

  // Anna Snitko - Block 4
  import("./index.best-deals-carousel.js");

  // Vladyslav Savchuk - Block 11
  import("./index.testimonials-carousel.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});