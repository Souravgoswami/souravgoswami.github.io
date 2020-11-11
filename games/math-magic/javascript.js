Array.prototype.shuffle = function() { return this.sort(() => Math.random() - 0.5) }
Array.prototype.sample = function() { return this[Math.floor(Math.random() * this.length)] }

const LIVES = 5
const TIME = 45

var score = 0, totalScore = 0, streak = 0, lives = LIVES
var min = 1, max = 20
var clicked = false
var answerElement = 'box1'
var gameEnd = true
var remainingTime = TIME
var myInterval = undefined

document.getElementById('timeRemaining').textContent = TIME
document.getElementById('remainingLives').textContent = LIVES

function randomQuestion(min = 0, max = 30) {
	document.getElementById('remainingLives').textContent = lives
	clicked = false
	gameEnd = false

	let operations = '+ - *'.split(' ')
	let question = Math.floor(Math.random() * max + min) + operations.sample() + Math.floor(Math.random() * max + min)
	let answer = eval(question)

	document.getElementById('question').textContent = question

	let answerChoices = [answer]
	while (answerChoices.length < 4) {
		element = Math.floor(Math.random() * max)
		if (!answerChoices.includes(element))
			answerChoices.push(element)
	}

	let options = answerChoices.shuffle()
	answerElement = document.getElementById(`box${options.findIndex(e => e === answer) + 1}`)

	for (i = 0 ; i < options.length ; ++i) {
		let element = document.getElementById(`box${i + 1}`)

		element.onmouseover = function() {
			this.style.backgroundColor = '#000'
			this.style.color = '#fff'
		}

		element.onmouseout = function() {
			this.style.backgroundColor = '#fff'
			this.style.color = '#000'
		}

		element.style.boxShadow = '0px 4px 0px #8D99FF'
		element.style.color = '#000'
		element.style.backgroundColor = '#fff'

		element.textContent = options[i]
	}
}

function check(id, question) {
	let element  = document.getElementById(id)
	let chosenAnswer = element.textContent
	let answer = eval(question)
	let playerIsCorrect = answer == chosenAnswer

	if (lives > 0 && !clicked && remainingTime > 0) {
		if (lives < 3) {
			document.getElementById('lives').style.color = '#ff5555'
		}

		clicked = true

		if (playerIsCorrect) {
			playCorrect()
			totalScore = ++score * ++streak
			document.getElementById('scoreValue').textContent = totalScore

			element.style.backgroundColor = '#74BB25'
			element.style.color = '#fff'

			element.onmouseout = function() {
				this.style.backgroundColor = '#74BB25'
				this.style.color = '#fff'
			}

			if (streak % 5 == 0) {
				++max
				++min
			}

			if (streak % 10 == 0)
				++lives

			element.style.boxShadow = '0px 0px 10px 10px #fff'
			setTimeout(function() { randomQuestion(min, max) }, 250)
		}

		else {
			playWrong()
			streak = 1
			--lives
			document.getElementById('remainingLives').textContent = lives

			element.style.backgroundColor = '#f55'
			element.style.color = '#fff'
			element.style.boxShadow = '0px 0px 10px 10px #fff'

			answerElement.style.backgroundColor = '#77f'
			answerElement.style.color = '#fff'
			answerElement.style.boxShadow = '0px 0px 10px 10px #fff'

			element.onmouseout = function() {
				element.style.backgroundColor = '#f55'
				element.style.color = '#fff'
				answerElement.style.backgroundColor = '#77f'
				answerElement.style.color = '#fff'
			}

			setTimeout(
				function() {
					element.style.backgroundColor = '#fff'
					element.style.color = '#000'
					element.style.boxShadow = '0px 4px 0px 0px #8D99FF'

					answerElement.style.backgroundColor = '#fff'
					answerElement.style.color = '#000'
					answerElement.style.boxShadow = '0px 4px 0px 0px #8D99FF'

					randomQuestion(min, max)

					element.onmouseout = function() {
						element.style.backgroundColor = '#fff'
						element.style.color = '#000'
						answerElement.style.backgroundColor = '#fff'
						answerElement.style.color = '#000'
					}
				}, 500
			)
		}
	}

	else if(lives < 1)
		gameOver()
}

function startGame() {
	document.getElementById('startButton').textContent = 'Restart'
	document.getElementById('choices').style.display = 'block'
	document.getElementById('instruction').style.display = 'block'
	document.getElementById('time').style.color = '#000'
	document.getElementById('lives').style.color = '#000'

	clicked = false
	if (!gameEnd) {
		if (window.confirm('Do you want to restart the game?'))
			initialize()
		else
			return
	}
	else
		initialize()

	randomQuestion(min, max)
}

function gameOver() {
	if (!gameEnd) {
		playTimeout()
		clearInterval(myInterval)
		document.getElementById('instruction').textContent = 'Click on Restart!'
		document.getElementById('question').textContent = 'Game Over'
		document.getElementById('startButton').textContent = 'Restart'
		document.getElementById('choices').style.display = 'none'
		gameEnd = true
	}
}

function initialize() {
	gameEnd = false
	score = totalScore = streak = 0
	lives = LIVES
	min = 1, max = 20
	remainingTime = TIME
	document.getElementById('instruction').textContent = 'Choose the Correct Answer'
	document.getElementById('scoreValue').textContent = totalScore
	document.getElementById('choices').style.display = 'block'
	playStart()

	clearInterval(myInterval)
	myInterval = setInterval(
		function() {
			document.getElementById('timeRemaining').textContent = remainingTime
			if (remainingTime > 0) {
				--remainingTime
				if (remainingTime < 3) {
					playBeep()
					document.getElementById('time').style.color = '#ff5555'
				}
			}
			else {
				gameOver()
			}
		}, 1000
	)
}

function playCorrect() { document.getElementById('sampleCorrect').cloneNode(true).play() }
function playWrong() { document.getElementById('sampleWrong').cloneNode(true).play() }
function playBeep() { document.getElementById('sampleBeep').cloneNode(true).play() }
function playTimeout() { document.getElementById('sampleTimeout').cloneNode(true).play() }
function playStart() { document.getElementById('sampleStart').cloneNode(true).play() }
