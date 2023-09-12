// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
VANTA.GLOBE({
  el: '#main__background',
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00d1b5,
  color2: 0xa0a0a0,
  size: 1.4,
  backgroundColor: 0x484848,
});

gsap.to('.main__perehod_img-1', {
  scrollTrigger: {
    trigger: '.main',
    start: 'top top',
    scrub: 1,
  },
  xPercent: 18,
});
gsap.to('.main__perehod_img-2', {
  scrollTrigger: {
    trigger: '.main',
    start: 'top top',
    scrub: 1,
  },
  xPercent: -18,
  y: 50,
  opacity: 0.9,
});
