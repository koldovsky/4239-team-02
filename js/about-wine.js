import { Slider } from "./about-wind.slider.js";
import { QuantityWine } from "./about-wine.counter.js";

function initAll() {

  import("./about-wine.data-service.js").then(({ DataService }) => {
    const dataService = new DataService("api/products.json");
    // actual slider
    import("./about-wind.slider.js").then(({Slider}) => {
      new Slider(".abw-slider", dataService)
    })
    // info about product
    import("./about-wine.info.js").then(({ Info }) => {
      new Info('.info', dataService)
    })
    
    // quantity wien...
    import("./about-wine.counter.js").then(({ QuantityWine }) => {
      new QuantityWine("#quantity-wine")
    });
  });
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
