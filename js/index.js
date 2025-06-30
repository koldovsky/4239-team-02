function init() {
  // Anna Snitko - Block 1
  import("./global.header-burger.js");

  // Anna Snitko - Block 4
  import("./index.best-deals-carousel.js");

  // Ryzhlov Oleksandr - Block 13
  import("./index.faq.partial.js");

  // Iryna Zhmailo - Block 17 + order-confirmation block

  // import("./index.modal-cart-widget.js");

  // import("./index.modal-shopping-cart.js");

  // import("./index.order-confirmation.js");
}


const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});

