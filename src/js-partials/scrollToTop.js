const scrollTop = document.querySelector('.scroll-to-top');

if (window.innerWidth >= 480) {
  window.addEventListener(
    'scroll',
    throttle(500, () => {
      if (window.scrollY > 700) {
        scrollTop.classList.add('scroll-to-top--active');
      } else {
        scrollTop.classList.remove('scroll-to-top--active');
      }
    })
  );

  scrollTop.addEventListener('click', scrollToTop);
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
