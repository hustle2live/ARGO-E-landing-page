const sliderDiv = document.querySelector('.cta__slider');
const sliderImage = document.querySelector('.cta__slider img');

const paginationDiv = document.querySelector('.slider-pagination');
const pagCircles = document.querySelectorAll('.slider-pagination .circle');

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
      const targetValue = targetElement.value || 0;

      if (isThisCircle && targetValue >= imageCounterMin && targetValue <= imageCounterMax) {
         clearAll();
         setElemClass(targetElement);
         return true;
      }
   } catch (error) {
      console.log(error);
   }
   return false;
};

// ----

paginationDiv.addEventListener('click', (e) => (handlePagElementClass(e.target) ? autoSetImageNumber() : null));

autoSetImageNumber();
