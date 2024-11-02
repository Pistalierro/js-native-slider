import SwipeCarousel from './extra/swipe-carousel.js';

const carousel = new SwipeCarousel({
  containerID: '#carousel',
  slideID: '.slide',
  interval: 5000,
  // isPlaying: false,
});

carousel.init();
