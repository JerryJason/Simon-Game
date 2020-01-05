const buttonColors = [ 'red', 'blue', 'yellow', 'green' ];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
	let randomNumber = Math.floor(Math.random() * buttonColors.length);
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$(`#${randomChosenColor}`).fadeOut().fadeIn();
	playSound(randomChosenColor);
	level++;
	$('h1').html(`Level: ${level}`);
	userClickedPattern = [];
}

$('.btn').click(function() {
	let userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

$('body').keypress(function() {
	if (started === false) {
		nextSequence();
		started = true;
	} else {
		console.log('game already started');
	}
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		let wrong = new Audio('sounds/wrong.mp3');
		wrong.play();
		$('body').addClass('game-over');
		setTimeout(() => {
			$('body').removeClass('game-over');
		}, 200);
		$('h1').html('Game Over. Press any key to restart');
		startOver();
	}
}

function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
}

function playSound(name) {
	let sound = new Audio(`sounds/${name}.mp3`);
	sound.play();
}

function animatePress(currentColor) {
	$(`.${currentColor}`).addClass('pressed');
	setTimeout(() => {
		$(`.${currentColor}`).removeClass('pressed');
	}, 100);
}
