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

			// // to darken
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

			for(let i of Array.from(document.querySelectorAll('pre *'))) {
				i.style.color = '#fff'
			}

			for(let i of Array.from(document.querySelectorAll('pre'))) {
				let _s = i.style
				_s.backgroundColor = '#333'
				_s.color = '#fff'
			}

			for(let i of document.querySelectorAll('.card')) {
				let _s = i.style
				_s.boxShadow = '0 0 12px #e9f'
				_s.backgroundColor = '#434'
			}

			for(let i of document.querySelectorAll('.card-body')) {
				let _s = i.style
				_s.textShadow = '0 0 12px currentColor'
				_s.color = '#fff'
			}

			for(let i of document.querySelectorAll('.card a')) {
				let _s = i.style
				_s.color = '#c8f'
			}
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

			for(let i of Array.from(document.querySelectorAll('pre *'))) {
				i.style.color = '#000'
			}

			for(let i of Array.from(document.querySelectorAll('pre'))) {
				let _s = i.style
				_s.backgroundColor = '#efefef'
				_s.color = '#000'
			}

			for(let i of document.querySelectorAll('.card')) {
				let _s = i.style
				_s.boxShadow = 'none'
				_s.backgroundColor = '#fff'
			}

			for(let i of document.querySelectorAll('.card-body')) {
				let _s = i.style
				_s.textShadow = 'none'
				_s.color = '#000'
			}

			for(let i of document.querySelectorAll('.card a')) {
				let _s = i.style
				_s.color = '#55f'
			}
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

	// Cookie Consent
	const cookieConsent = document.getElementById('cookieConsent')

	function hideCookieMessage() {
		cookieConsent.style.animation = 'hiding 750ms ease forwards'
		setTimeout(() => {
			cookieConsent.style.visibility = 'hidden'
		}, 2000)
	}

	// Cookies and trackers
	const cookieAll = document.getElementById('cookieAll')
	const noCookie = document.getElementById('noCookie')
	disqusWindow = document.getElementById('disqusWindow')

	function loadDisqus() {
		let script = document.createElement('script')
		script.src = "//https-souravgoswami-github-io.disqus.com/count.js"
		script.async = true
		document.head.appendChild(script)

		disqusWindow.innerHTML = `<div id="disqus_thread"></div>`
		let disqusJs = document.createElement('script')
		disqusJs.src = "/assets/js/disqus.js"

		document.head.appendChild(disqusJs)
	}

	function loadGoogleAnalytics() {
		let analytics1 = document.createElement('script')
		analytics1.async = true
		analytics1.src = "https://www.googletagmanager.com/gtag/js?id=G-1PKE8LZDL4"
		document.head.appendChild(analytics1)

		let analytics2 = document.createElement('script')
		analytics2.async = true
		analytics2.src = "/assets/js/analytics.js"
		document.head.appendChild(analytics2)
	}

	if (cookieAll) {
		cookieAll.onclick = function() {
			hideCookieMessage()
			loadDisqus()
			loadGoogleAnalytics()
		}
	}

	if (noCookie) {
		noCookie.onclick = function() {
			hideCookieMessage()

			disqusWindow.innerHTML = `
				<div id="noDisqusWindow">
					You have rejected cookies.
					<break></break>
					<div class="btn-filled" id="loadDisqus">Reload Disqus</div>
				</div>
			`.trim()

			$('#loadDisqus').click(() => loadDisqus())
		}
	}
})
