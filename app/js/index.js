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

	//highlight active links	
	function highlightLinks() {
		const section = document.querySelectorAll(".section");
		const sections = {};
		let i = 0;

		section.forEach(function(e) {
			sections[e.id] = e.offsetTop;
		});

		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

		for (i in sections) {
			if (sections[i] <= scrollPosition) {
				document.querySelector('.nav__link--active').setAttribute('class', 'nav__link');
				document.querySelector('a[href*=' + i + ']').setAttribute('class', 'nav__link--active');
			}
		}
	}

	window.addEventListener('scroll', highlightLinks);

	//form
	function isNotEmpty(field) {
		return field.value !== "";
	}

	function isEmail(field) {
		return field.value.indexOf("@") !== -1;
	}

	function displayErrors(errors) {
		let ul = document.querySelector("ul.errors");		
		if(!ul) {
			ul = document.createElement("ul");
			ul.classList.add("errors");
		}

		ul.innerHTML = "";

		errors.forEach(function(error) {
			const li = document.createElement("li");
			li.textContent = error;
			ul.appendChild(li);		});

		form.parentNode.insertBefore(ul, form);		
	}

	function validateForm(e) {
		e.preventDefault();
		const formFields = form.querySelectorAll('.message-form__elem');			
		const errors =[];
		let isValid = false;
	
		formFields.forEach(function(field) {

			if(field.type === "text" || field.type === "textarea") {
				isValid = isNotEmpty(field);
			} else if (field.type === "email") {
				isValid = isEmail(field);
			}

			if(!isValid) {
				errors.push(field.dataset.error);
				field.classList.add("error");
			} else {
				field.classList.remove("error");
			}

		});

		if(errors.length) {
			displayErrors(errors);
		} else {
			form.submit();
		}
	}

	form.addEventListener("submit", validateForm, false);

}());



