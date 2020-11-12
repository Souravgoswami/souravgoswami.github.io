// JS Data Toggler
$(() => {
	const allTogglers = document.querySelectorAll('.iframe-toggler')
	for(let i of allTogglers) {
		i.clickCounter = 0

		i.onclick = function() {
			i.clickCounter++

			let dt = i.getAttribute('toggler-data-target')
			let il = i.getAttribute('iframe-link')

			if(i.clickCounter % 2 === 0) {
				document.querySelector(dt + '> iframe').style.animation = 'hiding 1s ease'

				setTimeout(() => {
					document.querySelector(dt).innerHTML = ``
				}, 1000)
			} else {
				document.querySelector(dt).innerHTML = `<iframe src="${il}" class="iframe"></iframe>`
				document.querySelector(dt + '> iframe').style.animation = 'appearing 1s ease'
				document.querySelector(dt + '> iframe').style.transformOrigin = 'top'
			}
		}
	}
})
