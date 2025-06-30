function setupCartModalHandlers() {
	const cartWidgetButton = document.querySelector(".cart-widget__button");
	const cartSection = document.querySelector(".cart");
	const cartContent = document.querySelector(".cart__content");
	const cartClose = document.querySelector(".cart__header-close");

	// Open
	cartWidgetButton.addEventListener("click", function () {
		cartSection.classList.add("cart--active");
		cartContent.style.display = "block";
		document.body.style.overflow = "hidden";
	});

	// Close
	cartClose.addEventListener("click", function () {
		cartSection.classList.remove("cart--active");
		cartContent.style.display = "none";
		document.body.style.overflow = "";
	});
}

