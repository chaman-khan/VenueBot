(() => {
	var	banner          =   document.querySelector('#banner'),
		cta             =   document.querySelector('.cta'),
		invisBtn        =   document.querySelector('#invisBtn'),
		bg_1			=   document.querySelector('.bg--1'),
		bg_2			=   document.querySelector('.bg--2'),
		text_1			=   document.querySelector('.text--1'),
		text_2			=   document.querySelector('.text--2'),
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
		.to(slider, 				{ duration: 1, x: 0 }, '+=1.8')
		.add([
			gsap.to(lockup,			{ duration: 0.6, opacity: 1 }),
			gsap.to(logoHeart, 		{ duration: 0.6, opacity: 1 })
		])
		.to(footer, 				{ duration: 0.6, clipPath: 'polygon(-1px -1px, 100px -1px, 100px 90px, -1px 90px)', onComplete: addListeners }, '+=1')
		.to(bg_2, 					{ duration: 1.2, clipPath: 'polygon(-1px -1px, 758px -1px, 758px 90px, -30px 90px)',
			onComplete: () => {
				gsap.set(slider,	{ clearProps: 'all' });
				slider.classList.add('final');
			}
		}, '-=0.2')
		.to(logoHeart,  			{ duration: 0.6, rotationY: -90 })
		.to(logoCurved,				{ duration: 0.6, rotationY: 0 })

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