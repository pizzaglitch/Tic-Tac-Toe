const gameBox = document.querySelectorAll('.gameBox');

const gameBoardObject = {
    gameBoard: ['','','',
                '','','',
                '','',''],             
    player: '',
    opponent: '',
    currentRound: 0,

    displayPlayerSelection: function(event) {
        const selectedDiv = event.currentTarget;
        const selectedDivId = Number(event.currentTarget.id); 

        //inserts choice into div && counts rounds
        if (selectedDiv.innerText == '' && this.currentRound % 2 == 0 && gameBoardObject.player !== '') {
            selectedDiv.innerText = gameBoardObject.player;
            this.currentRound = this.currentRound + 1;
        } else if (selectedDiv.innerText == '' && gameBoardObject.player !== '') {
            selectedDiv.innerText = gameBoardObject.opponent;
            this.currentRound = this.currentRound + 1;
        }

        // Specify color of selection, blue for 'x', red for 'o'
        if (selectedDiv.innerText == 'X' && gameBoardObject.player !== '') {
            selectedDiv.style.color = '#1887db';
        } else if (selectedDiv.innerText == 'O' && gameBoardObject.player !== '') {
            selectedDiv.style.color = '#e03c26';
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

const displayController = {
    playerSelectX: function() {
        gameBoardObject.player = 'X';
        gameBoardObject.opponent = 'O';
    },
    playerSelectO: function() {
        gameBoardObject.player = 'O';
        gameBoardObject.opponent = 'X';
    },
    winConditions: [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]],
    detectWinner: function() {
        const boardArray = gameBoardObject.gameBoard; //shortened reference
        let winner = '';
        this.winConditions.forEach(i=>{
            if(boardArray[i[0]].length > 0 && boardArray[i[0]] === boardArray[i[1]] && boardArray[i[1]] === boardArray[i[2]]) {
                console.log(boardArray[i[0]]);
                document.getElementById('gameOutcome').innerText = `The winner is ${boardArray[i[0]]}`;
                winner = `${boardArray[i[0]]}`;
            } else if (!boardArray.includes('') && winner == '') {
                document.getElementById('gameOutcome').innerText = "It's a tie.";
            } else if (!boardArray.includes('') && winner !== '') {
            return
            }
        })
    },
    resetGame: function() {
        for (let i=0; i < gameBox.length; i++) {
            gameBox[i].innerText = '';
        };
        gameBoardObject.gameBoard = ['','','',
                                     '','','',
                                     '','','']; 
        gameBoardObject.player = '';
        gameBoardObject.opponent = '';
        gameBoardObject.currentRound = 0;                              
    }, 
    hideOnLoad: window.onload = function () {
        document.getElementById('gameDisplay').style.display = 'none';
    },
    showGrid: function () {
        document.getElementById('gameDisplay').style.display = 'flex';
        document.getElementById('playerSelectX').style.display = 'none';
        document.getElementById('playerSelectO').style.display = 'none';
        document.getElementById('startGame').style.display = 'none';


    }
}

