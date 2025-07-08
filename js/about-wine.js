function initAll() {
  // import("./burger.js").then(m => m.initBurger());
  import("./about-wine.counter.js").then(m => new m.QuantityWine('#quantity-wine'))
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;

let loadedCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedCount++;
  if (loadedCount === totalPartials) initAll();
});


// const input = document.querySelector('.quantity__wine')
// const title = document.querySelector('.info__title')
// console.log(title);
