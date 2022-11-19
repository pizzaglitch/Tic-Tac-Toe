// To-Do: Modify game winning message 
//If playing against AI, player chooses final space: the winning space, and it (incorrectly) says its a tie


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
            console.log(selectedDivId);
            this.emptySlots.splice(correspondingUserIndex, 1);
            console.log(this.emptySlots);
            
            selectedDiv.innerText = gameBoardObject.player;
            this.currentRound += 1;
        } else if (selectedDiv.innerText == '' && compChoice == '') {    
            this.emptySlots.splice(correspondingUserIndex, 1);
            

            selectedDiv.innerText = gameBoardObject.opponent;
            this.currentRound += 1;
        } else if (compChoice !== '') {
            this.currentRound += 2;
            selectedDiv.innerText = gameBoardObject.player;
            this.emptySlots.splice(correspondingUserIndex, 1);
            const randomChoice = this.emptySlots[Math.floor(Math.random() * this.emptySlots.length)];
            const correspondingCompIndex = this.emptySlots.indexOf(randomChoice)

            // const compSelection = randomChoice();

            console.log(randomChoice);

            //randomly places selections
           for (let i=0; i < gameBoardObject.gameBoard.length; i++) { 
                    if (gameBox[i].id == randomChoice) {
                        gameBoardObject.gameBoard[i] = gameBoardObject.opponent;
                        gameBox[i].innerText = gameBoardObject.opponent;
                        this.emptySlots.splice(correspondingCompIndex, 1);
                    }
           }

        };

        // Specify color of selection, blue for 'x', red for 'o'
        if (selectedDiv.innerText == 'X' && this.player == 'X') {
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
            // else if (i === selectedDivId && compChoice !== '' && this.currentRound % 2 !== 0) {
            //     this.gameBoard[i] = this.player
            // }
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
        this.winConditions.forEach(i=>{
            if(boardArray[i[0]].length > 0 && boardArray[i[0]] === boardArray[i[1]] && boardArray[i[1]] === boardArray[i[2]] && gameBoardObject.winner == '') {
                gameBoardObject.winner = `${boardArray[i[0]]}`;
                document.getElementById('newGame').style.display = 'flex';  
                if(gameBoardObject.winner == gameBoardObject.player && gameBoardObject.compChoice == '') {
                    document.getElementById('gameOutcome').innerText = `Player 1 wins!`;
                } else if (gameBoardObject.winner == gameBoardObject.opponent && gameBoardObject.compChoice == '') {
                    document.getElementById('gameOutcome').innerText = `Player 2 wins!`; 
                } else if (gameBoardObject.winner == gameBoardObject.player) {
                    document.getElementById('gameOutcome').innerText = `Human wins!`;
                } else {
                    document.getElementById('gameOutcome').innerText = `Computer wins!`;

                }
            } else if (!boardArray.includes('') && gameBoardObject.winner == '') {
                document.getElementById('gameOutcome').innerText = "It's a tie.";
                gameBoardObject.winner = 'none';
                document.getElementById('newGame').style.display = 'flex';  
            } else if (gameBoardObject.winner !== '') {
            return
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
        document.getElementById('computerOpponent').style.display = 'flex';
        document.getElementById('newGame').style.display = 'none';
        document.getElementById('gameOutcome').innerText = '';
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