function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }

  //select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    if (modal.matches('.open')) {
      console.info('Modal already open');
      return;
    }
    modal.classList.add('open');

    // Event Listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');

    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    if (currentImage === gallery.lastElementChild) return showImage(gallery.firstElementChild);
    showImage(currentImage.nextElementSibling);
  }

  function showPrevImage() {
    if (currentImage === gallery.firstElementChild) return showImage(gallery.lastElementChild);
    showImage(currentImage.previousElementSibling);
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  // Event Listeners
  images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));

  images.forEach(image => {image.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      showImage(e.currentTarget);
    }
  })});

  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));