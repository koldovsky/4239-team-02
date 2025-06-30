(function initAgeModal() {
  const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

  if (!isHomePage) return;

  const ageModal = document.getElementById("ageModal");
  const yesButton = document.querySelector(".age-confirmation__button--yes");
  const noButton = document.querySelector(".age-confirmation__button--no");

  if (!ageModal || !yesButton || !noButton) {
    console.warn("Age modal elements not found");
    return;
  }

  // Показуємо вікно одразу
  document.body.classList.add("modal-open");
  ageModal.classList.remove("hidden");

  yesButton.addEventListener("click", () => {
    ageModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  });

  noButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
})();

