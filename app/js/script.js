(() => {
  /* Featured products
  =============================================*/

  const glideCarousel = new Glide('.featured-products .container', {
    type: 'carousel'
  }).mount();

  // Change number active slide on Carousel change
  let numberActiveSlide = document.querySelector('.featured-products .number span');
  glideCarousel.on(['run'], () => numberActiveSlide.innerHTML = glideCarousel.index + 1 );

})();

(() => {
  /* Scroll
  =============================================*/

  /*----------  Click to dot  ----------*/

  let dots_container = document.querySelector('.dots'),
      dots = dots_container.querySelectorAll('a'),
      dotScroll = false;

  function changeDotClass (item) {
  	dots.forEach(el => el.classList.remove('active'));
  	item.classList.add('active');		
  }

  function clickDotToScroll (e) {
  	e.preventDefault();
  	changeDotClass(this);
  	const blockID = this.getAttribute('href').substr(1);

    dotScroll = true;

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    dotScroll = false;
  }

  dots.forEach(el => el.addEventListener('click', clickDotToScroll));

  /*----------  Auto dot change  ----------*/

  let sections = document.querySelectorAll('.section');

  updateNavigation();
  window.addEventListener('scroll', updateNavigation);

  function updateNavigation() {
    if (!dotScroll) {
      let activeIndex = 0;

    	sections.forEach((el, index) => {
        if (el.offsetTop < window.pageYOffset + el.offsetHeight / 2) {
          activeIndex = index;
        }
      });

      if (document.querySelector('body').clientHeight - window.innerHeight == window.pageYOffset) {
        activeIndex = dots.length - 1;
      }

      if (!dots[activeIndex].classList.contains('active')) {
        if (document.querySelector('.dots a.active')) {
          document.querySelector('.dots a.active').classList.remove('active');
        }

        dots[activeIndex].classList.add('active');
      }

      /*----------  Change background dots  ----------*/

      let product_review = document.querySelector('#product-review'),
          dotsTop = dots_container.offsetTop + dots_container.offsetHeight / 2,
          dotsBottom = dots_container.offsetTop - dots_container.offsetHeight / 2;


      if ( (window.pageYOffset + dotsTop) > product_review.offsetTop && 
           (window.pageYOffset + dotsBottom) < (product_review.offsetTop + product_review.offsetHeight) ) {
        document.querySelector('.dots').classList.add('blackout');
      } else {
          document.querySelector('.dots').classList.remove('blackout');
      }
    }
  }
})();
