export default class Carousel {
  constructor(containerID = '#carousel', slideID = '.slide') {
    this.container = document.querySelector(containerID);
    this.slides = this.container.querySelectorAll(slideID);
  }

  prev() {
    this._goToPrev();
    this._pause();
  }

  next() {
    this._goToNext();
    this._pause();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  init() {
    this._initProps();
    this._tick();
    this._initControls();
    this._initIndicators();
    this._initListeners();
  }

  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 3000;
    this.SLIDES_LENGTH = this.slides.length;
    this.ARROW_LEFT = 'ArrowLeft';
    this.ARROW_RIGHT = 'ArrowRight';
    this.SPACE = 'Space';
    this.FA_PAUSE = '<i class="fa-solid fa-pause"></i>';
    this.FA_PLAY = '<i class="fa-solid fa-play"></i>';
    this.FA_Prev = '<i class="fa-solid fa-chevron-left"></i>';
    this.FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>';
  }

  _goToNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _initControls() {
    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls');
    const PREV = `<span class="control control__prev" id="prev">${this.FA_Prev}</span>`;
    const PAUSE_PLAY = `<span class="control control__pause" id="pause">${this.FA_PAUSE}</span>`;
    const NEXT = `<span class="control control__next" id="next">${this.FA_NEXT}</span>`;
    controls.innerHTML = PREV + PAUSE_PLAY + NEXT;
    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }
    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _pause() {
    clearInterval(this.timerID);
    this.isPlaying = !this.isPlaying;
    this.pauseBtn.innerHTML = this.FA_PLAY;
  }

  _play() {
    clearInterval(this.timerID);
    this.isPlaying = !this.isPlaying;
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this._tick();
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this._goToNth(+target.dataset.slideTo);
      this._pause();
    }
  }

  _pressKey(e) {
    if (e.code === this.SPACE) this.pausePlay();
    if (e.code === this.ARROW_LEFT) this.prev();
    if (e.code === this.ARROW_RIGHT) this.next();
  }

  _clickPausePlay(e) {
    const target = e.target;
    if (target === this.container || target.classList.contains('slides'))
      this.pausePlay();

  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.container.addEventListener('click', this._clickPausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _tick() {
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }
}
