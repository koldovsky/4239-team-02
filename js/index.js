function init() {
  // Anna Snitko - Block 1
  import("./global.header-burger.js");

  // Anna Snitko - Block 4
  import("./index.best-deals-carousel.js");

  // Vladyslav Savchuk - Block 11
  import("./index.testimonials-carousel.js");

  // Ryzhlov Oleksandr - Block 13
  import("./index.faq.partial.js");

  // Iryna Zhmailo - Block 17 
  import("./products-service.js");
  import("./cart.js");
  import("./product-list.js");

  import("./index.modal-shopping-cart.js");

  // import("./index.order-confirmation.js");


  // Andrii Rybak - Block 16
  import("./global.confirmation-of-age-modal.js")
    .then(module => {
      module.initAgeModal();
    });
}


const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
