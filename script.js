const gameGrid = document.querySelector('#gameGrid');
const gameBox = document.querySelectorAll('.gameBox');

//Gameboard Object 
const gameBoardObject = {
    gameBoard: ['','','',
                '','','',
                '','',''],
    player: '',
    opponent: '',
    displayGameBoard: function() {
        //Place gameBoard array elements inside divs
        // for (let i = 0; i < gameBoardObject.gameBoard.length; i++) {
        //     const newDiv = document.createElement('div');
        //     newDiv.id = i; 
        //     newDiv.className = 'gameBox';
        // //Adds event listener to each div. Checks if id == index, adds player selection if so
            
        //     // newDiv.addEventListener('click', (e) => {
        //     //     const selectDivId = e.target.id; 
        //     //         for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
        //     //             if (gameBoardObject.gameBoard[i] == selectDivId) {
        //     //                 gameBoardObject.gameBoard[i] = gameBoardObject.player
        //     //             } 
        //     //         }   
                   
        //     // });
        //     gameGrid.appendChild(newDiv);
        // }
    },
    displayPlayerSelection: function(event) {
        const selectedDiv = event.currentTarget;
        const selectedDivId = event.currentTarget.id; 
        selectedDiv.innerText = gameBoardObject.player;
        for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
            if (i == selectedDivId) {
                gameBoardObject.gameBoard[i] = gameBoardObject.player;
            } 
        }
    }
};
gameBoardObject.displayGameBoard();

/* 
console.log(gameBoardObject.gameBoard)
console.log(gameBoardObject.displayPlayerSelection.selectDivId) 
*/

// player creator
const playerFactory = (choice, score) => {
    this.choice = choice;

        return {choice, score};
}

//Display 
const displayController = {
    score: '',
    playerSelectX: function() {
        gameBoardObject.player = 'x';
        gameBoardObject.opponent = 'o';
    },
    playerSelectO: function() {
        gameBoardObject.player = 'o';
        gameBoardObject.opponent = 'x';
    }
}
