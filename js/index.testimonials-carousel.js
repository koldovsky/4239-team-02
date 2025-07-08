const feedbacks = document.querySelector(".testimonials__feedbacks");
const slides = document.querySelectorAll(".testimonials__feedback");
const dotsContainer = document.querySelector(".testimonials__indicators");
let current = 0;
const totalSlides = slides.length;

// Clear old dots in case of reload
dotsContainer.innerHTML = "";

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className =
    "testimonials__indicator" +
    (i === 0 ? " testimonials__indicator--active" : "");
  dot.addEventListener("click", () => updateSlide(i));
  dotsContainer.appendChild(dot);
});

function updateSlide(i) {
  const translatePercent = -(i * (100 / totalSlides));
  feedbacks.style.transform = `translateX(${translatePercent}%)`;
  dotsContainer.querySelectorAll("span").forEach((d, j) => {
    d.classList.toggle("testimonials__indicator--active", j === i);
  });
  current = i;
}

document
  .querySelector(".testimonials__arrow--left")
  ?.addEventListener("click", () => {
    updateSlide((current - 1 + totalSlides) % totalSlides);
  });

document
  .querySelector(".testimonials__arrow--right")
  ?.addEventListener("click", () => {
    updateSlide((current + 1) % totalSlides);
  });

// Initialize first slide position
updateSlide(0);
