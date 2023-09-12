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
        window.location.href = element.getAttribute('href');
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
gsap.to('.main__content', {
  scrollTrigger: {
    trigger: '.main',
    start: 'top top',
    scrub: 1,
  },
  yPercent: -20,
  opacity: 0,
});
gsap.to('.main__background', {
  scrollTrigger: {
    trigger: '.main',
    start: 'top top',
    scrub: 1,
  },
  yPercent: 10,
  opacity: 0,
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
    start: 'top top',
    scrub: 1,
  },
  xPercent: -18,
  y: 50,
  opacity: 0.9,
});

gsap.fromTo(
  '.benefits__block',
  {
    opacity: 0,
    y: 60,
  },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '.benefits',
      scrub: true,
      start: '-700',
      end: '-300',
    },
  },
);
gsap.fromTo(
  '.courses',
  {
    opacity: 0,
    y: 120,
  },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '.benefits',
      scrub: true,
      start: 'bottom bottom',
      end: '260',
    },
  },
);
