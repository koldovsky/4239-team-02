class Slider {
  constructor(containerSelector, dataService) {
    this.container = document.querySelector(containerSelector);
    this.dataService = dataService;
    this.currentIndex = 4;

    this.init();
    console.log();
  }
  //
  async init() {
    await this.dataService.load();
    this.renderSlide();
    this.nextSlide();
    this.prevSlide();
    this.dispatchChange();
  }

  renderSlide() {
    const data = this.dataService.getAllData();
    const img = this.container.querySelector("img");
    img.src = `img/${data[this.currentIndex].image}`;
    img.alt = data[this.currentIndex].alt;
  }

  nextSlide() {
    const sliderLength = this.dataService.getAllData().length;
    this.container.querySelector("#btn-next").addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % sliderLength;
      this.renderSlide();
      this.dispatchChange();
    });
  }

  prevSlide() {
    const sliderLength = this.dataService.getAllData().length;
    this.container.querySelector("#btn-prev").addEventListener("click", () => {
      this.currentIndex = (this.currentIndex - 1 + sliderLength) % sliderLength;
      this.renderSlide();
      this.dispatchChange();
    });
  }

  dispatchChange() {
    const id = this.dataService.getAllData()[this.currentIndex].id;
    
    this.container.dispatchEvent(
      new CustomEvent("slideChange", {
        detail: { id },
        bubbles: true,
      })
    );
  }
}

export { Slider };
