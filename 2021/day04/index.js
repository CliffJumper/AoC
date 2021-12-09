let fs = require("fs");
const { exit } = require("process");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const read_file_lines = (filename) =>
  fs.readFileSync(filename).toString("utf8").split("\n");

const lines = read_file_lines(process.argv[2]);
const draws = lines[0];
const boards = lines.slice(1);

class board {
  constructor() {
    this.has_bingo = 0;
    this.board= [];
  }
  add_to_board(line) {
    this.board.push(line);
  }
}

// TODO: Make this convert to ints
const splitBoards = (board_list) => {
  let board_obj_array = [];
  // let index = 0;
  let current_board = new board();
  for (const board_line of board_list) {
    // console.log(`index: ${index} and board: ${board}`);
    // index++;
    if (board_line === "") {
      console.log("Found Board Break");
      if(current_board.board.length != 0) {
        board_obj_array.push(current_board);
        current_board = new board()
      }
      continue;
    } else {
      current_board.add_to_board(board_line);
    }
  }
  // console.log(board_obj_array);
  // console.log(`Number of boards: ${board_obj_array.length}`);
};

// TODO: Use math.js to handle matrix ops
const check_boards = (the_board) => {
  // check rows

  // check columns
}

const set_draw_in_board = (draw, board_list) => {

}

console.log(`draws: ${draws}`);
console.log(`boards: ${boards[1]}`);
splitBoards(boards);
