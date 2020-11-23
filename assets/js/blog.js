$(function() {
	// Tooltips
	$('[data-toggle="tooltip"]').tooltip()

	// Handle the navbar text animation
	const codes = [
		`Welcome to the blogs`,
		`Hope that you have a happy read!`
	].map(el => el.split(''))

	const code = document.getElementById('code')
	const caret = document.getElementById('caret')

	caret.style.animation = 'none'
	code.textContent = ''

	let i = -1, time = Date.now(), textIndex = 0
	let text = codes[textIndex++ % codes.length]
	let j = text.length

	setInterval(() => {
		if (i === text.length + 1) {
			if (code.textContent === '') {
				i = -1
				text = codes[textIndex++ % codes.length]
				j = text.length
			} else {
				if (Date.now() - time > 2000) {
					code.textContent = code.textContent.slice(0, --j)
					caret.style.animation = 'none'
				} else if (!caret.style.animation.match(/blink/)) {
					caret.style.animation = 'blink 0.25s linear infinite'
				}
			}
		} else {
			let char = text.slice(0, ++i)
			time = Date.now()
			code.textContent = char.join('')
		}
	}, 75)

	// Handle the flying animation when the page is scrolled
	for(let i of document.querySelectorAll('.slide-intersect-it')) {
		let _delay = i.getAttribute('slide-delay') || 250

		let observer = new IntersectionObserver(e => {
			if (e[0].isIntersecting) {
				if(!i.state) {
					let _style = i.style
					i.state = true
					_style.visibility = 'visible'
					_style.animation = `slideAnim 0.5s ease forwards ${_delay}ms`
					if (observer) observer.unobserve(i)
				}
			}
		})
		observer.observe(i)
	}

	// Change colours on dark / light mode
	const tdm = document.getElementById('toggleDarkMode')
	let mode = 1
	const lamp = document.getElementById('lamp')
	const night = document.getElementById('night')
	const dMH = $('#darkModeHeader')

	tdm.onclick = function() {
		if (mode === 1) {
			mode = 0

			lamp.style.visibility = 'hidden'
			night.style.visibility = 'visible'
			dMH.tooltip('hide')
			dMH.attr('data-original-title', 'Light Mode')
			dMH.tooltip('show')

			document.body.style.backgroundColor = '#000'

			// to darken
			document.body.style.backgroundColor = '#111'
			for(let i of Array.from(document.getElementsByClassName('other-container')))
				i.style.backgroundColor = '#111'

			for(let i of Array.from(document.getElementsByClassName('head')))
				i.style.backgroundColor = '#111'

			for(let i of Array.from(document.getElementsByClassName('background')))
				i.style.backgroundColor = "#222"

			// to whiten
			for(let i of Array.from(document.getElementsByClassName('text')))
				i.style.color = "#fff"

			for(let i of Array.from(document.getElementsByClassName('text-glow'))) {
				let _s = i.style
				_s.color = "#fff"
				_s.textShadow = "0 0 8px #fff8"
			}

			for(let i of Array.from(document.getElementsByClassName('text-glow-current'))) {
				i.style.textShadow = "0 0 8px currentColor"
			}

			for(let i of Array.from(document.getElementsByClassName('object-glow'))) {
				let _gc = i.getAttribute('glow-color') || '#3eb8'
				i.style.filter = `drop-shadow(0 0 4px ${_gc})`
			}

			for(let i of Array.from(document.getElementsByClassName('text-code'))) {
				let _s = i.style
				_s.textShadow = `0 0 4px #3eba`
				_s.color = 'transparent'
				_s.background = 'linear-gradient(45deg, #ff0, #f55, #55f)'
				_s.backgroundClip = 'text'
				_s.webkitBackgroundClip = 'text'
			}

			for(let i of Array.from(document.getElementsByClassName('invert')))
				i.style.filter = 'invert(100)'
		} else {
			mode = 1

			lamp.style.visibility = 'visible'
			night.style.visibility = 'hidden'
			dMH.tooltip('hide')
			dMH.attr('data-original-title', 'Dark Mode')
			dMH.tooltip('show')

			// to lighten
			document.body.style.backgroundColor = '#fff'
			for(let i of Array.from(document.getElementsByClassName('other-container')))
				i.style.backgroundColor = '#fff'

			for(let i of Array.from(document.getElementsByClassName('head')))
				i.style.backgroundColor = '#f5f5f5'

			for(let i of Array.from(document.getElementsByClassName('background')))
				i.style.backgroundColor = "#efeff5"

			// to darken
			for(let i of Array.from(document.getElementsByClassName('text')))
				i.style.color = "#000"

			for(let i of Array.from(document.getElementsByClassName('text-glow'))) {
				let _s = i.style
				_s.color = "#111"
				_s.textShadow = "none"
			}

			for(let i of Array.from(document.getElementsByClassName('text-glow-current'))) {
				i.style.textShadow = 'none'
			}


			for(let i of Array.from(document.getElementsByClassName('object-glow')))
				i.style.filter = `none`

			for(let i of Array.from(document.getElementsByClassName('text-code'))) {
				let _s = i.style
				_s.textShadow = `none`
				_s.color = '#888'
				_s.background = 'transparent'
			}

			for(let i of Array.from(document.getElementsByClassName('invert')))
				i.style.filter = 'invert(0)'
		}
	}

	// Handle footer animation on intersection
	const footerGlowAnim = document.querySelectorAll('.footer-glow-anim')

	let observer = new IntersectionObserver(e => {
		if(e[0].isIntersecting)
			footerGlowAnim.forEach(_fga => _fga.style.animation = `lighting 1.25s linear infinite ${_fga.getAttribute('delay') || 0}ms`)
		else
			footerGlowAnim.forEach(_fga =>  _fga.style.animation = 'none')
	})

	footerGlowAnim.forEach(_i => observer.observe(_i))

		// Stripped pre and code tags
	for(let i of document.querySelectorAll('pre')) {
		i.innerHTML = i.innerHTML.split('\n').map(x => x.trim() + "\n").join('').trim()
	}
})
