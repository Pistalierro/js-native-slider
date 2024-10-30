const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorsContainer = container.querySelector('.indicators');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const pauseBtn = container.querySelector('#pause');
const prevBtn = container.querySelector('#prev');
const nextBtn = container.querySelector('#next');

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 1000;
let touchStart = null;
let touchEnd = null;

const SLIDES_LENGTH = slides.length;
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const SPACE = 'Space';

function goToNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}

function goToPrev() {
  goToNth(currentSlide - 1);
}

function goToNext() {
  goToNth(currentSlide + 1);
}

const _tick = () => timerID = setInterval(goToNext, interval);

function prev() {
  goToPrev();
  pause();
}

function next() {
  goToNext();
  pause();
}

function pause() {
  clearInterval(timerID);
  isPlaying = !isPlaying;
  pauseBtn.innerHTML = 'Play';

}

function play() {
  clearInterval(timerID);
  _tick();
  isPlaying = !isPlaying;
  pauseBtn.innerHTML = 'Pause';
}

const pausePlay = () => isPlaying ? pause() : play();

function indicate(e) {
  const target = e.target;
  if (target && target.classList.contains('indicator')) {
    goToNth(+target.dataset.slideTo);
    pause();
  }
}

function pressKey(e) {
  if (e.code === SPACE) pausePlay();
  if (e.code === ARROW_LEFT) prev();
  if (e.code === ARROW_RIGHT) next();
}

function swipeStart(e) {
  touchStart = e.changedTouches[0].clientX;
}

function swipeEnd(e) {
  touchEnd = e.changedTouches[0].clientX;
  if (touchStart < touchEnd && touchStart - touchEnd < -100) prev();
  if (touchStart > touchEnd && touchStart - touchEnd > 100) next();
}

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
indicatorsContainer.addEventListener('click', indicate);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('touchend', swipeEnd);
document.addEventListener('keydown', pressKey);

_tick();

