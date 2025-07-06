import { ProductsService } from "./products-service.js";
import { showAlert } from "./alert.js";

function debounce(func, wait = 300) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

export class Cart {
	static #instance;

	constructor() {
		if (Cart.#instance) return Cart.#instance;
		Cart.#instance = this;
		//
		console.log("Cart initialized");
		this.container = document.querySelector(".cart__product");
		this.productsService = new ProductsService();
		this.cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
		this.addEventListeners();
		this.renderCart();
	}

	addEventListeners() {
		const cartBtn = document.querySelector(".cart-widget__button");
		const orderBtn = document.querySelector(".cart__order-button");

		if (cartBtn) cartBtn.addEventListener("click", this.renderCart.bind(this));
		if (orderBtn) orderBtn.addEventListener("click", this.order.bind(this));
	}

	async renderCart() {
		let total = 0;
		let qtySum = 0;
		let cartHtml = "";

		for (const productId in this.cart) {
			const product = await this.productsService.getProductById(productId);
			const qty = this.cart[productId];
			total += product.price * qty;
			qtySum += qty;
			cartHtml += this.createCartHtml(product);
		}

		// if (!cartHtml) {
		// 	cartHtml = "<p>Your cart is empty.</p>";
		// } else {
		// 	cartHtml += `
		//   <div class="row">
		//     <div class="col-5"><strong>TOTAL</strong></div>
		//     <div class="col-3"><strong>${total.toFixed(2)} USD</strong></div>
		//   </div>`;
		// }
		if (!cartHtml) {
			cartHtml = "<p>Your cart is empty.</p>";
		} else {
			cartHtml += `<div class="cart__product-price">
							<p>${total.toFixed(2)} USD</p>
						</div>`;
		}

		this.container.innerHTML = cartHtml;

		this.container
			.querySelectorAll(".plus")
			.forEach((el) =>
				el.addEventListener("click", (ev) => this.changeQuantity(ev, this.addProductOperation))
			);
		this.container
			.querySelectorAll(".minus")
			.forEach((el) =>
				el.addEventListener("click", (ev) => this.changeQuantity(ev, this.deleteProductOperation))
			);
		this.container.querySelectorAll(".cart__product-qty-input").forEach((input) =>
			input.addEventListener(
				"input",
				debounce((ev) => this.handleManualQtyInput(ev))
			)
		);

		document.querySelector(".cart-widget__count-number").textContent = qtySum;
	}

	createCartHtml(product) {
		return `<div class="cart__product" data-id="${product.id}">
      <div class="cart__product-image">
        <img src="img/${product.image}" alt="${product.title}" width="46" height="46" />
      </div>
      <div class="cart__product-info">
        <div class="cart__product-name">
          <a href="#" target="_blank" class="cart__product-link">${product.title}</a>
        </div>
        <span>
          <div class="product-price cart__product-price">
            <p>${product.price.toFixed(2)} USD</p>
          </div>
          <div class="cart__product-quantity">
           
            <input
              type="number"
              value="${this.cart[product.id]}"
              min="1"
              data-id="${product.id}"
              class="cart__product-qty-input"
            />
           
          </div>
        </span>
      </div>
    </div>`;
	}

	changeQuantity(ev, operation) {
		ev.stopPropagation();
		const id = ev.target.dataset.id;
		operation.call(this, id);
		this.saveCart();
		this.renderCart();
	}

	handleManualQtyInput(ev) {
		const input = ev.target;
		const id = input.dataset.id;
		let value = parseInt(input.value, 10);

		if (isNaN(value) || value < 1) {
			value = 1;
		}
		this.cart[id] = value;
		this.saveCart();
		this.renderCart();
	}

	addProductOperation(id) {
		this.cart[id] = (this.cart[id] || 0) + 1;
	}

	deleteProductOperation(id) {
		if (this.cart[id] > 1) {
			this.cart[id] -= 1;
		} else {
			delete this.cart[id];
		}
	}

	addProduct(id) {
		this.addProductOperation(id);
		this.saveCart();
		this.renderCart();
	}

	saveCart() {
		localStorage.setItem("cart", JSON.stringify(this.cart));
	}

	async order(ev) {
		if (Object.keys(this.cart).length === 0)
			return showAlert("Please choose products to order", false);

		const form = document.querySelector(".cart__form");
		if (!form.checkValidity()) return showAlert("Please fill form correctly", false);

		ev.preventDefault();

		const data = new FormData();
		data.append("cart", JSON.stringify(this.cart));
		data.append("name", form.querySelector("input[name=name]").value);
		data.append("email", form.querySelector("input[name=email]").value);

		const response = await fetch("https://formspree.io/f/mrgjwwro", {
			method: "POST",
			headers: { Accept: "application/json" },
			body: data,
		});

		if (response.ok) {
			form.reset();
			this.cart = {};
			this.saveCart();
			this.renderCart();
			showAlert("Thank you!");
			document.querySelector("#modal-cart .close-btn")?.click();
		} else {
			showAlert("There was an error placing your order.", false);
		}
		// Дякую за замовлення
		if (response.ok) {
			form.reset();
			this.cart = {};
			this.saveCart();
			this.renderCart();
			showAlert("Thank you!");
			document.querySelector("#modal-cart .close-btn")?.click();

			// Перехід після підтвердження:
			window.open("https://koldovsky.github.io/4239-team-02/order-confirmation.html", "_blank");
		}
	}
}

new Cart();
