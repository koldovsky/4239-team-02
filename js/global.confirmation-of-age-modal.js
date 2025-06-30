(function initAgeModal() {
  const isHomePage = window.location.pathname === "/4239-team-02/";

  if (!isHomePage) return;

  const ageModal = document.getElementById("ageModal");
  const yesButton = document.querySelector(".age-confirmation__button--yes");
  const noButton = document.querySelector(".age-confirmation__button--no");

  if (!ageModal || !yesButton || !noButton) {
    console.warn("Age modal elements not found");
    return;
  }

  document.body.classList.add("modal-open");
  ageModal.classList.remove("hidden");

  yesButton.addEventListener("click", () => {
    ageModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  });

  noButton.addEventListener("click", () => {
    window.location.href = "access-denied.html";
  });
})();

