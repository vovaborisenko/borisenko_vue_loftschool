var openBtn = document.querySelector('.js-menu-open');
var closeBtn = document.querySelector('.js-menu-close');
var menu = document.querySelector('.js-menu');

openBtn.addEventListener('click', function() {
  menu.classList.remove('header__popup-menu--closed');
});

closeBtn.addEventListener('click', function() {
  menu.classList.add('header__popup-menu--closed');
});
