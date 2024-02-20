import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const ourClientsSwiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,

   // If we need pagination
   pagination: {
      el: '.swiper-pagination'
   },

   // Navigation arrows
   navigation: {
      nextEl: '.our-clients .next-btn',
      prevEl: '.our-clients .prev-btn'
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.swiper-scrollbar'
   }
});

const ctaSectionSwiperPag = new Swiper('.ctaSwiper', {
   direction: 'horizontal',
   loop: true,
   autoplay: true,
   pauseOnMouseEnter: true,
   delay: 4000,
   // zoom: false,

   pagination: {
      el: '.swiper-pagination',
      clickable: true
   },

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   }
});
