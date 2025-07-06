import { Cart } from "./cart.js";
import { ProductsService } from "./products-service.js";
import { showAlert } from "./alert.js";

//
{
	/* <li class="craft-wines__item">
				<a class="craft-wines__link" href="#">
					<img
						class="craft-wines__image"
						src="img/craft-wines/pinotnoir.jpeg"
						alt="bottle of pinot noir wine"
					/>
					<span class="craft-wines__name"> Pinot Noir </span>
				</a>
				<span class="product-price craft-wines__price"> 12,00USD </span>
				<a class="craft-wines__button btn" data-id="5" href="#">Add to cart</a>
			</li> */
}

//

// <img
// 	class="best-deals__product-img"
// 	src="img/best-deals-carousel/products-carousel-pinot-grigio.jpg"
// 	alt="Pinot grigio bottle"
// />
// <h3 class="best-deals__product-title">Pinot Grigio</h3>
// <p class="product-price best-deals__product-price">10,00 USD</p>
// <div class="button--block">
// 	<a data-id="4" href="#" class="btn-buy button button--filled">
// 		Add to cart
// 	</a>
// </div>

//
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
               
                    <a href="#" class="product-price btn-buy button button--filled" data-id=${product.id}> ${product.price} Add to cart</a>
                </div>
        </article>`;
	}
	addEventListeners() {
		// document.querySelectorAll(".btn-info").forEach((btn) => {
		// 	btn.addEventListener("click", this.showProductInfo.bind(this));
		// });
		document.querySelectorAll(".btn-buy").forEach((btn) => {
			btn.addEventListener("click", this.addProductToCart.bind(this));
		});
	}
	async showProductInfo(event) {
		const id = event.target.dataset.id;
		const product = await this.productsService.getProductById(id);
		const modal = document.querySelector("#product-info-modal");
		modal.querySelector(".cart__header-title").innerHTML = product.title;
		modal.querySelector(".cart__product-image").src = `img/${product.image}`;

		modal.querySelector(".product-price").innerHTML = product.price;
		modal.querySelector(".btn-buy").dataset.id = product.id;
	}
	//  ??? !!!
	addProductToCart(event) {
		const id = event.target.dataset.id;
		const cart = new Cart();
		cart.addProduct(id);
		showAlert("Added to cart!");
	}
}
new ProductList();
