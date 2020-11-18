const LIVES = 5

var playing = false, score = 0, lives = LIVES, touched = false, step, action, speed = 1, streak = 0, sliced = 0, fruit = ''

var fruitFiles = 'apple apple1 berries grape grapes1 orange plum tomato peach pineapple raspberry strawberry'
	.split(' ')

$(function() {
	$('.hearts').css('width', LIVES * 22)

	for(let i = 0 ; i < LIVES ; ++i)
		$('#lives').append(`<img src="images/heart.webp" id="heart${i}" class="heart"/>`)

	for(let i of fruitFiles)
		$('#fruitsContainer').append(`<img src="images/${i}.svg" id=${i} class="fruits"/>`)

	$('#startButton').click(() => {
		if (playing) {
			playing = false
			$('#dialog').dialog({
				buttons: {
					'Cancel': () => {
						playing = true
						$('#dialog').dialog('close')
					},
					'Ok': () => { location.reload() }
				}
			})
		}

		else {
			playing = true
			score = 0
			lives = LIVES
			speed = 1
			sliced = 0

			$('#gameOver').hide('puff', 500)
			$('#scoreVal').html('0')
			$('#startButton').html('Reload')
			$('#instruction').html('Cut the Fruits')

			for(let i = 0 ; i < LIVES ; ++i)
				$(`#heart${i}`).show('pulsate', 250)

			startAction()
		}
	})

	$('#fruitsContainer').mouseover(function() {
			if (fruit.position().top + 99 > 0 && playing) {
				score += ++streak
				sliced += 1
				touched = true

				fruit.hide('explode', 175)
				setTimeout(function() {
					$('#scoreVal').html(score)
					document.getElementById('swoosh').cloneNode(true).play()
					clearInterval(action)
					startAction()
				}, 200)
			}
	})

	function startAction() {
		sampleFruit()
		$('#lives').show('explode', 250)

		fruit.css({
		 	'left': Math.round(Math.random() * 428),
		 	'top': Math.round(Math.random() * -50) - 105
		})

		speed += 0.05
		step = Math.floor(Math.random() * 3) + speed

		action = setInterval(
			() => {
				if (playing)
					fruit.css('top', fruit.position().top + step)

				if (!touched && fruit.position().top > $('#playArea').height()) {
					streak = 0
					touched = false
					document.getElementById('missed').cloneNode(true).play()

					if (lives > 1) {
						lives -= 1
						step = Math.floor(Math.random() * 5) + speed

						fruit.css({
							'left': Math.round(Math.random() * 428),
							'top': Math.round(Math.random() * -50) -100
						})

						$(`#heart${lives}`).hide('fade', 200)
						sampleFruit()
					}

					else {
						playing = false

						$('#gameOver').show('pulsate', 500)
						$('#gameOver').html(`<p>Game Over</p><p>You have Sliced ${sliced} Fruits</p>`)
						$('#instruction').html('Press Restart Game to Play Again')
						$('#startButton').html('Restart Game')
						$(`#heart${0}`).hide('pulsate', 200)
						$('#lives').hide('explode', 250)

						clearInterval(action)
						fruit.hide()
					}
				}
			},
		10)
	}

	function sampleFruit() {
		touched = false
		fruit = $('#' + fruitFiles[Math.floor(Math.random() * fruitFiles.length)])
		fruit.show()
	}
})
