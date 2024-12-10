import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

export const ourClientsSwiper = new Swiper('.swiper', {
   direction: 'horizontal',
   loop: true,
   navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn'
   },
   scrollbar: {
      el: '.swiper-scrollbar'
   }
});

export const ctaSectionSwiperPag = new Swiper('.ctaSwiper', {
   direction: 'horizontal',
   loop: true,
   autoplay: true,
   pauseOnMouseEnter: true,
   delay: 4000,
   zoom: false,

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },

   pagination: {
      el: '.swiper-pagination',
      clickable: true
   }
});
