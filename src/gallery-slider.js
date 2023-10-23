const galleryElement = document.querySelector('.our-clients__gallery');
const slidersNodeList = document.querySelectorAll('.card');


const galleryFullWidth = () => galleryElement.offsetWidth;
const sliderWidth = () => slidersNodeList[0].offsetWidth;

const sliderPosStart = 0;
const sliderPosEnd = () => galleryFullWidth() - sliderWidth();

let sliderPosition = 0;

const checkingIsSliderPoscorrectly = () => sliderPosition % sliderWidth();

const calcSliderPos = (next = false) => {
   const tempPosition = next ? sliderPosition + sliderWidth() : sliderPosition - sliderWidth();

   sliderPosition =
      tempPosition > sliderPosEnd()
         ? sliderPosStart
         : tempPosition < sliderPosStart
         ? sliderPosEnd()
         : tempPosition || sliderPosStart;

   return sliderPosition;
};

const setPosGallery = () => {
   galleryElement.style.left = '-' + sliderPosition + 'px';
   galleryElement.style.transform = `translateX(-)${sliderPosition}px`;
};

const prevSlide = () => setPosGallery(calcSliderPos());
const nextSlide = () => setPosGallery(calcSliderPos(true));

document.querySelector('.prev-btn').addEventListener('click', prevSlide);
document.querySelector('.next-btn').addEventListener('click', nextSlide);
