import Carousel from './carousel.js';

export default class SwipeCarousel extends Carousel {
  _initListeners() {
    super._initListeners();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  };

  _swipeStart = function (e) {
    this.swipeStartX = e.changedTouches[0].clientX;
  };

  _swipeEnd = function (e) {
    this.swipeEndX = e.changedTouches[0].clientX;
    if (this.swipeStartX - this.swipeEndX < -50) this.prev();
    if (this.swipeStartX - this.swipeEndX > 50) this.next();
  };
}

