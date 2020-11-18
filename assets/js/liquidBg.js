$(() => {
	const liquidBg = document.querySelector('#liquidBg')
	lBgStyle = liquidBg.style
	lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`

	window.addEventListener('scroll', function(e) {
		new window.IntersectionObserver(e => {
			if (e[0].isIntersecting)
				lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`
		}).observe(liquidBg)
	})
})
