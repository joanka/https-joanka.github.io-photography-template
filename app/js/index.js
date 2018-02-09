(function() {
	'use strict';

	const button = document.querySelector('.nav-toggler');
	const overlay = document.querySelector('.nav__overlay');
	const nav = document.querySelector('.nav__list');
	const chevron = document.querySelector('.header__chevron');
	const form  = document.querySelector(".message-form");

	button.addEventListener('click', function(e) {			
        nav.classList.toggle('nav-open');
        overlay.classList.toggle('overlay-open');
		button.setAttribute('aria-expanded', String( nav.classList.contains( 'nav-open')));
	}, false );

	nav.addEventListener('click', function(e) {
		nav.classList.toggle( 'nav-open' );
        overlay.classList.toggle( 'overlay-open' );
	}, false);

	//backToTop btn
	function createBtn() {
		const btnToTop = document.createElement("button");
		btnToTop.classList.add("btn--top", "hidden");
		btnToTop.innerHTML = "&#xbb;";
		document.body.appendChild(btnToTop);
		return btnToTop;
	}

	const btnToTop = createBtn();

	window.addEventListener("scroll", function(e) {
		if(window.pageYOffset || document.documentElement.scrollTop >= 100) {
			btnToTop.classList.remove("hidden");
			chevron.classList.add("hidden");
		} else {
			btnToTop.classList.add("hidden");
			chevron.classList.remove("hidden");
		} 
	}, false);

	function animateScrollTop() {
		if(window.pageYOffset || document.documentElement.scrollTop > 0) {
			window.scrollBy(0, -60);
			setTimeout(animateScrollTop, 10);
		}
	}

	btnToTop.addEventListener("click",function(e) {
		e.stopPropagation();
		animateScrollTop();
	}, false);

	//sticky nav
	function stickyNavigation() {	  
		if (window.scrollY || window.pageYOffset > 80) {
		  document.body.classList.add('fixed-nav');
		} else {
		  document.body.classList.remove('fixed-nav');
		}
	}

	window.addEventListener('scroll', stickyNavigation);

	

}());



