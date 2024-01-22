const topButton = document.querySelector('.top-btn');
const menuButton = document.querySelector('.menu-btn');
const menuButtonClose = document.querySelector('.mobile.icon.close');
const openClosedNodes = document.querySelectorAll('.open.closed');

const navMenuOpen = document.querySelector('.nav-menu.open');
const navMenuList = document.querySelector('.nav-menu__list');

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

// const staticItems = document.querySelectorAll('.unclick');
// staticItems.forEach((item) => item.addEventListener('click', (e) => e.stopPropagation()));
