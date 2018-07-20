// Array containing all cards
const cards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"]
// Container for cards in html
const deck = document.querySelector('.deck');

// Call function to shuffle cards
shuffle(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Call function to display cards on page
createCards();

// Loop through cards to add icons to each card according to the shuffled array
function createCards() {
	const icons = deck.getElementsByTagName('i');
	let i = 0;
	for (icon of icons) {
		icon.className = `fa fa-${cards[i]}`;
		i++;
	}
}

// Add event listener to the restart button so it will reload the page
document.querySelector('.restart').addEventListener('click', function() {
	location.reload();
});


// Add event listener to the deck so that when a card is clicked, game functionality will begin
let firstClick = true;
var timer;

deck.addEventListener('click', function(event) {
	// Register only click on cards, and no more than two cards at a time
	if (event.target.classList.value === 'card' && openCards.length < 2) {

		// Set timer to begin only the first time a card is clicked
		if (firstClick === true) {
			timer = setInterval(startTimer, 1000);
			firstClick = false;
		}
		
		showCard(event.target);
		compareCards(event.target);

		if (matchCounter === 8) {
			console.log(timer);
			clearInterval(timer);
			winGame();
		}
	}
});

// Timer function
let scd = 0;
let min = 0;

function startTimer() {
	const scdDisplay = document.querySelector('.seconds');
	const minDisplay = document.querySelector('.minutes');

	scd++;
		
	if (scd === 60) {
		scd = 0;
		min++;
		minDisplay.textContent = pad2(min);
	}

	scdDisplay.textContent = pad2(scd);
}

// Function from https://www.electrictoolbox.com/pad-number-two-digits-javascript/ to pad a number to 2 digits
function pad2(number) {
     return (number < 10 ? '0' : '') + number   
}

function showCard(card) {
	card.classList.add('open', 'show');
}

// Function to compare two cards and see if their icons match and increase move counter
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;

function compareCards(card) {
	openCards.push(card);

	if (openCards.length === 2) {
		
		let icon1 = openCards[0].children.item(0).classList.value;
		let icon2 = openCards[1].children.item(0).classList.value;
		
		if (icon1 === icon2) {
			makeMatch(openCards);
			openCards.length = 0;
			matchCounter++;
		}
		else {
			setTimeout(function() {
				noMatch(openCards);
				openCards.length = 0;
			}, 1000);
		}

		moveCounter++;
		
		updateCounterDisplay(moveCounter);
		
		updateStarDisplay(moveCounter);
	}
}

// Function to add .match class to cards that match
function makeMatch(array) {
	for (element of array) {
		element.classList.add('match');
	}
}

// Function to remove .open and .show classes from elements that don't match
function noMatch(array) {
	for (element of array) {
		element.classList.remove('open', 'show');
	}	
}

// Function to update the moves counter on the page
function updateCounterDisplay(counter) {
	const counterSpan = document.querySelector('.counter');
	const moves = document.querySelector('#moves');
	
	counterSpan.textContent = counter;

	if (counter === 1) {
		moves.textContent = " Move";
	}
	else {
		moves.textContent = " Moves";
	}
}

function updateStarDisplay(counter) {
	const stars = document.querySelectorAll('.fa-star');
	if (counter === 15) {
		stars[2].classList = "fa fa-star-o";
	}
	if (counter === 18) {
		stars[1].classList = "fa fa-star-o";
	}
	if (counter === 21) {
		stars[0].classList = "fa fa-star-o";
	}
}

function winGame() {

}


