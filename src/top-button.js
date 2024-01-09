const topButton = document.querySelector('.top-btn');
const menuButton = document.querySelector('.menu-btn');
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

function menuOpenClose() {
   openClosedNodes.forEach((element) => element.classList.toggle('closed'));
}

const isMenuOpened = () => !navMenuOpen.classList.contains('closed');

menuButton.addEventListener('click', menuOpenClose);

navMenuList.addEventListener('click', (e) => {
   // console.log(e.target);
   if (isMenuOpened()) {
      menuOpenClose();
   }
   return;
});
