const slideShowImg = document.getElementById('slideshow-img');
const slideBtnPrev = document.getElementById('slide-prev-btn');
const slideBtnNext = document.getElementById('slide-next-btn');
const img = document.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
var imageWidth = 50;

let currentIndex = 0;
if (window.innerWidth < 1000) {
    imageWidth = 100
}
function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        if (i === currentIndex) {
            dots[i].style.backgroundColor = '#383838';
        } else {
            dots[i].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
    }
}

slideBtnNext.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > 2) {

        currentIndex = 0;
    }
    if (currentIndex > 0 && currentIndex < 2) {
        const translateValue = `translateX(-${currentIndex * imageWidth}%)`;
        slideShowImg.style.transform = translateValue;
        setTimeout(() => {

            img[currentIndex + 1].style.marginLeft = '0px';
        }, 2800);
        updateDots();
    }

});

slideBtnPrev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {

        currentIndex = 0;
    }
    const translateValue = `translateX(-${currentIndex * imageWidth}%)`;
    slideShowImg.style.transform = translateValue;
    img[2].style.marginLeft = '8px';
    updateDots();
});

updateDots(); 
