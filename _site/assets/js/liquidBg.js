$(() => {
	const liquidBg = document.querySelector('#liquidBg')
	let lBgStyle = liquidBg.style
	lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`

	window.addEventListener('scroll', function(e) {
		let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
		let liqBCR = liquidBg.getBoundingClientRect()

		if(viewportHeight > liqBCR.top && liqBCR.top + liqBCR.height > 0)
			lBgStyle.filter = `hue-rotate(${(70 * (liquidBg.getBoundingClientRect().top / window.innerHeight))}deg)`
	})
})
