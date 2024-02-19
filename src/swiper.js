import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.swiper', {
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
   // scrollbar: {
   //    el: '.swiper-scrollbar'
   // }
});
