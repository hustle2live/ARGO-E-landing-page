// observer.js

const animationIn = 'customAnimationIn';
const animationScale = 'customAnimationScale';
// const animationSlideInLeft = 'slideInLeft';
const animationSlideInLeftRotate = 'slideInLeftRotate';
const animationSlideInRight = 'slideInRight';

const servicesContainer = document.querySelector('.services__content.container');
const elementsCard = document.querySelectorAll('.services__card.animated');
const elementsIcon = document.querySelectorAll('.icon.animated');

const serviceDescriptionPicture = document.querySelector('.service-description__image.animated');
const serviceDescriptionText = document.querySelector('.service-description__service-types.animated');

const defaultOptions = {
   threshold: [0.5]
};

const observer = (callBack, options = defaultOptions) => new IntersectionObserver(callBack, options);

const onEntryCallback = (entries, animatedClassName) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         entry.target.classList.add(animatedClassName);
      } else {
         entry.target.classList.remove(animatedClassName);
      }
   });
};

const servicesCallback = (entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         for (const card of elementsCard) {
            card.classList.add(animationIn);
         }
      } else {
         for (const card of elementsCard) {
            card.classList.remove(animationIn);
         }
      }
   });
};

observer(servicesCallback, {
   threshold: [0.25]
}).observe(servicesContainer);

for (const elem of elementsIcon) {
   observer((e) => onEntryCallback(e, animationScale)).observe(elem);
}

observer((e) => onEntryCallback(e, animationSlideInLeftRotate)).observe(serviceDescriptionPicture);
observer((e) => onEntryCallback(e, animationSlideInRight)).observe(serviceDescriptionText);






// const servicesObserver = new IntersectionObserver(servicesCallback, options);

// console.log(elements);
// console.log(elementsIcon);

// function onScale(nodeList) {
//    nodeList.forEach((domElem) => {
//       if (domElem.isIntersecting) {
//          domElem.target.classList.add('customAnimationScale');
//       }
//    });
// }

//  if (entry.intersectionRatio === 0) {
//     console.log('Элемент удален полностью в области наблюдения');
//     entry.target.classList.remove(animatedClassName);
//  }

// moveObserver.observe(elem);
// scaleObserver.observe(elem);

// const moveObserver = new IntersectionObserver((animationObject) => onEntryCallback(animationObject, animationIn), options);

// const scaleObserver = new IntersectionObserver((animationObject) => onEntryCallback(animationObject, animationScale), options);

// for (const elem of elementsCard) {
//    observer(animationIn, {
//       root: document.querySelector('.services__content.container'),
//       threshold: [0.5]
//    }).observe(elem);
//    console.log('observe');
// }
