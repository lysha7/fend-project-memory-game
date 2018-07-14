// Array containing all cards
const cards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"]
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


// Add event listener to the deck so that when a card is clicked, its other side will be revealed
deck.addEventListener('click', function(event) {
	if (event.target.classList.value === 'card') {
		showCard(event.target);
		compareCards(event.target.children);
	}
});

function showCard(card) {
	card.classList.add('open', 'show');
}

// Compare two cards to see if their icons match
let openCards = [];

function compareCards(card) {
	openCards.push(card);

	if (openCards.length === 2) {
		
		let icon1 = openCards[0].item(0).classList.value;
		let icon2 = openCards[1].item(0).classList.value;
		
		if (icon1 === icon2) {
			console.log("It's a match!");
		}
		else {
			console.log("Nope.");
		}

		openCards.length = 0;
	}

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
