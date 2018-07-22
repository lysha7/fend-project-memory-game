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

// Loop through deck to add icons to each card according to the shuffled array
function createCards() {
	// Access all <i> elements
	const icons = deck.getElementsByTagName('i');
	// Variable to keep track of where we are in the cards array
	let i = 0;

	// Loop through <i> elements, and assign a classname that displays the correct icon
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
	// Register only clicks on cards, and no more than two cards at a time
	if (event.target.classList.value === 'card' && openCards.length < 2) {

		// Set timer to begin only the first time a card is clicked
		if (firstClick === true) {
			timer = setInterval(startTimer, 1000);
			firstClick = false;
		}

		// Call functions to show and compare cards
		showCard(event.target);
		compareCards(event.target);

		// If all matches have been made, stop the timer and call the function to display the popup window with stats
		if (matchCounter === 8) {
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

	// Increase the number of seconds by 1
	scd++;
	
	// When the number of seconds reaches 60, make seconds 0 and increase number of minutes by 1	
	if (scd === 60) {
		scd = 0;
		min++;
		// Display number of minutes
		minDisplay.textContent = pad2(min);
	}
	// Display number of seconds
	scdDisplay.textContent = pad2(scd);
}

// Function from https://www.electrictoolbox.com/pad-number-two-digits-javascript/ to pad a number to 2 digits
function pad2(number) {
     return (number < 10 ? '0' : '') + number   
}

// Function to display the "right side" of the card
function showCard(card) {
	card.classList.add('open', 'show');
}

// Function to compare two cards and see if their icons match and increase move counter
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;

function compareCards(card) {

	// Add card that was clicked to array of open cards
	openCards.push(card);

	// When there are two open cards in the array, access the classes of their child elements to see if they match
	if (openCards.length === 2) {
		
		let icon1 = openCards[0].children.item(0).classList.value;
		let icon2 = openCards[1].children.item(0).classList.value;
		
		// If they match, perform makeMatch function, empty array, and increase the number of total matches by 1
		if (icon1 === icon2) {
			makeMatch(openCards);
			openCards.length = 0;
			matchCounter++;
		}
		// If they don't match, wait one second, then perform the noMatch function and empty the array
		else {
			setTimeout(function() {
				noMatch(openCards);
				openCards.length = 0;
			}, 1000);
		}

		// Increase the number of moves by 1
		moveCounter++;
		
		// Call function to display the number of moves
		updateCounterDisplay(moveCounter);
		
		// Call function to display the correct number of stars
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
	
	// Displays number of moves in the score panel
	counterSpan.textContent = counter;

	// Changes the word "Moves" to singular if there has been 1 move
	if (counter === 1) {
		moves.textContent = " Move";
	}
	else {
		moves.textContent = " Moves";
	}
}

// Function to "take away" stars when certain numbers of moves are reached
let starsLeft = 3;
function updateStarDisplay(counter) {
	const stars = document.querySelectorAll('.fa-star');
	if (counter === 16) {
		stars[2].classList = "fa fa-star-o";
		starsLeft--;
	}
	if (counter === 20) {
		stars[1].classList = "fa fa-star-o";
		starsLeft--;
	}
}

// Function to display window with game stats and option to play again
function winGame() {
	const winPopup = document.querySelector('.win-popup');
	const totalMoves = document.querySelector('.total-moves');
	const totalStars = document.querySelector('.total-stars');
	const starWord = document.querySelector('.star-word');
	const totalTime = document.querySelector('.total-time');
	const x = document.querySelector('.close');
	const restart = document.querySelector('.win-popup .restart');
	
	// Display window
	winPopup.style.display = "block";

	// Display stats
	totalMoves.textContent = moveCounter;
	totalStars.textContent = starsLeft;
	// Change "stars" to singular if there is 1
	if (starsLeft === 1) {
		starWord.textContent = "star";
	}
	totalTime.textContent = `${pad2(min)}:${pad2(scd)}`;

	// Allow user to close window by clicking the X
	x.addEventListener('click', function() {
		winPopup.style.display = "none";
	});

	// Allow user to start game over by clicking the retart button
	restart.addEventListener('click', function() {
		location.reload();
	});
}


