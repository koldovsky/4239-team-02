import { ProductsService } from "./products-service.js";
import { showAlert } from "./alert.js";

export class Cart {
	static #instance;
	constructor() {
		if (Cart.#instance) return Cart.#instance;
		Cart.#instance = this;
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
		let cartHtml = ` <div class="cart__product-image">
					<img
						src="img/best-deals-carousel/products-carousel-sauvignon-blanc.jpg"
						alt="wine photo"
						width="46"
						height="46"
					/>
				</div>
				<div class="cart__product-info">
					<div class="cart__product-name">
						<a href="#" target="_blank" class="cart__product-link">Sauvignon Blanc</a>
					</div>
					<span>
						<div class="cart__product-price">
							<p>17,00USD</p>
						</div>
						<div class="cart__product-quantity">
							<input type="number" value="2" min="1" />
						</div>
					</span>
				</div> `;
		for (const productId in this.cart) {
			const product = await this.productsService.getProductById(productId);
			cartHtml += this.createCartHtml(product);
			total += product.price * this.cart[productId];
		}
		cartHtml += ` <div class="row">
                          <div class="col-5"><strong>TOTAL</strong></div>
                          <div class="col-3"><strong>${total.toFixed(2)}USD</strong></div>
                       </div>`;
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
		document.querySelector(".cart-widget__count-number").innerHTML = Object.keys(this.cart).length;
	}
	createCartHtml(product) {
		return `<div class="row" data-id="${product.id}"> 
              <div class="col-5">${product.title}</div>
              <div class="col-3">${product.price}</div>
              <div class="col-2">${this.cart[product.id]}</div>
              <div class="col-1"><button data-id=${
								product.id
							} class="btn btn-sm plus">+</button></div>
              <div class="col-1"><button data-id=${
								product.id
							} class="btn btn-sm minus">-</button></div>
            </div>`;
	}
	changeQuantity(ev, operation) {
		ev.stopPropagation();
		operation.call(this, ev.target.dataset.id);
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
		const form = document.querySelector(".form-contacts");
		if (!form.checkValidity()) return showAlert("Please fill form correctly", false);
		ev.preventDefault();
		const data = new FormData();
		data.append("cart", JSON.stringify(this.cart));
		data.append("name", form.querySelector("input[name=name]").value);
		data.append("email", form.querySelector("input[name=email]").value);
		const response = await fetch("https://formspree.io/f/mrgjwwro", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: data,
		});
		if (response.ok) {
			form.reset();
			this.cart = {};
			this.saveCart();
			this.renderCart();
			showAlert("Thank you! ");
			document.querySelector("#modal-cart .close-btn").click();
		} else {
			showAlert("There is an error: " + error, false);
		}
	}
}
new Cart();
