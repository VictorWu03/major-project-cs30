// Victor Wu
//2D - Grid assignemtn
// 10/1/2020
//GOMOKU:
//The goal of the game is to connect 5 in a row
//extra for experts: 
// I implemented code to actively check the state of each cell in the 2d array in relation to the other cells around it (check for 5 in a row feature).
// Additionally, I also included numerous interface features such as the win display and buttons
// I am intending on further expanding on this to create an ai the human can play against where the program is able to evaluate current board states and determine the best move.

let state = "menu";

let cellSize;
const BOARDDIMENSION = 18; // visable grid displayed on the board
const PLAYDIMENSION = 19; // invisable grid to place pieces on

let centerBoardX;
let centerBoardY;
let centerPlayX;
let centerPlayY;

let board = [];

let currentMove = "black";
let winner;

function setup() {
  createCanvas(windowWidth, windowHeight);

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
}

function draw() {
  displayMenu();

  restart();
  returnToMenu();
  playerTurnBar();

  checkWin();
  displayWin();
}

//menu interface - switching between the states of menu and game
function keyPressed() {
  if (key === "s") {
    gameSetup();
    state = "play";
  }
}

//setting up the display board and the play board for the game
function gameSetup() {
  background(218, 184, 136);
  displayBoard();
  generatePlayBoard();
  currentMove = "black";
  state = "play";
}

//Winner message
function displayWin() {
  if (state === "win") {
    if (winner === "W"){
      //winner message - white
      fill(255, 255, 255, 10);
      // rectMode(CENTER);
      rect(width/2 - width * 0.3, height/2 - height * 0.25/2, width * 0.6, height * 0.25);
      fill("black");
      textSize(width * 0.05);
      textAlign(CENTER, CENTER);
      text("White Wins", width/2, height/2);
    }

    else if (winner === "B") {
      //winner message - black
      fill(0, 0, 0, 10);
      // rectMode(CENTER);
      rect(width/2 - width * 0.3, height/2 - height * 0.25/2, width * 0.6, height * 0.25);
      fill("white");
      textSize(width * 0.05);
      textAlign(CENTER, CENTER);
      text("Black Wins", width/2, height/2);
    }
  }
}

//restart button to reset game
function restart() {
  if (state === "win" || state === "play") {
    fill("black");
    rect(width * 0.8, height * 0.8, width*0.15, height * 0.1);
    fill("white");
    textSize(width * 0.02);
    text("Restart", width * 0.8 + width*0.15/2, height * 0.8 + height * 0.1/2);

    if (mouseX > width * 0.8 && mouseX < width * 0.8 + width*0.15 && mouseY >  height * 0.8 && mouseY <  height * 0.8 + height * 0.1) {
      fill("white");
      rect(width * 0.8, height * 0.8, width*0.15, height * 0.1);
      fill("black");
      text("Restart", width * 0.8 + width*0.15/2, height * 0.8 + height * 0.1/2);

      if(mouseIsPressed) {
        gameSetup();
      }
    }
  }
}

//button to return to the main menu/start screen
function returnToMenu() {
  if (state === "win" || state === "play") {
    fill("black");
    rect(width * 0.8, height * 0.7, width*0.15, height * 0.1);
    fill("white");
    textSize(width * 0.02);
    text("Home", width * 0.8 + width*0.15/2, height * 0.7 + height * 0.1/2);

    if (mouseX > width * 0.8 && mouseX < width * 0.8 + width*0.15 && mouseY >  height * 0.7 && mouseY <  height * 0.7 + height * 0.1) {
      fill("white");
      rect(width * 0.8, height * 0.7, width*0.15, height * 0.1);
      fill("black");
      text("Home", width * 0.8 + width*0.15/2, height * 0.7 + height * 0.1/2);

      if(mouseIsPressed) {
        state = "menu";
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//game elements
//main menu display
function displayMenu() {
  if (state === "menu") {
    background(0);
    fill("white");
    textSize(width * 0.02);
    textAlign(CENTER, CENTER);
    text("GOMOKU", width/2, height/3);
    text("press 's' to start a game. The goal is to connect 5 in a row.", width/2, height/2);
  }
}

//UI bar to display which turn it is: black or white
function playerTurnBar() {
  if (state === "play" || state === "win") {
    fill(currentMove);
    rect(centerBoardX, height * 0.98, cellSize * BOARDDIMENSION, height * 0.01);
  }
}

//displaying the VISABLE playing board 
function displayBoard() {
  background(218, 184, 136);
  for (let x = 0; x < BOARDDIMENSION; x ++) {
    for (let y = 0; y < BOARDDIMENSION; y ++) {
      stroke(0);
      noFill();
      square(cellSize * x + centerBoardX, cellSize * y + centerBoardY, cellSize);
    }
  }
}

//generating board/2d array for play pieces to appear on and store game information i.e. what color occupies a cell - this grid is not visable. 
function generatePlayBoard() {
  board = [];
  for (let x = 0; x < PLAYDIMENSION; x ++) {
    board.push([]);
    for (let y = 0; y < PLAYDIMENSION; y ++) {
      noStroke();
      noFill();
      square(cellSize * x + centerPlayX, cellSize * y + centerPlayY, cellSize); //dimensions accounting for centering of the grid
      board[x].push(null);
    }
  }
  return board;
}

//placing playing pieces when the mouse is pressed
function mousePressed() {
  if (state === "play") {
    // corX and corY adjusting for the centered grid
    let corX = floor(mouseX/cellSize - centerPlayX/cellSize); 
    let corY = floor(mouseY/cellSize - centerPlayY/cellSize);
    placeMarker(corX, corY);
    console.log(corX, corY);
  }
}

//saving information of current cell i.e. black, white, and null into the 2D-array when the mouse is pressed. This also displays the game piece.
function placeMarker(x, y) {
  if (board[y][x] === null) {
    if (currentMove === "white") {
      board[y][x] = "W";
      fill(currentMove);
      //drawing circle in cell accounting for padding
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "black";
    }
    else {
      board[y][x] = "B";
      fill(currentMove);
      //drawing circle in cell accounting for padding
      circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
      currentMove = "white";
    }
  }
  return board;
}

//Checking for 5 in a row;
function checkWin() {
  if (state === "play") {
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] !== null) {
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if ((board[y][x] === board[y][x + 1]) && (board[y][x] === board[y][x + 2]) && (board[y][x] === board[y][x + 3]) && (board[y][x] === board[y][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //vertical
          if (y < board.length - 4) { //checking boundaries 
            if ((board[y][x] === board[y + 1][x]) && (board[y][x] === board[y + 2][x]) && (board[y][x] === board[y + 3][x]) && (board[y][x] === board[y + 4][x])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal down-right
          if (y < board.length - 4 && x < board.length - 4) { //checking boundaries 
            if ((board[y][x] === board[y + 1][x + 1]) && (board[y][x] === board[y + 2][x + 2]) && (board[y][x] === board[y + 3][x + 3]) && (board[y][x] === board[y + 4][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal up-right
          if (x < board.length - 4 && y > 3) { //checking boundaries 
            if ((board[y][x] === board[y - 1][x + 1]) && (board[y][x] === board[y - 2][x + 2]) && (board[y][x] === board[y - 3][x + 3]) && (board[y][x] === board[y - 4][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
        }
      }
    }
  }
}