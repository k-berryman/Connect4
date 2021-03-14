/** Connect Four
 *  Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 *  column until a player gets four-in-a-row (horiz, vert, or diag) or until
 *  board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let a=0; a < HEIGHT; a++) 
  {
  	let tempArr= [];
    
    for(let b=0; b < WIDTH; b++) 
    {
    	tempArr.push(null);
    }
    
    board.push(tempArr);
  }
  
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById("board");

  // create a table row
  const top = document.createElement("tr");
  
  // setting table row id to column-top
  top.setAttribute("id", "column-top");
  
  // when there's a click in table row "top" 
  // run function handleClick
  top.addEventListener("click", handleClick);

  // loop through board width
  for (let x = 0; x < WIDTH; x++) 
  {
    // create table data named headCell
    const headCell = document.createElement("td");
    
    // set headCell id to x, which is 0 - WIDTH-1
    headCell.setAttribute("id", x);
    
    // adds headCell to / under top
    top.append(headCell);
  }
  
  // adds top to board
  htmlBoard.append(top);

  // loop through board height
  for (let y = 0; y < HEIGHT; y++) 
  {
  	// create table row named row
    const row = document.createElement("tr");
    
    // loop through board width
    for (let x = 0; x < WIDTH; x++) 
    {
    	// create table data named cell
      const cell = document.createElement("td");
      
      // set cell id to heightNum-widthNum
      cell.setAttribute("id", `${y}-${x}`);
      
      // add cell to row
      row.append(cell);
    }
    
    // add row to board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) 
{
	//x.find(function(cell) {
    //return cell !== null - 1;
 // })
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) 
{
  // TODO: make a div and insert into correct table cell
  // HOW DO I INSERT INTO CORRECT TABLE CELL
  
  // create div
  const targetCell = document.getElementById(`${y}-${x}`);

  // add class piece to div
  targetCell.classList.add("piece");
  
  // adds current player class
  if(currPlayer === 1) {
    targetCell.classList.add("p1");
  }
  
  if(currPlayer === 2) {
    targetCell.classList.add("p2");
  }
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
	

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1) {
  	currPlayer = 2;
  }
  
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
