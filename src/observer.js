// observer.js

const animationIn = 'customAnimationIn';
const animationScale = 'customAnimationScale';
const animationSlideInLeft = 'slideInLeft';
const animationSlideInLeftRotate = 'slideInLeftRotate';
const animationSlideInRight = 'slideInRight';

const servicesContainer = document.querySelector('.services__content.container');
const serviceCardsAll = document.querySelectorAll('.services__card.animated');
const iconsAboutAll = document.querySelectorAll('.icon.animated');

const serviceDescriptionPicture = document.querySelector('.service-description__image.animated');
const serviceDescriptionText = document.querySelector('.service-description__service-types.animated');

const extraServicesContainer = document.querySelector('.extra-services__content.container');
const animatedCardsRightAll = document.querySelectorAll('.animated.right');
const animatedCardsLeftAll = document.querySelectorAll('.animated.left');
const animatedCardsCenterAll = document.querySelectorAll('.animated.center');

const defaultOptions = {
   threshold: [0.5]
};

const observer = (callBack, options = defaultOptions) => new IntersectionObserver(callBack, options);

const onEntryCallback = (entries, animatedClassName) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         entry.target.classList.add(animatedClassName);
      }
      // else {
      //    entry.target.classList.remove(animatedClassName);
      // }
   });
};

const serviceSectionEntryCallback = (entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         for (const card of serviceCardsAll) {
            card.classList.add(animationIn);
         }
         // observer(serviceSectionEntryCallback, {
         //    threshold: [0.25]
         // }).unobserve(servicesContainer);
      }
      // else {
      //    for (const card of serviceCardsAll) {
      //       card.classList.remove(animationIn);
      //    }
      // }
   });
};

const extraServiceSectionEntryCallback = (entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         for (const card of animatedCardsRightAll) {
            card.classList.add(animationSlideInRight);
         }
         for (const card of animatedCardsLeftAll) {
            card.classList.add(animationSlideInLeft);
         }
         for (const card of animatedCardsCenterAll) {
            card.classList.add(animationScale);
         }
      }
      // else {
      //    for (const card of animatedCardsRightAll) {
      //       card.classList.remove(animationSlideInRight);
      //    }
      //    for (const card of animatedCardsLeftAll) {
      //       card.classList.remove(animationSlideInLeft);
      //    }
      //    for (const card of animatedCardsCenterAll) {
      //       card.classList.remove(animationScale);
      //    }
      // }
   });
};

observer(serviceSectionEntryCallback, {
   threshold: [0.25]
}).observe(servicesContainer);

observer(extraServiceSectionEntryCallback, {
   threshold: [0.25]
}).observe(extraServicesContainer);

for (const elem of iconsAboutAll) {
   observer((e) => onEntryCallback(e, animationScale)).observe(elem);
}

observer((e) => onEntryCallback(e, animationSlideInLeftRotate), {
   threshold: [0.1]
}).observe(serviceDescriptionPicture);

observer((e) => onEntryCallback(e, animationSlideInRight), {
   threshold: [0]
}).observe(serviceDescriptionText);
