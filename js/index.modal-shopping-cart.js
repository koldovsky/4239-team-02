document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("open-cart");
    const closeModalBtn = document.getElementById("close-cart");
    const modal = document.getElementById("cart");

    openModalBtn.addEventListener("click", () => {
        modal.classList.add("cart--active");
    });

    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("cart--active");
    });

    modal.addEventListener("click", (e) => {
        if (!modal.querySelector(".cart__content").contains(e.target)) {
            modal.classList.remove("cart--active");
        }
    });
});

