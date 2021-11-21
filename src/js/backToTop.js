import getRefs from './get-refs';

const refs = getRefs();
window.scrollTo({ top: 0, behavior: 'smooth' });
window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.goTopBtn.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  smoothScrool();
}