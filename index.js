const gallerySlidesNodeElement = document.querySelector('.our-clients__gallery');
const gallerySlidesNodeList = document.querySelectorAll('.card');

const sliderPositionStart = 0;
const sliderPositionEnd = gallerySlidesNodeList.length - 1;

let sliderCount = sliderPositionStart;

const setPositionGallery = () => {
   gallerySlidesNodeElement.style.left = '-' + sliderCount + '000px';
   gallerySlidesNodeElement.style.transform = `translateX(-)${sliderCount}000px`;
};

const changeSliderCounter = (num) =>
   (sliderCount = num > sliderPositionEnd ? sliderPositionStart : num < sliderPositionStart ? sliderPositionEnd : num);

const prevSlide = () => setPositionGallery(changeSliderCounter(--sliderCount));
const nextSlide = () => setPositionGallery(changeSliderCounter(++sliderCount));

document.querySelector('.prev-btn').addEventListener('click', prevSlide);
document.querySelector('.next-btn').addEventListener('click', nextSlide);
