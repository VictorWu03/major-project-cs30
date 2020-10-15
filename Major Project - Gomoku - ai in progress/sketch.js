// Gomoku
// 10/1/2020 - 

let state = "menu";
let turnState = "human";

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

let whitePoints = 0;
let blackPoints = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(218, 184, 136); //Wooden board color

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
  computerMove();
}

//menu interface - switching between the states of menu and game
function keyPressed() {
  if (key === "s") {
    gameSetup();
    state = "play";
  }
}

function gameSetup() {
  background(218, 184, 136);
  displayBoard();
  generatePlayBoard();
  currentMove = "black";
  state = "play";
}

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

//restart button
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
function displayMenu() {
  if (state === "menu") {
    background(0);
    fill("white");
    textSize(width * 0.02);
    textAlign(CENTER, CENTER);
    text("GOMOKU", width/2, height/3);
    text("press 's' to start a game", width/2, height/2);
  }
}

function playerTurnBar() {
  if (state === "play" || state === "win") {
    fill(currentMove);
    rect(centerBoardX, height * 0.98, cellSize * BOARDDIMENSION, height * 0.01);
  }
}

//displaying the playing board
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

//generating board for play pieces to appear on
function generatePlayBoard() {
  board = [];
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

//placing playing pieces
function mousePressed() {
  if (state === "play" && turnState === "human") {
    // corX and corY adjusting for the centered grid
    let corX = floor(mouseX/cellSize - centerPlayX/cellSize); 
    let corY = floor(mouseY/cellSize - centerPlayY/cellSize);
    placeMarker(corX, corY);
    console.log(corX, corY);
  }
  evaluateBoardState();
  console.log(whitePoints);
  console.log(blackPoints);
}

//saving information of current cell i.e. black, white, and null into the 2D-array
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
    turnState = "computer";
    return board;
  }
}

//Checking for 5 in a row;
function checkWin() {
  if (state === "play") {
    //horozontal
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] !== null) {
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y][x + 1]) {
              if (board[y][x] === board[y][x + 2]) {
                if (board[y][x] === board[y][x + 3]) {
                  if (board[y][x] === board[y][x + 4]) {
                    winner = board[y][x];
                    state = "win";
                    return winner;
                  }
                }
              }
            }
          }
          //vertical
          if (y < board.length - 4) {
            if ((board[y][x] === board[y + 1][x]) && (board[y][x] === board[y + 2][x]) && (board[y][x] === board[y + 3][x]) && (board[y][x] === board[y + 4][x])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal down-right
          if (y < board.length - 4 && x < board.length - 4) {
            if ((board[y][x] === board[y + 1][x + 1]) && (board[y][x] === board[y + 2][x + 2]) && (board[y][x] === board[y + 3][x + 3]) && (board[y][x] === board[y + 4][x + 4])) {
              winner = board[y][x];
              state = "win";
              return winner;
            }
          }
          //diagonal up-right
          if (x < board.length - 4 && y > 3) {
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

function evaluateBoardState() {
  //consecutive
  if (state === "play") {
    //horozontal
    let consecutivePoint;
    let openSpace;

    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (board[y][x] === "white") {
          consecutivePoint = 0;
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y][x + 1]) {
              whitePoints += 10;
              if (board[y][x] === board[y][x + 2]) {
                whitePoints += 30;
                if (board[y][x] === board[y][x + 3]) {
                  whitePoints += 70;
                  if (board[y][x] === board[y][x + 4]) {
                    whitePoints += 100;
                  }
                }
              }
            }
          }
          //vertical
          if (y < board.length - 4) {
            if (board[y][x] === board[y + 1][x]) {
              whitePoints += 10;
              if (board[y][x] === board[y + 2][x]) {
                whitePoints += 30;
                if (board[y][x] === board[y + 3][x]) {
                  whitePoints += 70;
                  if (board[y][x] === board[y + 4][x]) {
                    whitePoints += 100;
                  } 
                }
              } 
            }
          }
          //diagonal down-right
          if (y < board.length - 4) {
            if (board[y][x] === board[y + 1][x + 1]) {
              whitePoints += 10;
              if (board[y][x] === board[y + 2][x + 2]) {
                whitePoints += 30;
                if (board[y][x] === board[y + 3][x + 3]) {
                  whitePoints += 70;
                  if (board[y][x] === board[y + 4][x + 4]) {
                    whitePoints += 100;
                  } 
                }
              } 
            }
          }

          //diagonal up-right
          if (y < board.length - 4) {
            if (board[y][x] === board[y - 1][x + 1]) {
              whitePoints += 10;
              if (board[y][x] === board[y - 2][x + 2]) {
                whitePoints += 30;
                if (board[y][x] === board[y - 3][x + 3]) {
                  whitePoints += 70;
                  if (board[y][x] === board[y - 4][x + 4]) {
                    whitePoints += 100;
                  } 
                }
              } 
            }
          }
        }
        if (board[y][x] === "black") {
          consecutivePoint = 0;
          //horozontal
          if (x < board.length - 4) { //checking boundaries 
            if (board[y][x] === board[y][x + 1]) {
              blackPoints += 10;
              if (board[y][x] === board[y][x + 2]) {
                blackPoints += 30;
                if (board[y][x] === board[y][x + 3]) {
                  blackPoints += 70;
                  if (board[y][x] === board[y][x + 4]) {
                    blackPoints += 100;
                  }
                }
              }
            }
          }
          //vertical
          if (y < board.length - 4) {
            if (board[y][x] === board[y + 1][x]) {
              blackPoints += 10;
              if (board[y][x] === board[y + 2][x]) {
                blackPoints += 30;
                if (board[y][x] === board[y + 3][x]) {
                  blackPoints += 70;
                  if (board[y][x] === board[y + 4][x]) {
                    blackPoints += 100;
                  } 
                }
              } 
            }
          }
          //diagonal down-right
          if (y < board.length - 4) {
            if (board[y][x] === board[y + 1][x + 1]) {
              blackPoints += 10;
              if (board[y][x] === board[y + 2][x + 2]) {
                blackPoints += 30;
                if (board[y][x] === board[y + 3][x + 3]) {
                  blackPoints += 70;
                  if (board[y][x] === board[y + 4][x + 4]) {
                    blackPoints += 100;
                  } 
                }
              } 
            }
          }

          //diagonal up-right
          if (y < board.length - 4) {
            if (board[y][x] === board[y - 1][x + 1]) {
              blackPoints += 10;
              if (board[y][x] === board[y - 2][x + 2]) {
                blackPoints += 30;
                if (board[y][x] === board[y - 3][x + 3]) {
                  blackPoints += 70;
                  if (board[y][x] === board[y - 4][x + 4]) {
                    blackPoints += 100;
                  } 
                }
              } 
            }
          }
        }
      }
    }
  }
}

function computerMove() {
  if (state === "play" && turnState === "computer") {
    for(let x = 0; x < board.length; x ++) {
      for (let y = 0; y < board.length; y ++) {
        if (currentMove === "black") {
          if (board[y][x] === null) {
            board[y][x] = "B";
            fill(currentMove);
            circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
            currentMove = "white";
            turnState = "human";
            return board;
          }
        }
        else if (currentMove === "white") {
          if (board[y][x] === null) {
            board[y][x] = "W";
            fill(currentMove);
            circle(cellSize * x + centerPlayX + cellSize/2, cellSize * y + centerPlayY + cellSize/2, cellSize * 0.85);
            currentMove = "black";
            turnState = "human";
            return board;
          }
        }
      }
    }
  }
}
