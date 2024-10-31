export default class Carousel {
  constructor(p) {
    const s = ({...{containerID: '#carousel', slideID: '.slide', interval: 3000, isPlaying: true}, ...p});
    this.container = document.querySelector(s.containerID);
    this.slides = this.container.querySelectorAll(s.slideID);
    this.interval = s.interval;
    this.isPlaying = s.isPlaying;
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
    this._tick(this.isPlaying);
    this._initControls();
    this._initIndicators();
    this._initListeners();
  }

  _initProps() {
    this.currentSlide = 0;
    this.SLIDES_LENGTH = this.slides.length;

    this.ARROW_LEFT = 'ArrowLeft';
    this.ARROW_RIGHT = 'ArrowRight';
    this.SPACE = 'Space';

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
    const PLAY = `<span class="control control__play" id="play">${this.FA_PLAY}</span>`;
    const PREV = `<span class="control control__prev" id="prev">${this.FA_Prev}</span>`;
    const NEXT = `<span class="control control__next" id="next">${this.FA_NEXT}</span>`;
    controls.innerHTML = PREV + PLAY + NEXT;
    this.container.append(controls);

    this.playBtn = this.container.querySelector('#play');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');

    if (this.isPlaying) this.playBtn.style.opacity = '0';
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

  _showPlayBtn = () => this.playBtn.style.opacity = '1';
  _hidePlayBtn = () => this.playBtn.style.opacity = '0';

  _goToPrev() {
    this._goToNth(this.currentSlide - 1);
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1);
  }

  _pause() {
    clearInterval(this.timerID);
    this.isPlaying = !this.isPlaying;
    this._showPlayBtn();
  }

  _play() {
    clearInterval(this.timerID);
    this.isPlaying = !this.isPlaying;
    this._hidePlayBtn();
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
    this.playBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('click', this._clickPausePlay.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }
}

