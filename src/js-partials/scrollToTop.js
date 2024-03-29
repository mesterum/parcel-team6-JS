import throttle from "lodash.throttle";

const scrollTop = document.querySelector('.scroll-to-top');

if (window.innerWidth >= 480) {
  window.addEventListener(
    'scroll',
    throttle(() => {
      if (window.scrollY > 700) {
        scrollTop.classList.add('scroll-to-top--active');
      } else {
        scrollTop.classList.remove('scroll-to-top--active');
      }
    }, 500)
  );

  scrollTop.addEventListener('click', scrollToTop);
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
