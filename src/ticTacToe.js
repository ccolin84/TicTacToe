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
  }

  promptUserInput() {
    // get the next move from the user
    rl.question('What do you think of Node.js? ', (answer) => {
      // TODO: Log the answer in a database
      console.log(`Thank you for your valuable feedback: ${answer}`);
    
      rl.close();
    });
  }
}