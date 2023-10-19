//Calculate Slider Height
const headerTopHeight = 30;
const headerBottomHeight = 80;

const reseizeAndLoadEvent = ['resize', 'load'];

let headerSlideHeight;

reseizeAndLoadEvent.forEach(event => {
  window.addEventListener(event, e => {
    const windowHeight = window.innerHeight;
    headerSlideHeight = windowHeight - (headerTopHeight + headerBottomHeight);
    document.documentElement.style.setProperty('--header-slider-height', `${headerSlideHeight}px`);
  });
});

//Sticky Navigation;
const header = document.querySelector('.header');
const topHeader = document.querySelector('.header__top');
function sticky() {
  if (window.pageYOffset > topHeader.clientHeight) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

window.addEventListener('scroll', sticky);

//Search event
const headerBottom = document.querySelector('.header__bottom');
const searchBtn = document.querySelector('.header__bottom--extention-search i');
const searchInput = document.querySelector('.header__bottom--extention-search input');
const overlay = document.querySelector('.overlay');

let allowSearchEvent = true;

searchBtn.addEventListener('click', e => {
  if (allowSearchEvent) {
    headerBottom.classList.toggle('search--active');
    searchInput.focus();
  }
});

// For low device
reseizeAndLoadEvent.forEach(evt =>
  window.addEventListener(`${evt}`, e => {
    if (
      window.matchMedia('(min-width: 740px) and (max-width: 1023px)').matches ||
      window.matchMedia('(min-width: 320px) and (max-width: 740px)').matches
    ) {
      allowSearchEvent = false;
      searchInput.addEventListener('focus', e => {
        headerBottom.classList.add('search--active');
      });
    } else {
      allowSearchEvent = true;
    }
  })
);

document.addEventListener('click', e => {
  if (document.querySelector('.header__bottom.search--active')) {
    document.addEventListener('click', e => {
      if (!e.target.closest('.header__bottom--result') && !e.target.closest('.header__bottom--extention-search')) {
        headerBottom.classList.toggle('search--active');
      }
    });
  }
});
