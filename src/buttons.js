const topButton = document.querySelector('.top-btn');
const menuButton = document.querySelector('.menu-btn');
const menuButtonClose = document.querySelector('.mobile.icon.close');
const openClosedNodes = document.querySelectorAll('.open.closed');

const navMenuOpen = document.querySelector('.nav-menu.open');
const navMenuList = document.querySelector('.nav-menu__list');

const servicesCards = document.querySelectorAll('.services__card');
const servicesButtons = document.querySelectorAll('.services-btn');

const styleHTMLLink = document.querySelector('.style-link');
const themeButton = document.querySelector('.theme-btn');

const themeLightPath = './css/theme/palette-3/light.css';
const themeDarkPath = './css/theme/palette-3/dark.css';

themeButton.addEventListener('click', () => {
   themeButton.classList.toggle('dark');
   if (themeButton.classList.contains('dark')) {
      styleHTMLLink.setAttribute('href', themeDarkPath);
   } else {
      styleHTMLLink.setAttribute('href', themeLightPath);
   }
});

console.log(styleHTMLLink);

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

const menuOpenClose = () => navMenuOpen.classList.toggle('closed');
// const menuOpenClose = () => openClosedNodes.forEach((element) => element.classList.toggle('closed'));

const menuClose = () => navMenuOpen.classList.add('closed');

const isMenuOpened = () => !navMenuOpen.classList.contains('closed');

menuButton.addEventListener('click', () => menuOpenClose());
menuButtonClose.addEventListener('click', () => menuClose());

navMenuList.addEventListener('click', (e) => {
   if (isMenuOpened()) {
      switch (true) {
         case e.target.tagName === 'A':
            menuClose();
            break;
         case [...e.target.children].some((child) => child.tagName === 'A'):
            menuClose();
            break;
         case e.target.classList.contains('clicked'):
            menuClose();
            break;
         default:
            break;
      }
   }
   return;
});

const cardSpinRotate = (e, card) => {
   function removeSpin() {
      const intervalSpinBack = window.setTimeout(function removeSpinClass() {
         card.classList.remove('spin');
         card.removeEventListener('mouseleave', removeSpin);
         window.clearTimeout(intervalSpinBack);
      }, 700);
   }

   if (e.target.tagName.toLowerCase() === 'button') {
      card.classList.remove('customAnimationIn');
      card.classList.add('spin');

      card.addEventListener('mouseleave', removeSpin);
   }

   return;
};

servicesCards.forEach((card) => card.addEventListener('click', (e) => cardSpinRotate(e, card)));
