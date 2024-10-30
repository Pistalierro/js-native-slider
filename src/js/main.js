function Carousel() {

  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = this.container.querySelector('.indicators');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.pauseBtn = this.container.querySelector('#pause');
  this.prevBtn = this.container.querySelector('#prev');
  this.nextBtn = this.container.querySelector('#next');

  this.currentSlide = 0;
  this.isPlaying = true;
  this.timerID = null;
  this.interval = 1000;
  this.swipeStartX = null;
  this.swipeEndX = null;

  this.SLIDES_LENGTH = this.slides.length;
  this.ARROW_LEFT = 'ArrowLeft';
  this.ARROW_RIGHT = 'ArrowRight';
  this.SPACE = 'Space';

}

Carousel.prototype = {

  goToNth: function (n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  goToPrev: function () {
    this.goToNth(this.currentSlide - 1);
  },

  goToNext: function () {
    this.goToNth(this.currentSlide + 1);
  },

  prev: function () {
    this.goToPrev();
    this.pause();
  },

  next: function () {
    this.goToNext();
    this.pause();
  },

  pause: function () {
    clearInterval(this.timerID);
    this.isPlaying = !this.isPlaying;
    this.pauseBtn.innerHTML = 'Play';
  },

  play: function () {
    clearInterval(this.timerID);
    this.timerID = setInterval(this.goToNext, this.interval);
    this.isPlaying = !this.isPlaying;
    this.pauseBtn.innerHTML = 'Pause';
  },

  pausePlay: function () {
    this.isPlaying ? this.pause() : this.play();
  },

  indicate: function (e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this.goToNth(+target.dataset.slideTo);
      this.pause();
    }
  },

  pressKey: function (e) {
    if (e.code === this.SPACE) this.pausePlay();
    if (e.code === this.ARROW_LEFT) this.prev();
    if (e.code === this.ARROW_RIGHT) this.next();
  },

  swipeStart: function (e) {
    this.swipeStartX = e.changedTouches[0].clientX;
  },

  swipeEnd: function (e) {
    this.swipeEndX = e.changedTouches[0].clientX;
    if (this.swipeStartX - this.swipeEndX < -50) this.prev();
    if (this.swipeStartX - this.swipeEndX > 50) this.next();
  },

  initListeners: function () {
    this.pauseBtn.addEventListener('click', this.pausePlay);
    this.prevBtn.addEventListener('click', this.prev);
    this.nextBtn.addEventListener('click', this.next);
    this.indicatorsContainer.addEventListener('click', this.indicate);
    this.container.addEventListener('touchstart', this.swipeStart);
    this.container.addEventListener('touchend', this.swipeEnd);
    document.addEventListener('keydown', this.pressKey);
  },

  init: function () {
    this.initListeners();
    this.timerID = setInterval(() => this.goToNext(), this.interval);
  },
};

Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();

carousel.init();
