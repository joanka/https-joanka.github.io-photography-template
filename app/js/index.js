(function() {
	'use strict';

	var button = document.querySelector('.nav-toggler');
	var overlay = document.querySelector('.nav__overlay');
	var nav = document.querySelector('.nav__list');

	button.addEventListener('click', function(e) {			
        nav.classList.toggle('nav-open');
        overlay.classList.toggle('overlay-open');
		button.setAttribute('aria-expanded', String( nav.classList.contains( 'nav-open')));
	}, false );

	nav.addEventListener('click', function(e) {
		nav.classList.toggle( 'nav-open' );
        overlay.classList.toggle( 'overlay-open' );
	}, false);


}());

