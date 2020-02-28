
/* Featured products
=============================================*/

const glideCarousel = new Glide('.featured-products--container');

// Change number active slide on Carousel change
let numberActiveSlide = document.querySelector('.featured-products--number span');
glideCarousel.on(['run'], () => numberActiveSlide.innerHTML = glideCarousel.index + 1 );

// Mount!
setTimeout(() => {
  glideCarousel.mount({
    type: 'carousel'
  });
}, 500);

/* Scroll
=============================================*/

/*----------  Click to dot  ----------*/

let dotsToScroll = document.querySelectorAll('.dots a');

function changeDotClass (item) {
	dotsToScroll.forEach(el => el.classList.remove('active'));
	item.classList.add('active');		
}

function clickDotToScroll (e) {
	e.preventDefault();

	changeDotClass(this);

	const blockID = this.getAttribute('href').substr(1);

  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

for (var i = 0; i < dotsToScroll.length; i++) {
	dotsToScroll[i].addEventListener('click', clickDotToScroll);
}	

/*----------  Auto dot change  ----------*/

let sections = document.querySelectorAll('.section'),
		navigationDots = document.querySelectorAll('.dots a');

updateNavigation();
window.addEventListener('scroll', updateNavigation);

function updateNavigation() {
	sections.forEach(el => {
		let navDot = document.querySelector('.dots a[href="#' + el.getAttribute('id') + '"]'),
				activeSection = navDot.dataset.number - 1;

    if ( ( el.offsetTop - el.offsetHeight / 2 < window.pageYOffset ) && ( el.offsetTop + el.offsetHeight / 2 > window.pageYOffset ) ) {
      navigationDots[activeSection].classList.add('active');
      // console.log('TRUE ' + (el.offsetTop - el.offsetHeight / 2 + ' < ' + window.pageYOffset + ' && ' + el.offsetTop + el.offsetHeight / 2 + ' > ' + window.pageYOffset));
    } else {
        navigationDots[activeSection].classList.remove('active');
        // console.log('FALSE ' + (el.offsetTop - el.offsetHeight / 2 + ' < ' + window.pageYOffset + ' && ' + el.offsetTop + el.offsetHeight / 2 + ' > ' + window.pageYOffset));
    }
  });

  // console.log('');
}
