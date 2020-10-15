// Gomoku
// 10/1/2020 - 

let state = "menu";

let cellSize;
const BOARDDIMENSION = 18; // visable grid displayed on the board
const PLAYDIMENSION = 19; // invisable grid to place pieces on

let centerBoardX;
let centerBoardY;
let centerPlayX;
let centerPlayY;

let board = [];

let currentMove = "white";

let winner;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(218, 184, 136); //Wooden board color

  if (windowWidth <= windowHeight) {
    cellSize = windowWidth / 20;
  }
  else {
    cellSize = windowHeight / 20;
  }
  
  //determining the padding distance to center the grid
  centerBoardX = (windowWidth - cellSize * BOARDDIMENSION) /2;
  centerBoardY = (windowHeight - cellSize * BOARDDIMENSION) /2;

  // determining the padding distance is center the playing grid
  centerPlayX = (windowWidth - cellSize * PLAYDIMENSION) /2;
  centerPlayY = (windowHeight - cellSize * PLAYDIMENSION) /2;
  displayBoard();
  generatePlayBoard();
}


function draw() {
  checkWin();
}

function displayBoard() {
  for (let x = 0; x < BOARDDIMENSION; x ++) {
    for (let y = 0; y < BOARDDIMENSION; y ++) {
      stroke(0);
      noFill();
      square(cellSize * x + centerBoardX, cellSize * y + centerBoardY, cellSize);
    }
  }
}

function generatePlayBoard() {
  for (let x = 0; x < PLAYDIMENSION; x ++) {
    board.push([]);
    for (let y = 0; y < PLAYDIMENSION; y ++) {
      noStroke();
      noFill();
      square(cellSize * x + centerPlayX, cellSize * y + centerPlayY, cellSize);
      board[x].push(null);
    }
  }
  return board;
}

function mousePressed() {
  // corX and corY adjusting for the centered grid
  let corX = floor(mouseX/cellSize - centerPlayX/cellSize); 
  let corY = floor(mouseY/cellSize - centerPlayY/cellSize);
  placeMarker(corX, corY);
  console.log(corX, corY);
}

function placeMarker(x, y) {
  if (board[y][x] === null) {
    if (currentMove === "white") {
      board[y][x] = "W";
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
    }
    else {
      board[y][x] = "B";
      fill(currentMove);
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
    }
  }

  return board;

}

function checkWin() {
  //horozontal
  for(let x = 0; x < board.length; x ++) {
    for (let y = 0; y < board.length; y ++) {
      if (board[y][x] !== null) {
        //horozontal
        if (x < board.length - 4) { //checking boundaries 
          if ((board[y][x] === board[y][x + 1]) && (board[y][x] === board[y][x + 2]) && (board[y][x] === board[y][x + 3]) && (board[y][x] === board[y][x + 4])) {
            winner = board[y][x];
            return winner;
          }
        }
        //vertical
        if (y < board.length - 4) {
          if ((board[y][x] === board[y + 1][x]) && (board[y][x] === board[y + 2][x]) && (board[y][x] === board[y + 3][x]) && (board[y][x] === board[y + 4][x])) {
            winner = board[y][x];
            return winner;
          }
        }
        //diagonal down-right
        if (y < board.length - 4 && x < board.length - 4) {
          if ((board[y][x] === board[y + 1][x + 1]) && (board[y][x] === board[y + 2][x + 2]) && (board[y][x] === board[y + 3][x + 3]) && (board[y][x] === board[y + 4][x + 4])) {
            winner = board[y][x];
            return winner;
          }
        }
        //diagonal up-right
        if (x < board.length - 4 && y > 3) {
          if ((board[y][x] === board[y - 1][x + 1]) && (board[y][x] === board[y - 2][x + 2]) && (board[y][x] === board[y - 3][x + 3]) && (board[y][x] === board[y - 4][x + 4])) {
            winner = board[y][x];
            return winner;
          }
        }
      }
    }
  }
}
