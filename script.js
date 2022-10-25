/*
8/16 to do
alternate between player & opponent choice by round - did it ! via modulo

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
    currentRound: 0,
    playerCounter: 0,
    opponentCounter: 0,
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
        const selectedDiv = event.currentTarget;
        const selectedDivId = Number(event.currentTarget.id); 
        
        //inserts choice into div && counts rounds
        if (selectedDiv.innerText == '' && this.currentRound % 2 == 0) {
            selectedDiv.innerText = gameBoardObject.player;
            this.currentRound =  this.currentRound + 1;
        } else if (selectedDiv.innerText =='') {
            selectedDiv.innerText = gameBoardObject.opponent;
            this.currentRound =  this.currentRound + 1;
        }

        //connects DOM to gameboard array && alternates rounds w/ round counter
        for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
            if (i === selectedDivId && gameBoardObject.gameBoard[i] == '' && this.currentRound % 2 !== 0 ) {
                gameBoardObject.gameBoard[i] = gameBoardObject.player;
            } else if (i === selectedDivId && gameBoardObject.gameBoard[i] == '') {
                gameBoardObject.gameBoard[i] = gameBoardObject.opponent;
            }
        }
        displayController.detectWinner();
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
    winConditions: [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [3,5,7], [0,3,6], [1,4,7], [2,5,8]],
    detectWinner: function() {
        const boardArray = gameBoardObject.gameBoard; //shortened reference
        const winArray = this.winConditions;
        const player = gameBoardObject.player;
        const opponent = gameBoardObject.opponent;
        let winner = '';

        this.winConditions.forEach(i=>{
            if(boardArray[i[0]].length > 0 && boardArray[i[0]] === boardArray[i[1]] && boardArray[i[1]] === boardArray[i[2]]) {
                console.log(boardArray[i[0]]);
                document.getElementById('header').innerText = `The winner is ${boardArray[i[0]]}`;
                winner = `${boardArray[i[0]]}`;
            } else if (!boardArray.includes('') && winner == '') {
                document.getElementById('header').innerText = "It's a tie.";
            //needs to check for a tie below
            // else if (boardArray[i] !== '') {
            //     document.getElementById('header').innerText = "It's a tie.";
            }
        })
    }
}
