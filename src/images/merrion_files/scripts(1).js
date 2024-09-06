(() => {
	var	banner          =   document.querySelector('#banner'),
		cta             =   document.querySelector('.cta'),
		invisBtn        =   document.querySelector('#invisBtn'),
		bg_1			=   document.querySelector('.bg--1'),
		bg_2			=   document.querySelector('.bg--2'),
		text_1			=   document.querySelector('.text--1'),
		text_2			=   document.querySelector('.text--2'),
		text_3			=   document.querySelector('.text--3'),
		text_4			=   document.querySelector('.text--4'),
		text_5			=   document.querySelector('.text--5'),
		text_6			=   document.querySelector('.text--6'),
		logoVKC			=   document.querySelector('.logo--vkc'),
		logoMO			=   document.querySelector('.logo--mo'),
		logoHeart		=   document.querySelector('.logo--heart'),
		logoCurved		=   document.querySelector('.logo--curved'),
		lockup			=   document.querySelector('.lockup'),
		slider			=   document.querySelector('.slider'),
		footer			=   document.getElementsByTagName('footer'),
		curvedPaths		=   document.querySelectorAll('.logo__path'),
		ctaPaths		=   document.querySelectorAll('.cta__path'),

	initialize = () => {
		if (!Enabler.isInitialized()) {
			Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
		} else {
			enablerInitHandler();
		}

		// IF YOU'RE USING ANY OPTIONAL GSAP PLUGINS, REGISTER THEM HERE
		gsap.registerPlugin(CSSPlugin);
		CSSPlugin.defaultForce3D = true;
	},

	//---------------------------------------------------------------------------------------------
	// ENABLER IS INITIATED, WAIT FOR PAGE LOAD BEFORE ANIMATION
	//---------------------------------------------------------------------------------------------
	enablerInitHandler = () => {
		if (!Enabler.isPageLoaded()) {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
		} else {
			pageLoadedHandler();
		}
	},

	//---------------------------------------------------------------------------------------------
	// PAGE IS LOADED, CHECK AD IS VISIBLE
	//---------------------------------------------------------------------------------------------
	pageLoadedHandler = () => {
		if (!Enabler.isVisible()) {
			Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, runBannerAnimation);
		} else {
			runBannerAnimation();
		}
	},

	//---------------------------------------------------------------------------------------------
	// BEGIN ANIMATION
	//---------------------------------------------------------------------------------------------
	runBannerAnimation = () => {
		banner.className = 'ready';

		const t1 = gsap.timeline();
		t1
		.to(text_1, 				{ duration: 0.6, x: 0 })
		.to(text_2, 				{ duration: 0.6, x: 0 }, '-=0.15')
		.to(text_3, 				{ duration: 0.6, x: 0 }, '-=0.15')
		.to(text_4, 				{ duration: 0.6, x: 0 }, '-=0.15')
		.to(text_5, 				{ duration: 0.6, x: 0 }, '+=0.5')
		.to(text_6, 				{ duration: 0.6, x: 0 }, '-=0.15')
		.to(slider, 				{ duration: 1, y: 0 }, '+=1.8')
		.add([
			gsap.to(lockup,			{ duration: 0.6, opacity: 1 }),
			gsap.to(logoHeart, 		{ duration: 0.6, opacity: 1 })
		])
		.to(bg_2, 					{ duration: 1, clipPath: 'polygon(-1px -30px, 160px -1px, 160px 600px, -1px 600px)',
			onComplete: () => {
				gsap.set(slider,	{ clearProps: 'all' });
				slider.classList.add('final');
			}
		}, '+=1.5')
		.add([
			gsap.to(footer, 		{ duration: 0.6, clipPath: 'polygon(-1px 42px, 160px -1px, 160px 600px, -1px 600px)', onComplete: addListeners }),
			gsap.to(logoHeart,  	{ duration: 0.6, rotationY: -90 })
		], '-=0.4')
		.add([
			gsap.to(logoCurved,		{ duration: 0.6, rotationY: 0, delay: 0.4 }),
            gsap.to(ctaPaths,            { duration: 0.6, opacity: 1 }),
			gsap.to(footer, 		{ duration: 0.7, clipPath: 'polygon(-1px -1px, 160px -1px, 160px 600px, -1px 600px)'})
		], '-=0.4')

		// UNCOMMENT THE LINE BELOW TO FIND OUT HOW LONG YOUR BANNER ANIMATION IS
		// console.log(t1.duration());
	},

	addListeners = () => {
		invisBtn.addEventListener('mouseover', function(event) {
			gsap.to(ctaPaths,		{ duration: 0.25, fill: '#FFF2DC' });
		});

		invisBtn.addEventListener('mouseout', function(event) {
			gsap.to(ctaPaths,		{ duration: 0.25, fill: '#921226' });
		});
	}

	initialize();
})();