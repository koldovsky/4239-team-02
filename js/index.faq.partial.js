document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq__item');

    // Закрити інші акордеони
    document.querySelectorAll('.faq__item').forEach(i => {
      if (i !== item) i.classList.remove('faq__item--active');
    });

    // Перемкнути поточний
    item.classList.toggle('faq__item--active');
  });
});