// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints ? true : false;

document.querySelectorAll('.benefits__card_info').forEach((element) => {
  if (isTouch) {
    element.classList.add('mobile');
  }
});

const header = document.querySelector('header');

const coursesCard = document.querySelectorAll('.courses__card');
coursesCard.forEach((course) => {
  let timeoutId, timeoutId2;
  const text = course.querySelector('.courses__card_text');
  const span = text.querySelector('span');
  course.addEventListener('mouseover', () => {
    text.style.height = '100%';
    text.style.left = '12%';
    timeoutId = setTimeout(() => {
      text.style.width = '140%';
      text.style.left = '-20%';
      span.style.scale = '1.6';
      course.classList.add('hover');
    }, 300);
    timeoutId2 = setTimeout(() => {
      course.classList.add('hover');
    }, 300);
  });
  course.addEventListener('mouseout', () => {
    clearTimeout(timeoutId);
    clearTimeout(timeoutId2);
    text.style.height = '74px';
    text.style.width = 'calc(100% - 120px)';
    text.style.left = '-15px';
    span.style.scale = '1';
    course.classList.remove('hover');
  });
  course.addEventListener('click', (event) => {
    event.preventDefault();
    const changeLocation = (element) => {
      element.classList.add('click');
      setTimeout(() => {
        setTimeout(() => {
          element.classList.remove('click');
          clearTimeout(timeoutId);
          clearTimeout(timeoutId2);
          text.style.height = '74px';
          text.style.width = 'calc(100% - 120px)';
          text.style.left = '-15px';
          span.style.scale = '1';
          course.classList.remove('hover');
        }, 200);
      }, 500);
    };
    if (course.classList.contains('hover') && !isTouch) changeLocation(course);
    else {
      const interval = setInterval(function () {
        if (course.classList.contains('hover')) {
          clearInterval(interval);
          setTimeout(() => {
            changeLocation(course);
          }, 100);
        }
      }, 200);
    }
  });
  course.addEventListener('auxclick', (event) => {
    event.preventDefault();
    const changeLocation = (element) => {
      element.classList.add('click');
      setTimeout(() => {
        window.open(element.getAttribute('href'), '_blank');
        setTimeout(() => {
          element.classList.remove('click');
          clearTimeout(timeoutId);
          clearTimeout(timeoutId2);
          text.style.height = '74px';
          text.style.width = 'calc(100% - 120px)';
          text.style.left = '-15px';
          span.style.scale = '1';
          course.classList.remove('hover');
        }, 100);
      }, 500);
    };
    if (course.classList.contains('hover') && !isTouch) changeLocation(course);
    else {
      const interval = setInterval(function () {
        if (course.classList.contains('hover')) {
          clearInterval(interval);
          setTimeout(() => {
            changeLocation(course);
          }, 100);
        }
      }, 200);
    }
  });
});

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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
if (ScrollTrigger.isTouch !== 1)
  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.page',
    smooth: 2,
    effects: true,
  });

const tl = gsap.timeline();
tl.fromTo(
  '.header__container h1',
  {
    opacity: 0,
    y: '30vh',
  },
  {
    opacity: 1,
    y: '30vh',
  },
  1,
)
  .fromTo(
    '.main__background',
    {
      opacity: 0,
    },
    { opacity: 1, duration: 2 },
    0,
  )
  .fromTo(
    '.header__container h1',
    {
      y: '30vh',
    },
    { y: '20vh', duration: 1 },
    2,
  )
  .fromTo(
    '.main__content',
    {
      y: 200,
      opacity: 0,
    },
    { y: 0, opacity: 1, duration: 1 },
    2,
  )
  .fromTo('.header', { backdropFilter: 0 }, { backdropFilter: 'blur(15px)', duration: 1 }, 3);

gsap.fromTo(
  '.header__container h1',
  { y: '20vh' },
  {
    scrollTrigger: {
      trigger: '.header',
      start: 'start start',
      end: '+=300',
      scrub: 1,
    },
    y: -20,
    scale: 0.5,
  },
);

gsap.to('.header', {
  scrollTrigger: {
    trigger: '.header',
    start: 'start start',
    end: '+=300',
    scrub: 1,
  },
  background: 'rgba(51, 51, 51, 0.8)',
});

gsap.to('.main__background', {
  scrollTrigger: {
    trigger: '.main',
    pin: true,
    start: 'start start',
    end: '+=300',
    scrub: 1,
  },
  scale: 1.5,
  xPercent: -10,
});
ScrollTrigger.create({
  trigger: '.main',
  pin: true,
  start: 'start start',
  end: '+=300',
  scrub: 1,
});
gsap.fromTo(
  '.main__perehod_img-1',
  {
    xPercent: 5.2,
  },
  {
    scrollTrigger: {
      trigger: '.main',
      start: 'top top',
      scrub: 1,
    },
    xPercent: 9.5,
  },
);
gsap.to('.main__perehod_img-2', {
  scrollTrigger: {
    trigger: '.main',
    start: '-300',
    scrub: 1,
  },
  xPercent: -18,
  y: 50,
  opacity: 0.9,
});
