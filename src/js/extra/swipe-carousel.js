function SwipeCarousel() {
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this, arguments);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};

SwipeCarousel.prototype._swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].clientX;
};

SwipeCarousel.prototype._swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].clientX;
  if (this.swipeStartX - this.swipeEndX < -50) this.prev();
  if (this.swipeStartX - this.swipeEndX > 50) this.next();
};
