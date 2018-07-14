// Array containing all cards
const cards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"]

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

// Loop through array to create html for each card and display it on the page
function createCards() {
	cards.forEach(function(element) {
		const deck = document.querySelector('.deck');
		
		const listItem = document.createElement('li');
		deck.appendChild(listItem);
		listItem.className = 'card open show';	

		const icon = document.createElement('i');
		listItem.appendChild(icon);
		icon.className = `fa fa-${element}`;
	});
}

// Add event listener to the restart button so it will reload the page
document.querySelector('.restart').addEventListener('click', function() {
	location.reload();
});




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
