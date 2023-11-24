// Set experience years
const experienceYear = document.querySelector('#experienceYear');
const currentYear = new Date().getFullYear();
experienceYear.querySelector('span').innerText = `${currentYear - 1976}`;
experienceYear.querySelector('span').setAttribute('data-value', `${currentYear - 1976}`);

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

// Animation
const scrollEvents = ['scroll', 'reload'];

const section1Wrapper = document.querySelector('.section--1 .wrapper');
const section2 = document.querySelector('.section--2');
const product = document.querySelectorAll('.info_container .product');
const section4 = document.querySelector('.section--4-container');

section1Wrapper.querySelectorAll('div').forEach((item, idx) => {
  item.style.transform = `translateY(${100 + idx * 20}px)`;
});

scrollEvents.forEach(event => {
  window.addEventListener(event, e => {
    if (window.innerHeight > section1Wrapper.getBoundingClientRect().top) {
      section1Wrapper.classList.add('active');
    }

    if (window.innerHeight > section2.getBoundingClientRect().top) {
      section2.classList.add('active');
    }

    product.forEach(product => {
      if (window.innerHeight > product.getBoundingClientRect().top) {
        product.classList.add('active');
      }
    });

    if (window.innerHeight + 300 > section4.getBoundingClientRect().top) {
      section4.classList.add('active');
    }
  });
});
