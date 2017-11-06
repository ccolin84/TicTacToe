const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Board {
  constructor() {
    this._board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
    this._turn = 1;
  }

  printBoard() {
    // print out the current board
    let boardString = '';
    this._board.forEach(row => {
      let rowString = '';
      rowString.push('---------\n');
      row.forEach(spot => {
        rowString += (spot + ' | ');
      });
      boardString.push(rowString.slice(0,-2));
      boardString.push('\n');
    });
    console.log(boardString);
    console.log(`Player ${this._turn}'s turn! ( ${this._turn === 1 ? 'X' : 'O'} )\n`);
  }

  startGame() {
    while(this.checkForWin()) {
      this.printBoard();
      this.promptUserInput();
    }
  }

  checkForWin() {
    // check to see if someone has won
    let checkRows = () => {
      for (let i = 0; i < 3; i++) {
        let row = this._board[i];
        if ((row[0] === 'X' || row[0] === 'O') && 
            (row[0] === row[1] && row[1] === row[2])) return row[0];
      }
      return false;
    }
    let checkColumns = () => {
      for (let i = 0; i < 3; i++) {
        let col = [this._board[0][i], this._board[1][i], this._board[2][i]];
        if ((col[0] === 'X' || col[0] === 'O') && 
            (col[0] === col[1] && col[1] === col[2])) return col[0];
      }
      return false;
    }
    let checkDiags = () => {
      let diagLR = [this._board[0][0], this._board[1][1], this._board[2][2]];
      let diagRL = [this._board[0][2], this._board[1][1], this._board[2][0]];
      if (this._board[0][0] === 'X' || this._board[0][0] === 'O') {
        if (this._board[0][0] === this._board[1][1] && this._board[0][0] === this._board[1][1]) {
          return this._board[0][0];
        }
      }
      if (this._board[0][2] === 'X' || this._board[0][2] === 'O') {
        if (this._board[0][2] === this._board[1][1] && this._board[2][0] === this._board[1][1]) {
          return this._board[0][2];
        }
      }
    }

    let rowsCheck = checkRows();
    let diagsCheck = checkDiags();
    let colsCheck = checkColumns();

    let winner;

    if (rowsCheck) winner = rowsCheck;
    if (checkColumns) winner = colsCheck;
    if (diagsCheck) winner = diagsCheck;

    if (winner) {
      console.log(`${winner} wins!\n`);
      return false;
    }
    return true;
  }

  enterMove(player, row, col) {
    this._board[row][col] = player;
  }

  isValidMove(player, row, col) {
    // check to make sure the user's move is valid
    if (row < 0 || row > 2) return false;
    if (col < 0 || col > 2) return false;
    let spot = this._board[row][col];
    if (spot !== '') return false;
  }

  promptUserInput() {
    // get the next move from the user
    rl.question('Enter row and column for your next move (ex: 0 0 for the top left): ', (answer) => { 
      let [row, column] = answer.trim().split(' ').map(x => Number(x));
      let user = this._turn = 1 ? 'X' : 'O';
      if (this.isValidMove(user, row, column)) {
        this.enterMove(user, row, column);
      } else {
        console.log('Invalid Move! Try again\n');
        this.promptUserInput();
      }
      rl.close();
    });
  }
}

module.exports = Board;