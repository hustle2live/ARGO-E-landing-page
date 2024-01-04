const sliderDiv = document.querySelector('.cta__slider');
const sliderImage = document.querySelector('.cta__slider img');

const paginationDiv = document.querySelector('.slider-pagination');
const pagCircles = document.querySelectorAll('.slider-pagination .circle');

const arrowSliderPrev = document.querySelector('.cta-buttons .prev');
const arrowSliderNext = document.querySelector('.cta-buttons .next');

const hoverClass = `active`;

// let imageNumber = 1;
// const imageDefaultPath = `./images/img/png/${imageNumber}.png`;

const imageCounterMin = 1;
const imageCounterMax = 8;

const clearAll = () => pagCircles.forEach((elem) => elem.classList.remove(hoverClass));

const setElemClass = (elem) => elem.classList.add(hoverClass);

const setImagePath = (num) => sliderImage.setAttribute('src', `./images/img/png/${num}.png`);

// --- get active pag element and setup image src

const autoSetImageNumber = () => {
   try {
      const isActivePagElement = document.querySelector('.circle.active');

      if (isActivePagElement) setImagePath(isActivePagElement.getAttribute('value'));
   } catch (error) {
      console.log(error);
   }
};

// ----

// ---- change pagination items backgrounds
const handlePagElementClass = (targetElement) => {
   try {
      const isThisCircle = targetElement.getAttribute('class').includes('circle');
      const targetValue = targetElement.value || false;

      if (isThisCircle && targetValue >= imageCounterMin && targetValue <= imageCounterMax) {
         clearAll();
         setElemClass(targetElement);
         return targetElement;
      }
   } catch (error) {
      console.log(error);
   }
   return false;
};

// ----

const nextCountNumber = (num) =>
   num < imageCounterMin ? imageCounterMax : num > imageCounterMax ? imageCounterMin : num;

//
const handleNextElement = (integer = -1) => {
   try {
      const isActivePagElement = document.querySelector('.circle.active');
      const imageCountValue = +isActivePagElement.getAttribute('value');

      if (isActivePagElement && imageCountValue) {
         const nextInteger = imageCountValue + integer;

         const nextActiveValue = nextCountNumber(nextInteger);

         clearAll();
         setElemClass(pagCircles[nextActiveValue - imageCounterMin]);
         autoSetImageNumber();
      }
   } catch (error) {
      console.log(error);
   }
};
//

arrowSliderPrev.addEventListener('click', () => handleNextElement());
arrowSliderNext.addEventListener('click', () => handleNextElement(imageCounterMin));

// ;

paginationDiv.addEventListener('click', (e) => (handlePagElementClass(e.target) ? autoSetImageNumber() : null));

autoSetImageNumber();
