class QuantityWine {
  constructor(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    this.input = container.querySelector("input");
    this.incrementBtn = container.querySelector("#increment-bottle");
    this.decrementBtn = container.querySelector("#decrement-bottle");

    this.incrementBtn.addEventListener("click", () => this.increment());
    this.decrementBtn.addEventListener("click", () => this.decrement());
  }
  increment() {
    const value = parseInt(this.input.value) || 0;
    this.input.value = value + 1;
  }
  decrement() {
    const value = parseInt(this.input.value) || 0;
    const minValue = parseInt(this.input.min) || 0;
    if (value > minValue) {
      this.input.value = value - 1;
    }
  }
}

export { QuantityWine };
