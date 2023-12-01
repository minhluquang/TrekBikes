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
      video.muted = true;
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
