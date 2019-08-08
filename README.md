# ch3ss_logic

**Project description:** This repo is part of a team project to build an online 3D chess game.  It is 3D chess in the sense that the board has 3 dimensions instead of the normal 2.  We settled on using Raumschach chess rules which include using a 5x5x5 board. The game starts with a total of 40 pieces, 20 per player. All the pieces can move in three dimensions but not necessarily in the same turn. Overall Raumscach pieces move similarly to regular chess pieces in two of the three dimensions. There is also an additional piece called a unicorn that must move the same distance in all three dimensions, which can be described as moving through the corners of a cube (vs Bishops moving through edges of a cube). In Raumschach chess there is queening of the pawn if it reaches the two back rows of the opponent but there is no en passant or castling. This is a useful website for more information: https://www.chessvariants.com/3d.dir/3d5.html

**Purpose:** We're big fans of chess so we thought the idea of playing in three dimensions was really cool. We also thought that using a computer to do the move validation and provide possible moves would help players conceptualizate the board and make the game easier to play. We tried to implement some flexibility so that others could experiment with the rules.  

## Design

This project was created using object-oriented design. These are the main classes and their main functions:  

**Position:** Represents a space in 3D and has an x, y, and z coordinate.  Can tell how far it is from another position.  

**Piece:** Interface that each specific piece class (King, Pawn, Bishop, etc) implements.  Has a color and a position. Each piece type knows what move shape it can execute, such as a Knight can go 2 spaces in one coordinate axis, 1 space in another, 0 spaces in the third. Piece does not know any other rules of game such as if it can jump over another piece like the Knight.  

**Board:** Knows dimensions of board. Has an array of Pieces which represents the arrragement of pieces on the board (essentially a sparse array as there are no empty pieces/spaces). Board knows the mechanical rules of chess, such as movement rules, queening, and determining if a piece is in the way of a move (if not a Knight). Can determine if a player's King is in check but doesn't know how that impacts the game.   

**Game:** Determines whose turn it is. Has a history of moves which represent the current state of the game. Has a board which represents what array of pieces should be displayed to the users (if the player wants to show a different state, such as looking at a previous move). Determines if a potential move can create a legal game state, for example making sure a player doesn't move his own king into check (illegal). Uses this logic to determine possible moves for a given space(piece at that space), which includes consideration for whose turn it is (no possible moves if piece is wrong color). Determines if player has no possible moves and is not in check (results in stalemate/draw). Option provided to offer takebacks and to save/load game from file. Option provided for getting an array of pieces taken off the board. Option provided for showing users previous board state with forward/backward methods.  

**Implementation:** Game g = new Game(gameIdNumber), g.move(Position a, Position b), g.getPossibleMoves(Position a), g.getCheckMate(), etc. See below for details on use and deployment.  

### A suggestion for playing 3D chess
 When playing 3D chess it might be easier to first think of the differences in coordinate axis values for conceptualizing a possible move rather than imagining the relationship of two spaces to each other visually.  For example,a player might know that a Knight at 333 can move to 534 without thinking too hard because the final x is a change of 2, y is a change of 0, and z is a change of 1 (which is a combination of one 0, one 1, and one 2). This math is probably easier to do than thinking about the start space as being in the middle of the board and then thinking about what the space 534 would look like relative to that starting space. The visual relationship of two spaces is important, especially when considering what other pieces are nearby, but should probably be considered after the coordinate distance relationship.  

## Using the project

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**download node:** https://nodejs.org/en/download/
**install npm, typescript, lab:**
```
npm install npm@latest -g;
npm install -g typescript;
npm install --save-dev lab -g
```

### Build process

npm run build

## Running the tests
```
npm run build; lab ./dist/tests/     // tests all the methods in the project
npm run build; node dist/interactive_tests/GameSimulator.js  // runs game simulator
```
Note: GameSimulator is experimental and only moves randomly, it is not meant to be a game engine.  It will print the board to the console much like the ConsoleGame.ts.  Notation for printing out to the console can be adjusted in DisplayBoard2D.ts

## Deployment
#### Two options: playing in the console or using Game object in your own project

### Console Game:
npm run build; node dist/interactive_tests/ConsoleGame.js

### Game.js object use psedocode
Download repo and instantiate a Game object in your own project
```
Game game = new Game(1)  //Game takes a game ID number
```
#### Getting list of pieces to display on board
```
pieces: Piece[] = game.getPieces();
for (piece in pieces) {
    x = piece.getX(), y = piece.getY(), z = piece.getZ()
}
```
#### Moving a piece:
Get two strings from the user representing spaces for moving a piece at space a to space b
An example would be 111 to 222 (through corner of space cubve move and valid for Kings, Queens, and Unicorn).  User should not enter commas.
```
string a = input1
string b = input2
// validate spaces: 
if (game.isValidSpaceFromString(a)) && game.isValidSpaceFromString(a)
    game.isValidSpaceFromString(b)) && game.isValidSpaceFromString(b)) {
    // execute move
     boolean executed = game.move(game.getPositionFromString(a), game.getPositionFromString(b)); 
} 
if (!executed) { 
    message to user "move invalid" 
} 
```
#### Check for check, checkmate, stalemate and show message to users
```
if (executed) { 
    if (game.getCheckMate()) { 
        message to users : "checkmate, Player (whoever's turn it is) wins" 
    } 
    else if (game.getStalemate()) { 
        message to users : "checkmate, Player (whoever's turn it is) wins" 
    } 
    else if (game.getCheck()) { 
        message to users: "Check" 
    } 
}
```
#### Get possible moves for piece at space 
```
// get space from user text box make sure it is a valid space 
if (game.isValidSpaceFromString(input)) {
    moves = game.getPossibleMovesForPieceAtSpace(input)  // returns an array
}
```
this get possible moves method will only return valid moves after considering whose turn it is and if it does not put the player whose turn it is into check (illegal in chess)

### Get whose turn it is 
```
string for black or white = game.getWhoseTurnItIs();
```
### Get move history 
```
moves = game.getMoveHistory(); 
for (var i = 0; i < moveHistory.length; i++) { 
    string space = moves[i].getPositionString(); 
    if (i % 4 == 0) { 
        moves[i] is space A White 
    } 
    if (i % 4 == 1) { 
        moves[i] is space B White 
    } 
    if (i % 4 == 2) { 
        moves[i] is space A Black 
    } 
    if (i % 4 == 3) { 
        moves[i] is space B Black 
    }
}
```
### Load/Save Game
```
filename: string = "./game1.json"
game.saveGameToFile(filename);
game.loadGameFromFile("./game1.json");
```
### Take Back A Move
```
game.takeBackLastMove();
```
### View Previous/Next Board Position
Cycles through board states without changing the move history (the record of what has happened in the game).  Move can be called even if the board is in a previous state, will return to present state before the move is executed. However, getPossibleMoves for present state won't work until board state returned. Possible moves will work for previous state, whatever the user can see.
```
game.changeBoardStateNumberMoves(-1)  // -1 is back one move
game.changeBoardStateNumberMoves(1)  // 1 is forward one move
game.setBoardToAfterAllMoves()      // returns board to after all moves (optional for users but necessary for getting possible moves for present)
```

## Built With

* [Typescript](https://www.typescriptlang.org/) 

## Authors

* **Jon Rahoi** - project sponsor
* **Frederick Lough** - member of team responsible for coding game logic


<!-- ## License -->
