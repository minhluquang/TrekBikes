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

//Slider
const videos = document.querySelectorAll('.header__slider video');
const btnLeft = document.querySelector('.header__slide--btn-left');
const btnRight = document.querySelector('.header__slide--btn-right');

let currentSlide = 0;

function showSlide() {
  videos.forEach((video, idx) => {
    if (idx === currentSlide) {
      video.currentTime = 0;
      video.play();
      video.style.display = 'block';
    } else {
      video.style.display = 'none';
    }
  });
  videos[currentSlide].addEventListener('ended', e => {
    nextSlide();
  });
}

function nextSlide() {
  if (currentSlide === videos.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  showSlide();
  activeDots();
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = videos.length - 1;
  } else {
    currentSlide--;
  }
  showSlide();
  activeDots();
}

btnLeft.addEventListener('click', e => {
  prevSlide();
});

btnRight.addEventListener('click', e => {
  nextSlide();
});

showSlide(currentSlide);

// Header dots
const dots = document.querySelectorAll('.dots li');

function activeDots() {
  dots.forEach((dot, idx) => {
    if (idx === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

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

// Start: Animation section 1
const section1 = document.querySelector('.section--1');
const section1Item = document.querySelectorAll('.section--1__item');

//Set transfromY & opacity & transition
// if (window.innerHeight < section1.clientHeight) {
//   let downY = 100;
//   section1Item.forEach(item => {
//     item.style.transform = `translateY(${downY}px)`;
//     item.style.opacity = 0;
//     item.style.transition = `all 0.8s ease-in-out`;
//     downY += 20;
//   });
// }

// End: Animation section 1

//Start: Animation section 4
const section4Container = document.querySelector('.section--4-container');
const section4 = document.querySelector('.section--4');

section4Container.style.transform = `translateY(50%)`;
section4Container.style.transition = `all 0.5s ease-in-out`;

section4.style.transform = `translateY(50%)`;
section4.style.opacity = 0;
section4.style.transition = `all 1.2s ease-in-out`;
//End: Animation section 4

//When scroll to item
const sectionEvent = ['scroll', 'load'];
sectionEvent.forEach(evt => {
  window.addEventListener(evt, e => {
    if (window.pageYOffset > section1.getBoundingClientRect().top - 300) {
      //Reset original element
      section1Item.forEach(item => {
        item.style.transform = `translateY(0)`;
        item.style.opacity = 1;
      });
    }

    if (window.pageYOffset - 500 > section4Container.getBoundingClientRect().top + 500) {
      [section4Container, section4].forEach(el => {
        el.style.transform = `translateY(0)`;
        el.style.opacity = 1;
      });
    }
  });
});

// Apply database for product
// import DATA_BASE from './db.js';
// const section3Wrapper = document.querySelector('.section--3 .wrapper');
// const convertPriceToNumber = price => {
//   return parseInt(price.replace(/[. VND]/g, ''));
// };

// const getSaleItemArr = DATA_BASE.filter(item => item.sale == true)
// getSaleItemArr.sort((a, b) => convertPriceToNumber(b.newPrice) - convertPriceToNumber(a.newPrice))
// DATA_BASE.slice(0, 6).forEach(item => {
//   const html = `
//     <div class="bike-item col l-4-bi m-6-bi c-12-bi">
//     <img src="${item.imgSrc}" />
//       <div class="bike-item--content">
//         <h2>${item.name}</h2>
//         <div class="bike-item--price">
//           <span class="title">Giá: </span>
//           <p class="new-price">${item.price}</p>
//         </div>
//       </div>
//       <div class="bike-item--sale">-50%</div>
//     </div>
//   `;

//   section3Wrapper.insertAdjacentHTML('beforeend', html);
// });
