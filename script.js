// To-Do: Modify game winning message 
// If playing against AI: two slots left. If either player or AI chooses, either of them will win. Player's turn and they choose
// a winning piece: they should win. However, if AI chooses their winning spot after, updates to computer win
// unsure how to test for this
// says it's a tie if last choice is a winning move, incorrect. should display winner
// ^^ fixed. Problem was that win condition only checked for winner / tie if gameboard.length was > 0. On tie, it is 0, wouldn't check. 
// solution was to check for tie prior to checking for win condition

const gameBox = document.querySelectorAll('.gameBox');
const gameBoxArray = [...gameBox];

const gameBoardObject = {
    gameBoard: ['','','',
                '','','',
                '','',''],
    emptySlots: [0,1,2,3,4,5,6,7,8],
    takenSlots: [],
    player: '',
    opponent: '',
    currentRound: 0,
    winner: '',
    compChoice: '',
    displayPlayerSelection: function(event) {
        const compChoice = gameBoardObject.compChoice;
        const selectedDiv = event.currentTarget;
        const selectedDivId = Number(event.currentTarget.id); 
        const correspondingUserIndex = this.emptySlots.indexOf(selectedDivId)
        //inserts choice into div && counts rounds
        if (selectedDiv.innerText == '' && this.currentRound % 2 == 0 && compChoice == '') {
            this.emptySlots.splice(correspondingUserIndex, 1); 
            selectedDiv.innerText = gameBoardObject.player;
            this.currentRound += 1;
        } else if (selectedDiv.innerText == '' && compChoice == '') {    
            this.emptySlots.splice(correspondingUserIndex, 1);
            selectedDiv.innerText = gameBoardObject.opponent;
            this.currentRound += 1;
        } else if (compChoice !== '' && selectedDiv.innerText == '') {
            this.currentRound += 2;
            selectedDiv.innerText = gameBoardObject.player;
            this.emptySlots.splice(correspondingUserIndex, 1);
            const randomChoice = this.emptySlots[Math.floor(Math.random() * this.emptySlots.length)];
            const correspondingCompIndex = this.emptySlots.indexOf(randomChoice)

            //randomly places AI selection
           for (let i=0; i < gameBoardObject.gameBoard.length; i++) { 
                if (gameBox[i].id == randomChoice) {
                    gameBoardObject.gameBoard[i] = gameBoardObject.opponent;
                    gameBox[i].innerText = gameBoardObject.opponent;
                    this.emptySlots.splice(correspondingCompIndex, 1);
                    if (gameBoardObject.opponent == 'X') {
                        gameBox[i].style.color = '#1887db';
                    } else {
                        gameBox[i].style.color = '#e03c26';
                    }
                }
           }
        };

        // Specify color of selection, blue for 'x', red for 'o'
        if (selectedDiv.innerText == 'X') {
            selectedDiv.style.color = '#1887db';
        } else {
            selectedDiv.style.color = '#e03c26';
        }

        //connects DOM to gameboard array && alternates rounds w/ round counter
        for (let i=0; i < gameBoardObject.gameBoard.length; i++) {
            if (i === selectedDivId && gameBoardObject.gameBoard[i] == '' && this.compChoice == '' && this.currentRound % 2 !== 0) {
                this.gameBoard[i] = this.player;
            } else if (i === selectedDivId && gameBoardObject.gameBoard[i] == '' && this.compChoice == '') {
                this.gameBoard[i] = this.opponent;
            } else if (i === selectedDivId && this.compChoice !== '' && this.currentRound % 2 == 0) {
                this.gameBoard[i] = this.player; 
            }
        }
        displayController.detectWinner();
    },
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
    computerOpponent: function () {
        gameBoardObject.compChoice = 'AI'
    },
    winConditions: [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]],
    detectWinner: function() {
        const boardArray = gameBoardObject.gameBoard;
        const gameOutcome = document.getElementById('gameOutcome');
        this.winConditions.forEach(i=>{
            if (gameBoardObject.emptySlots.length === 0 && gameBoardObject.winner == '') {
                gameOutcome.innerText = "It's a tie.";
                document.getElementById('newGame').style.display = 'flex';  
            }
            else if (boardArray[i[0]].length > 0 && boardArray[i[0]] === boardArray[i[1]] && boardArray[i[1]] === boardArray[i[2]]) {
                gameBoardObject.winner = `${boardArray[i[0]]}`;
                document.getElementById('newGame').style.display = 'flex';  
                
                if (gameBoardObject.winner == gameBoardObject.player && gameBoardObject.compChoice == '' && gameOutcome.innerText == '') {
                    gameOutcome.innerText = `Player 1 wins!`;
                } else if (gameBoardObject.winner == gameBoardObject.opponent && gameBoardObject.compChoice == '' && gameOutcome.innerText == '') {
                    gameOutcome.innerText = `Player 2 wins!`; 
                } else if (gameBoardObject.winner == gameBoardObject.player && gameOutcome.innerText == '') {
                    gameOutcome.innerText = `Human wins!`;
                } else if (gameBoardObject.winner == gameBoardObject.opponent && gameOutcome.innerText == '') {
                    gameOutcome.innerText = `Computer wins!`;
                } else if (gameBoardObject.emptySlots.length === 0 && gameBoardObject.winner == '') {
                    gameOutcome.innerText = "It's a tie.";
                    document.getElementById('newGame').style.display = 'flex'; 
                } 
            }
        })
    },
    newGame: function() {
        for (let i=0; i < gameBox.length; i++) {
            gameBox[i].innerText = '';
            gameBox[i].style.color = '';
        };
        gameBoardObject.gameBoard = ['','','',
                        '','','',
                        '','','']; 
        gameBoardObject.emptySlots = [0,1,2,3,4,5,6,7,8];  
        gameBoardObject.player = '';
        gameBoardObject.opponent = '';
        gameBoardObject.currentRound = 0;  
        gameBoardObject.winner = '';  
        gameBoardObject.compChoice = '';
        document.getElementById('playerSelectX').style.display = 'flex';
        document.getElementById('playerSelectO').style.display = 'flex';
        document.getElementById('startGame').style.display = 'flex';
        document.getElementById('computerOpponent').style.display = 'initial';
        document.getElementById('newGame').style.display = 'none';
        gameOutcome.innerText = '';
        document.getElementById('gameDisplay').style.display = 'none';
    }, 
    hideOnLoad: window.onload = function () {
        document.getElementById('gameDisplay').style.display = 'none';
        document.getElementById('newGame').style.display = 'none';
    },
    showGrid: function () {
        if (gameBoardObject.player !== '' && gameBoardObject.opponent !== '') {
            document.getElementById('playerSelectX').style.display = 'none';
            document.getElementById('playerSelectO').style.display = 'none';
            document.getElementById('startGame').style.display = 'none'
            document.getElementById('computerOpponent').style.display = 'none';
            document.getElementById('gameDisplay').style.display = 'flex';
        }
    },
}