"use strict";

/* Featured products
=============================================*/
var glideCarousel = new Glide('.featured-products--container'); // Automated height on Carousel build

glideCarousel.on('build.after', function () {
  return glideHandleHeight();
}); // Automated height on Carousel change

glideCarousel.on('run.after', function () {
  return glideHandleHeight();
}); // Change number active slide on Carousel change

var numberActiveSlide = document.querySelector('.featured-products--number span');
glideCarousel.on(['run'], function () {
  return numberActiveSlide.innerHTML = glideCarousel.index + 1;
}); // Mount!

setTimeout(function () {
  glideCarousel.mount({
    type: 'carousel'
  });
}, 500); // Resize height

function glideHandleHeight() {
  var activeSlide = document.querySelector('.glide__slide--active');
  var activeSlideHeight = activeSlide ? activeSlide.offsetHeight : 0;
  var glideTrack = document.querySelector('.glide__track');
  var glideTrackHeight = glideTrack ? glideTrack.offsetHeight : 0;

  if (activeSlideHeight !== glideTrackHeight) {
    glideTrack.style.height = "".concat(activeSlideHeight, "px");
  }
}
/* Scroll            
=============================================*/

/*----------  Click to dot  ----------*/


var dotsToScroll = document.querySelectorAll('.hero--dots a');

function changeDotClass(item) {
  dotsToScroll.forEach(function (el) {
    return el.classList.remove('active');
  });
  item.classList.add('active');
}

function clickDotToScroll(e) {
  e.preventDefault();
  changeDotClass(this);
  var blockID = this.getAttribute('href').substr(1);
  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

for (var i = 0; i < dotsToScroll.length; i++) {
  dotsToScroll[i].addEventListener('click', clickDotToScroll);
}
/*----------  Auto dot change  ----------*/


var sections = document.querySelectorAll('.section'),
    navigationDots = document.querySelectorAll('.hero--dots a');
updateNavigation();
window.addEventListener('scroll', function () {
  return updateNavigation();
});

function updateNavigation() {
  sections.forEach(function (el) {
    var navDot = document.querySelector('.hero--dots a[href="#' + el.getAttribute('id') + '"]'),
        activeSection = navDot.dataset.number - 1;

    if (el.offsetTop - el.offsetHeight / 2 < window.pageYOffset && el.offsetTop + el.offsetHeight / 2 > window.pageYOffset) {
      navigationDots[activeSection].classList.add('active'); // console.log('TRUE ' + (el.offsetTop - el.offsetHeight / 2 + ' < ' + window.pageYOffset + ' && ' + el.offsetTop + el.offsetHeight / 2 + ' > ' + window.pageYOffset));
    } else {
      navigationDots[activeSection].classList.remove('active'); // console.log('FALSE ' + (el.offsetTop - el.offsetHeight / 2 + ' < ' + window.pageYOffset + ' && ' + el.offsetTop + el.offsetHeight / 2 + ' > ' + window.pageYOffset));
    }
  }); // console.log('');
}