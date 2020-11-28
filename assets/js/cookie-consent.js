$(() => {
	// Cookie Consent
	const cookieConsent = document.getElementById('cookieConsent')

	function hideCookieMessage(arg = 750) {
		cookieConsent.style.animation = `hiding ${arg}ms ease forwards`
		setTimeout(() => {
			cookieConsent.remove()
		}, 1000)
	}

	function allCookie(arg = 750) {
		if (arg === 0) {
			cookieConsent.remove()
		} else {
			hideCookieMessage(arg)
		}

		loadDisqus()
		loadGoogleAnalytics()
		localStorage.cookieAll = true
	}

	// Cookies and trackers
	const cookieAll = document.getElementById('cookieAll')
	const noCookie = document.getElementById('noCookie')
	const disqusWindow = document.getElementById('disqusWindow')

	function loadDisqus() {
		if (disqusWindow) {
			let script = document.createElement('script')
			script.src = "//https-souravgoswami-github-io.disqus.com/count.js"
			script.async = true
			document.head.appendChild(script)

			disqusWindow.innerHTML = `<div id="disqus_thread"></div>`
			let disqusJs = document.createElement('script')
			disqusJs.src = "/assets/js/disqus.js"

			document.head.appendChild(disqusJs)
		}
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
			allCookie()
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

			$('#loadDisqus').click(() => {
				loadDisqus()
				loadGoogleAnalytics()
			})
		}
	}

	if(localStorage.cookieAll) {
		allCookie(0)
	}
})
