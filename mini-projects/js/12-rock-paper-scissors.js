let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    ties: 0,
    losses: 0
};

updateScoreElement();

function updateScoreElement ()  {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove () {
    const randomNum = Math.random();
    let computerMove = '';

    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNum >= 1/3 && randomNum < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNum >= 2/3 && randomNum < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    const buttonElement = document.querySelector('.js-auto-play-button');
    if (isAutoPlaying == true) {
        buttonElement.innerHTML = 'Stop';
    } else {
        buttonElement.innerHTML = 'Auto Play';
    }

}

function playGame (playerMove) {
    const computerMove = pickComputerMove();
    let results = '';

    if (playerMove == 'scissors') {
        if (computerMove === 'rock') {
            results = 'You lose.';
        } else if (computerMove === 'paper') {
            results = 'You win.';
        } else if (computerMove === 'scissors') {
            results = 'Its a tie.';
        }

    } else if (playerMove == 'paper') {
        if (computerMove === 'rock') {
            results = 'You win.';
        } else if (computerMove === 'paper') {
            results = 'Its a tie.';
        } else if (computerMove === 'scissors'){
            results = 'You lose.';
        }

    } else if (playerMove == 'rock') {
        if (computerMove === 'rock') {
            results = 'Its a tie.';
        } else if (computerMove === 'paper') {
            results = 'You lose.';
        } else if (computerMove === 'scissors'){
            results = 'You win.';
        }
    }

    if (results === 'You win.') {
        score.wins++;
    } else if (results === 'You lose.') {
        score.losses++;
    } else if (results === 'Its a tie.') {
        score.ties++;
    }

    document.querySelector('.js-results').innerHTML = `${results}`;
    document.querySelector('.js-moves').innerHTML = `You 
                                                    <img class="moves" src="img/${playerMove}-emoji.png">
                                                    <img class="moves" src="img/${computerMove}-emoji.png">
                                                    Computer`


    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

}