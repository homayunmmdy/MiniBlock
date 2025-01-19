const questionIcon = document.getElementById('questionIcon');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');

function closeModal() {
  modal.style.display = 'none';
}

questionIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
});

closeBtn.addEventListener('click', closeModal);

document.addEventListener('click', (e) => {
  if (modal.style.display === 'block' &&
      !modal.contains(e.target) &&
      e.target !== questionIcon) {
    closeModal();
  }
});

// Prevent closing when clicking inside modal
modal.addEventListener('click', (e) => {
  e.stopPropagation();
});