// Handle the arrow down animation

$(() => {
	$('#main-arrow .arrow').click(function() {
		$('html').animate({
			scrollTop: $('.other-container').offset().top
		}, 500)
	})
})
