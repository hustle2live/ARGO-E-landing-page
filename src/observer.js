// observer.js
function onEntry(nodeList) {
   nodeList.forEach((domElem) => {
      if (domElem.isIntersecting) {
         domElem.target.classList.add('customAnimationIn');
      }
   });
}

function onScale(nodeList) {
   nodeList.forEach((domElem) => {
      if (domElem.isIntersecting) {
         domElem.target.classList.add('customAnimationScale');
      }
   });
}

const options = {
   threshold: [0.5]
};

const moveObserver = new IntersectionObserver(onEntry, options);

const scaleObserver = new IntersectionObserver(onScale, options);

const elementsCard = document.querySelectorAll('.services__card.animated');
const elementsIcon = document.querySelectorAll('.icon.animated');

for (const elem of elementsCard) {
   moveObserver.observe(elem);
}

for (const elem of elementsIcon) {
   scaleObserver.observe(elem);
}

// console.log(elements);
console.log(elementsIcon);
