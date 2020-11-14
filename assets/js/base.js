$(function() {
	// Tooltips
	$('[data-toggle="tooltip"]').tooltip()

	// Handle the navbar text animation
	const codes = [
		`puts "Hello World"`,
		`print "My name is Sourav\\n"`,
		`IO.new(STDOUT.fileno).puts "I love Ruby"`,
		`printf "I love Ruby on Rails\\n"`,
		`STDOUT.write "I love Jekyll\\n"`,
		`printf "%s", "I love <Web Designing/>\\n"`,
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

	// Canvas painting
	const canvas = document.getElementById('floaters')
	const ctx = canvas.getContext('2d')
	const squares = []
	const mainHeader = document.getElementById('mainHeader')

	const floaters = document.getElementById('floaters')
	floaters.style.height = `${mainHeader.offsetHeight}px`
	floaters.style.width = `${mainHeader.offsetWidth}px`

	canvas.height = mainHeader.offsetHeight
	canvas.width = mainHeader.offsetWidth

	let N = Math.round(canvas.height * canvas.width / 200000)

	class Square {
		constructor(x, y, a = 1) {
			this.x = x
			this.y = y
			this.r = Math.floor(Math.random() * 256)
			this.g = Math.floor(Math.random() * 256)
			this.b = Math.floor(Math.random() * 256)
			this.a = a
			this.size = Math.random() * 60 + 30
			this.direction = Math.random() * 2 + 0.5
		}
	}

	window.addEventListener('resize', () => {
		let _offsetHeight = mainHeader.offsetHeight, _offsetWidth = mainHeader.offsetWidth
		canvas.height = _offsetHeight
		canvas.width = _offsetWidth

		floaters.style.height = `${_offsetHeight}px`
		floaters.style.width = `${_offsetWidth}px`

		N = Math.round(canvas.height * canvas.width / 200000)

		for(let i = 0 ; i < N ; ++i) {
			squares[i] = new Square(Math.random() * canvas.width, Math.random() * canvas.height, 1)
		}
	})


	for(let i = 0 ; i < N ; ++i) {
		squares[i] = new Square(Math.random() * canvas.width, Math.random() * canvas.height, 1)
	}

	setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for(let i = 0 ; i < N ; ++i) {
			let square = squares[i]
			square.y -= square.direction

			square.a = square.y / canvas.height

			if (square.y < 0)
				squares[i] = new Square(Math.random() * canvas.width, canvas.height)

			ctx.beginPath()
			ctx.rect(square.x, square.y, square.size, square.size)
			ctx.fillStyle= `rgba(${square.r},${square.g},${square.b},${square.a})`
			ctx.fill()
		}
	}, 40)

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

	// SVG bulb / lamp Animation
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
})
