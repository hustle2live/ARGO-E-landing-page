// observer.js
function onEntry(entry) {
   entry.forEach((change) => {
      if (change.isIntersecting) {
         change.target.classList.add('customAnimationIn');
      }
   });
}

const options = {
   threshold: [0.5]
};

const observer = new IntersectionObserver(onEntry, options);

const elements = document.querySelectorAll('.animated');

for (const elem of elements) {
   observer.observe(elem);
}

// console.log(elements);
