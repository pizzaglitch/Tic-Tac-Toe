const gameGrid = document.querySelector('#gameGrid');
//Gameboard Object 
const gameBoardObject = {
    gameBoard: [topLeft, topMid, topRight, midLeft, midMid, midRight, botLeft, botMid, botRight],
    displayGameBoard: function() {
        for (let i = 0; i < gameBoard.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = 'div' + i; 
            newDiv.className = 'gameBox';
            gameGrid.appendChild(newDiv); 
        }
    }
};

gameBoardObject.displayGameBoard();

const displayController = {
    score: '',
}

const playerFactory = (playerName, score) => {
    const playerCreator = () => console.log(`Welcome, ${playerName}!`);
    return { playerName, score, playerCreator };
}

