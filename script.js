/*
8/16 to do
alternate between player & opponent choice by round 

*/
const gameGrid = document.querySelector('#gameGrid');
const gameBox = document.querySelectorAll('.gameBox');
//Gameboard Object 
const gameBoardObject = {
    gameBoard: ['','','',
                '','','',
                '','',''],
    player: '',
    opponent: '',
    roundCounter: '',
    currentRound: 0,
    // displayGameBoard: function() {
        //Place gameBoard array elements inside divs
        // for (let i = 0; i < gameBoardObject.gameBoard.length; i++) {
        //     const newDiv = document.createElement('div');
        //     newDiv.id = i; 
        //     newDiv.className = 'gameBox';
        
                   
        //     // });
        //     gameGrid.appendChild(newDiv);
        // }
    // },
    displayPlayerSelection: function(event) {
        const array = gameBoardObject.gameBoard; //shortened reference
        const selectedDiv = event.currentTarget;
        const selectedDivId = Number(event.currentTarget.id); 

        if (selectedDiv.innerText == '' && this.currentRound % 2 == 0) {
            selectedDiv.innerText = gameBoardObject.player;
            this.currentRound =  this.currentRound + 1;
        } else {
            selectedDiv.innerText = gameBoardObject.opponent;
            this.currentRound =  this.currentRound + 1;

        }
        
        for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
            if (i === selectedDivId && gameBoardObject.gameBoard[i] == '') {
                gameBoardObject.gameBoard[i] = gameBoardObject.player;
            } if (array[0] && array[3] && array[6] == gameBoardObject.player) {
                //displays winner
                console.log(`${gameBoardObject.player} wins`)
            } 
        }
    }
};
// gameBoardObject.displayGameBoard();

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
    },
    
    // detectWinner: function() {
    //     for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
    //         if ([0] && [3] && [6] == 'x') {
    //             console.log('x wins')
    //         } 
    // }
}
