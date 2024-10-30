const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 1000;

const SLIDES_LENGTH = slides.length;

const _tick = () => timerID = setInterval(goToNext, interval);

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

function indicate() {
  goToNth(+this.getAttribute('data-slide-to'));
  pause();
}

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

_tick();

indicators.forEach(indicator => indicator.addEventListener('click', indicate));
