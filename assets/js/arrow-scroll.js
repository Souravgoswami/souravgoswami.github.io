// Handle the arrow down animation

$(() => {
	const liquidBg = document.querySelector('#liquidBg')
	lBgStyle = liquidBg.style

	lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`

	$('#main-arrow .arrow').click(function() {
		$('html').animate({
			scrollTop: $('.other-container').offset().top
		}, 500)
	})

	window.addEventListener('scroll', function(e) {
		new window.IntersectionObserver(e => {
			if (e[0].isIntersecting)
				lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`
		}).observe(liquidBg)
	})
})
