gsap.registerPlugin(ScrollTrigger)
const fauxView = document.querySelector('.fauxView')
const liquid = document.querySelector('.liquid')
const liquidDark = document.querySelector('.liquidDark')
const viewBox = document.getElementById('viewBox')
const responsible = document.querySelectorAll('.responsibly > *')

const intro = gsap.timeline({})
const fill = gsap.timeline({})
const scrollText = gsap.timeline({ paused: true })
const drink = gsap.timeline({})
const fin = gsap.timeline({})

intro
	.fromTo('.bgImg', { opacity: 0, x: -100 }, { x: 0, opacity: 0.1, duration: 0.75 })
	.fromTo(responsible, { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.75 }, '<')
	.add('hide')
	.fromTo(responsible[2], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -15, duration: 0.75, yoyo: true, repeat: 9 })

scrollText
	.fromTo('.scrollText', { autoAlpha: 0, x: -50 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'bounce.out' }, '>+0.35')
	.set(fauxView, { overflow: 'scroll' })
	.to('.scrollText', { autoAlpha: 0, x: -50, duration: 1, ease: 'bounce.in' }, '+=1.25')

//prettier-ignore
drink
.add('start')
.fromTo(liquid, { x: -420, y: 60 }, { y: 370 }, 'start')
.fromTo(liquidDark, { x: -50, y: 50 }, { y: 376 }, 'start')

fill
	.set(liquid, { visibility: 'visible' })
	.add('start')
	.fromTo(liquid, { x: 190, y: 550 }, { x: -420, y: 70, duration: 2, ease: 'sine.out' }, 'start')
	.set(liquidDark, { visibility: 'visible' }, 'start+=0.20')
	.fromTo(liquidDark, { x: -600, y: 500 }, { x: -50, y: 60, duration: 1.85, ease: 'sine.out' }, 'start+=0.20')
//prettier-ignore
fin
	.fromTo('.bgImg', { opacity: 0, x: -100 }, { x: 0, opacity: 0.1, duration: 0.5 })
	.fromTo('.greensockIcon', {autoAlpha: 0, y: 20}, {autoAlpha: 1, y:0, duration: 0.5}, '<')

//intro
ScrollTrigger.create({
	trigger: '.responsibly',
	animation: intro,
	//pin: true,
	start: '49% center',
	end: '51% center',
	toggleActions: 'play none play none',
	onLeave: () => intro.reverse('hide'),
	//onEnterBack: () => intro.play(),
	//markers: true,
})
ScrollTrigger.create({
	trigger: '.teamwork',
	animation: gsap.to('.teamwork', { autoAlpha: 0, y: -100 }),
	//pin: true,
	start: 'bottom 38%',
	end: 'bottom 38%',
	toggleActions: 'play none none reverse',
	//markers: true,
})

//drink up
ScrollTrigger.create({
	trigger: fauxView,
	pin: fauxView,
	start: 'center center',
	end: '+=550 top',
})

ScrollTrigger.create({
	trigger: viewBox,
	animation: drink,
	scroller: fauxView,
	pin: true,
	start: '55% center',
	end: '+=1500 center',
	//toggleActions: 'restart none none reset',
	scrub: 1,
	//markers: true,
})

ScrollTrigger.create({
	trigger: viewBox,
	animation: fill,
	start: 'center center',
	end: 'bottom center',
	toggleActions: 'play none none reverse',
	//markers: true,
	//onEnter: ({ progress, direction, isActive }) => console.log(progress, direction, isActive),
	onEnterBack: () => ((fauxView.scrollTop = 0), scrollText.restart().pause()),
	onLeave: () => {
		scrollText.play()
		// console.log('can drink')
		// fauxView.style.overflow = 'scroll'
	},
})

//fin
ScrollTrigger.create({
	trigger: '.end',
	animation: fin,
	start: 'top 10%',
	toggleActions: 'play none none reverse',
})
