/*

2C = Two of Clubs
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades

*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let computerPoints = 0;

const newBtn = document.querySelector('#new');
const askBtn = document.querySelector('#ask');
const stopBtn = document.querySelector('#stop');

const pointsLayer = document.querySelectorAll('small');

const playerCards = document.querySelector('#player__cards');
const computerCards = document.querySelector('#computer__cards');

//This function creates a new deck
const createDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (let type of types) {
            deck.push(i + type);
        }
    }

    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type);
        }
    }

    deck = _.shuffle(deck);

    return deck;
}

createDeck();

const askForCard = () => {
    if (deck.length === 0) {
        throw 'There are not more cards';
    }
    const card = deck.pop();

    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value)) ? points = (value === 'A') ? 11 : 10 : parseInt(value);
}

const computer = (minimumPoints) => {
    do {
        const card = askForCard();
        computerPoints = computerPoints + cardValue(card);
        pointsLayer[1].innerHTML = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/${card}.png`;
        imgCard.classList = 'computer__card';
        computerCards.appendChild(imgCard);

        if (minimumPoints > 21) {
            break;
        }

    } while ((computerPoints < minimumPoints) && (minimumPoints <= 21));

    setTimeout(() => {
        if (computerPoints === minimumPoints) {
            alert('Draw');
        } else if (minimumPoints > 21) {
            alert('The computer wins');
        } else if (computerPoints > 21) {
            alert('The player wins');
        } else {
            alert('The computer wins');
        }
    }, 500);
}

askBtn.addEventListener('click', () => {
    const card = askForCard();
    playerPoints = playerPoints + cardValue(card);
    pointsLayer[0].innerHTML = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `./assets/cartas/${card}.png`;
    imgCard.classList = 'player__card';
    playerCards.appendChild(imgCard);

    if (playerPoints > 21) {
        console.warn('Sorry, you lose.');
        askBtn.disabled = true;
        computer(playerPoints);
    } else if (playerPoints === 21) {
        setTimeout(() => {
            alert('Blackjack');
        }, 500);
        askBtn.disabled = true;
    }
});

stopBtn.addEventListener('click', () => {
    stopBtn.disabled = true;
    askBtn.disabled= true;

    computer(playerPoints);
});

newBtn.addEventListener('click', () => {
    deck = createDeck();
    stopBtn.disabled = false;
    askBtn.disabled = false;
    computerPoints = 0;
    playerPoints = 0;
    playerCards.innerHTML = '';
    computerCards.innerHTML = '';
    pointsLayer[0].innerHTML = 0;
    pointsLayer[1].innerHTML = 0;
});