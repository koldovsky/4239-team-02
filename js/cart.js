import { ProductsService } from "./products-service.js";

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

		this.container = document.querySelector(".cart__products");
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

		if (!cartHtml) {
			cartHtml = "<p>Your cart is empty.</p>";
		} else {
			cartHtml += `<div class="cart__total">
			<p>Total: ${total.toFixed(2)} USD</p>
		</div>`;
		}

		this.container.innerHTML = cartHtml;
		this.updateCartBadge(qtySum);

		this.container.querySelectorAll(".cart__product-qty-input").forEach((input) =>
			input.addEventListener(
				"input",
				debounce((ev) => this.handleManualQtyInput(ev))
			)
		);

		this.container.querySelectorAll(".cart__product-remove").forEach((btn) =>
			btn.addEventListener("click", (ev) => {
				const id = ev.target.dataset.id;
				delete this.cart[id];
				this.saveCart();
				this.renderCart();
			})
		);
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
<button class="cart__product-remove" data-id="${product.id}" aria-label="Remove product">
					<svg width="14" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10 2h3.6c.2 0 .4.2.4.4v1.2c0 .2-.2.4-.4.4H.4C.2 4 0 3.9 0 3.6V2.4c0-.2.2-.4.4-.3h3.7V2L4.9.3c.1-.2.2-.3.4-.3h3.5c.1 0 .3.1.4.2l.8 1.7V2zM1.8 16.1c.1 1 1 1.9 2 1.9h6.3c1.1 0 1.9-.8 2-1.9l1-11.1H1l.8 11.1zM12 6l-.8 10.1c0 .5-.5.9-1 .9H3.8c-.5 0-1-.4-1-.9L2 6h10zM5 8.1h1v6H5v-6zm4 0H8v6h1v-6z"
							fill="#9199AB"
						></path>
					</svg>
				</button>
				</span>
			</div>
		</div>`;
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

	addProduct(id) {
		this.cart[id] = (this.cart[id] || 0) + 1;
		this.saveCart();
		this.renderCart();
		this.flashCartIcon();
	}

	saveCart() {
		localStorage.setItem("cart", JSON.stringify(this.cart));
	}

	updateCartBadge(qtySum) {
		const badge = document.querySelector(".cart-widget__count-number");
		if (badge) {
			badge.textContent = qtySum;
			if (qtySum > 0) {
				badge.classList.add("active-cart");
			} else {
				badge.classList.remove("active-cart");
			}
		}
	}

	flashCartIcon() {
		const icon = document.querySelector(".cart-widget__icon");
		if (icon) {
			icon.classList.add("active");
			setTimeout(() => icon.classList.remove("active"), 3000);
		}
	}

	async order(ev) {
		if (Object.keys(this.cart).length === 0) return;

		const form = document.querySelector(".cart__form");
		if (!form.checkValidity()) return;

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
			window.open("https://koldovsky.github.io/4239-team-02/order-confirmation.html", "_blank");
		}
	}
}

new Cart();
