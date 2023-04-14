const module = (() => {
    'use strict'
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];
    let mainPoints = [];

    const newBtn = document.querySelector('#new'),
        askBtn = document.querySelector('#ask'),
        stopBtn = document.querySelector('#stop'),
        pointsLayer = document.querySelectorAll('small'),
        cardsContainer = document.querySelectorAll('.cards__container');

    const initializeWebGame = (players = 2) => {
        deck = createDeck();
        mainPoints = [];
        for (let i = 0; i < players; i++) {
            mainPoints.push(0);
        }

        stopBtn.disabled = false;
        askBtn.disabled = false;

        cardsContainer.forEach(elem => elem.innerText = '');
        pointsLayer.forEach(elem => elem.innerText = 0);
    }

    const createDeck = () => {
        deck = [];
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

        return deck = _.shuffle(deck);
    }

    const askForCard = () => {
        if (deck.length === 0) {
            throw 'There are not more cards';
        }
        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? (value === 'A') ? 11 : 10 : parseInt(value);
    }

    const amountPoints = (card, turn) => {
        mainPoints[turn] = mainPoints[turn] + cardValue(card);
        pointsLayer[turn].innerHTML = mainPoints[turn];
        return mainPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `./assets/cartas/${card}.png`;
        imgCard.classList = 'computer__card';
        cardsContainer[turn].appendChild(imgCard);
    }

    const determinateWinner = () => {
        const [minimumPoints, computerPoints] = mainPoints;
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

    const computer = (minimumPoints) => {
        let computerPoints = 0;
        do {
            const card = askForCard();
            computerPoints = amountPoints(card, mainPoints.length - 1);
            createCard(card, mainPoints.length - 1);

        } while ((computerPoints < minimumPoints) && (minimumPoints <= 21));

        determinateWinner();
    }

    askBtn.addEventListener('click', () => {
        const card = askForCard();
        const playerPoints = amountPoints(card, 0);

        createCard(card, 0);

        if (playerPoints > 21) {
            console.warn('Sorry, you lose.');
            askBtn.disabled = true;
            stopBtn.disabled = true;
            computer(playerPoints);
        } else if (playerPoints === 21) {
            setTimeout(() => {
                alert('Blackjack');
            }, 500);
            askBtn.disabled = true;
            stopBtn.disabled = true;
        }
    });

    stopBtn.addEventListener('click', () => {
        stopBtn.disabled = true;
        askBtn.disabled = true;

        computer(mainPoints[0]);
    });

    newBtn.addEventListener('click', () => {
        initializeWebGame();
    });

    return {
        ini: initializeWebGame
    };
})();