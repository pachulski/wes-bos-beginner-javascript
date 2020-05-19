function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  this.gallery = gallery;
  //select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');
  
  // bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // Event Listeners
  this.images.forEach(image => image.addEventListener('click', e => this.showImage(e.currentTarget)));

  this.images.forEach(image => {image.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      this.showImage(e.currentTarget);
    }
  })});

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  if (this.modal.matches('.open')) {
    console.info('Modal already open');
    return;
  }
  this.modal.classList.add('open');

  // Event Listeners to be bound when we open the modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');

  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
}

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPrevImage();
}

Gallery.prototype.showNextImage = function () {
  if (this.currentImage === this.gallery.lastElementChild) return this.showImage(this.gallery.firstElementChild);
  this.showImage(this.currentImage.nextElementSibling);
}

Gallery.prototype.showPrevImage = function () {
  if (this.currentImage === this.gallery.firstElementChild) return this.showImage(this.gallery.lastElementChild);
  this.showImage(this.currentImage.previousElementSibling);
}

Gallery.prototype.showImage = function (el) {
  if (!el) {
    console.info('no image to show');
    return;
  }
  
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));