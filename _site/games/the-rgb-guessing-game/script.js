var numSquares = 6, colors = [], scoreCount = 0, streak = 0
const squares = document.querySelectorAll(".squares"), modeButtons = document.querySelectorAll('.mode')
const colorDisplay = document.getElementById("displayColor"), messageDisplay = document.getElementById('message')
const h1 = document.getElementById('h1'), score = document.getElementById('score')

for(let i = 0 ; i < modeButtons.length ; ++i) {
	modeButtons[i].onclick = function() {
		if(!this.classList.contains('selected')) {
			modeButtons.forEach(e => e.classList.remove('selected'))
			this.classList.add('selected')
			numSquares = this.textContent === 'easy' ? 3 : 6
			replay()
		}
	}
}

for(let i = 0 ; i < squares.length ; i++) {
	squares[i].onclick = function() {
		var clickedColor = this.style.backgroundColor

		if(clickedColor === colorDisplay.textContent){
			messageDisplay.textContent = 'Correct!'
			score.innerHTML = streak += ++streak
			for(let i = 0 ; i < squares.length ; i++) squares[i].style.background = clickedColor
			h1.style.background = clickedColor
			setTimeout(() => replay(), 1000)
		}

		else
			[this.style.backgroundColor, messageDisplay.textContent, streak] = ['#222', 'Try Again', 0]
	}

	squares[i].rotate = 0
	squares[i].onmouseover = function() { this.style.transform = `rotate(${this.rotate += 90}deg)` }
}

replay()

function replay(){
	colors = Array.from(Array(numSquares), () => `rgb(${Array.from(Array(3), () => Math.floor(Math.random() * 256)).join(', ')})`)
	colorDisplay.textContent = colors[Math.floor(Math.random() * colors.length)]
	messageDisplay.textContent = ''

	for(let i = 0 ; i < squares.length ; i++)
		[squares[i].style.display, squares[i].style.backgroundColor] = colors[i] ? ['block', colors[i]] : ['none', '']

	h1.style.backgroundColor = '#48B'
}
