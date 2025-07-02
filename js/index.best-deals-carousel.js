const track = document.querySelector('.best-deals__products');
const prevButton = document.querySelector('.best-deals__arrow--left');
const nextButton = document.querySelector('.best-deals__arrow--right');
const dotsContainer = document.querySelector('.best-deals__dots');

let slides = Array.from(track.children);
let currentIndex = 0;
let dotElements = [];
let isAnimating = false;
const animationDuration = 500;

function getVisibleCount() {
  const width = window.innerWidth;
  if (width >= 992) return 3;
  if (width >= 768) return 2;
  return 1;
}

function cloneSlides() {
  const visible = getVisibleCount();
  const originalSlides = slides.filter(s => !s.classList.contains('clone'));

  slides.forEach(slide => {
    if (slide.classList.contains('clone')) {
      track.removeChild(slide);
    }
  });

  for (let i = 0; i < visible; i++) {
    const firstClone = originalSlides[i].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1 - i].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  slides = Array.from(track.children);
}

function setInitialPosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const visible = getVisibleCount();
  currentIndex = visible;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

function moveToSlide() {
  if (isAnimating) return;

  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = `transform ${animationDuration}ms ease-in-out`;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  isAnimating = true;

  updateDots();
}

track.addEventListener('transitionend', () => {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const visible = getVisibleCount();
  const totalSlides = slides.length - visible * 2;

  if (slides[currentIndex].classList.contains('clone')) {
    track.style.transition = 'none';

    if (currentIndex >= slides.length - visible) {
      currentIndex = visible;
    } else if (currentIndex === 0) {
      currentIndex = slides.length - visible * 2;
    }

    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updateDots();
  }

  isAnimating = false;
});

nextButton.addEventListener('click', () => {
  if (isAnimating) return;
  currentIndex++;
  moveToSlide();
});

prevButton.addEventListener('click', () => {
  if (isAnimating) return;
  currentIndex--;
  moveToSlide();
});

function createDots() {
  dotsContainer.innerHTML = '';
  dotElements = [];

  const visible = getVisibleCount();
  const totalSlides = slides.length - visible * 2;

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('best-deals__dot');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
    dotElements.push(dot);

    dot.addEventListener('click', () => {
      if (isAnimating) return;
      currentIndex = parseInt(dot.dataset.index) + visible;
      moveToSlide();
    });
  }
}

function updateDots() {
  const visible = getVisibleCount();
  const totalSlides = slides.length - visible * 2;
  const trueIndex = (currentIndex - visible + totalSlides) % totalSlides;

  dotElements.forEach((dot, i) => {
    dot.classList.toggle('active', i === trueIndex);
  });
}

function rebuildCarousel() {
  cloneSlides();
  createDots();
  setInitialPosition();
  updateDots();
}

window.addEventListener('resize', () => {
  rebuildCarousel();
});

rebuildCarousel();
