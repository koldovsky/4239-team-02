document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq__description');
      item.classList.toggle('faq__item--active');
    });
  });