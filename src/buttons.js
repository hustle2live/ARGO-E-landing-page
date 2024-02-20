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
const navBarLogoImage = document.querySelector('.header__navbar_company-logo img');
const footerLogoImage = document.querySelector('.footer-section.logo img');
const mobileMenuLogoImage = document.querySelector('.mobile.icon.company-logo img');
const aboutSectionLogoImage = document.querySelector('.about-company .description');

const themeLightPath = './css/theme/palette-3/light.css';
const themeDarkPath = './css/theme/palette-3/dark.css';
const logoDark = './images/logo/logo_title-transparent.png';
const logoWhite = './images/logo/logo_title-white.png';
const logoFullDark = './images/logo/logo-transparent.png';
const logoFullWhite = './images/logo/logo-white.png';

themeButton.addEventListener('click', () => {
   themeButton.classList.toggle('dark');
   if (themeButton.classList.contains('dark')) {
      styleHTMLLink.setAttribute('href', themeDarkPath);
      navBarLogoImage.setAttribute('src', logoWhite);
      footerLogoImage.setAttribute('src', logoFullDark);
      mobileMenuLogoImage.setAttribute('src', logoFullWhite);
      aboutSectionLogoImage.classList.add('dark');
   } else {
      styleHTMLLink.setAttribute('href', themeLightPath);
      navBarLogoImage.setAttribute('src', logoDark);
      footerLogoImage.setAttribute('src', logoFullWhite);
      mobileMenuLogoImage.setAttribute('src', logoFullDark);
      aboutSectionLogoImage.classList.remove('dark');
   }
});

// top button show on scroll
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

// -------/

// cta-gallery full width image function
const ctaGallery = document.querySelector('.cta__gallery');
const sliderImage = document.querySelector('.ctaSwiper');
const showGalleryButtonClose = document.querySelector('.cta__gallery .close-btn');

const galleryShow = () => ctaGallery.classList.add('show');
const galleryClose = () => ctaGallery.classList.remove('show');

sliderImage.addEventListener('click', galleryShow);
showGalleryButtonClose.addEventListener('click', galleryClose);

document.addEventListener('keyup', (e) => {
   if (e.key === 'Escape') {
      galleryClose();
   }
});

// -------/

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
