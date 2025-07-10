class Info {
  constructor(containerSelector, dataService) {
    this.container = document.querySelector(containerSelector);
    this.dataService = dataService;

    this.container.closest("body").addEventListener("slideChange", (e) => {
      this.render(e.detail.id);
    });
  }
  //
  async render(id) {
    await this.dataService.load(); // на всяк випадок, якщо дані ще не завантажені
    const item = this.dataService.getItemById(id);
    // Заповнення HTML-елементів даними
    this.container.querySelector(".info__title").textContent = `${item.title} (0930491)`;
    this.container.querySelector(".info__price").textContent = `${item.price},00 USD`;
    this.container.querySelector(".info__code").textContent = item.id;
    this.container.querySelector(".description__text").textContent = item.description;
  }
}

export { Info };
