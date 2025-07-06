import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";

export class ProductList {
	constructor() {
		this.container = document.querySelector(".cart__product");
		this.productsService = new ProductsService();
		this.renderProducts();
	}

	async renderProducts() {
		let productListHtml = "";
		const products = await this.productsService.getProducts();
		products.forEach((product) => {
			productListHtml += this.createProductHtml(product);
		});
		this.container.innerHTML = productListHtml;
		this.addEventListeners();
	}

	createProductHtml(product) {
		return `<article class="card col-12 col-sm-6 col-md-4 col-lg-3">
			<img src="img/${product.image}" class="card-img-top" alt="${product.title}">
			<div class="card-body">
				<h5 class="card-title">${product.title}</h5>
				<a href="#" class="product-price btn-buy button button--filled" data-id=${product.id}>${product.price} Add to cart</a>
			</div>
		</article>`;
	}

	addEventListeners() {
		document.querySelectorAll(".btn-buy").forEach((btn) => {
			btn.addEventListener("click", this.addProductToCart.bind(this));
		});
	}

	addProductToCart(event) {
		event.preventDefault();
		const id = event.target.dataset.id;
		const cart = new Cart();
		cart.addProduct(id);
	}
}

new ProductList();
