const slideShowImg = document.getElementById('slideshow-img');
const slideBtnPrev = document.getElementById('slide-prev-btn');
const slideBtnNext = document.getElementById('slide-next-btn');
const dots = document.querySelectorAll('.dot');
const imageWidth = 100; // Đặt chiều rộng của mỗi ảnh là 100%
let currentIndex = 0;

function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        if (i === currentIndex) {
            dots[i].style.backgroundColor = 'red'; // Thay đổi màu nền thành màu đỏ
        } else {
            dots[i].style.backgroundColor = 'gray'; // Thay đổi màu nền thành màu xám
        }
    }
}

slideBtnNext.addEventListener('click', () => {
    currentIndex++; // Tăng vị trí hiện tại lên 1
    if (currentIndex >= slideShowImg.childElementCount) {

        currentIndex = 0;
    }
    const translateValue = `translateX(-${currentIndex * imageWidth}%)`;
    slideShowImg.style.transform = translateValue;
    updateDots();
});

slideBtnPrev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {

        currentIndex = slideShowImg.childElementCount - 1;
    }
    const translateValue = `translateX(-${currentIndex * imageWidth}%)`;
    slideShowImg.style.transform = translateValue;
    updateDots();
});

updateDots(); 
