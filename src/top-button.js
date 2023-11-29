let topButton = document.querySelector('.top-btn');

function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = 'block';
   } else {
      topButton.style.display = 'none';
   }
}

window.onscroll = function () {
   scrollFunction();
};
