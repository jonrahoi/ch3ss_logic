# ch3ss_logic

project description:


## Build process

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

download node: https://nodejs.org/en/download/
install npm: npm install npm@latest -g
install typescript: npm install -g typescript

### Build process

npm run build; node dist/interactive_tests/ConsoleGame.js

## Running the tests

npm run build; lab ./dist/tests/

interactive_tests/GameSimulator is experiemental and only moves randomly, it is not meant to be a game engine.  It will print the board to the console much like the ConsoleGame.ts

## Deployment
Two options: playing in the console or using Game object in your own project.

###Console Game:
npm run build; node dist/interactive_tests/ConsoleGame.js

### Psedocode fow how to use the Game.js object
Alternatively clone repo and instantiate a Game object in your own project

Game game = new Game(1)  //Game takes a game ID number

#### Moving a piece:
get two string from the user representing spaces for moving a piece at space a to space b
An example would be 111 to 222.  User should not enter commas.
string a = input1
string b = input2
if (game.isValidSpaceFromString(a)) && game.isValidSpaceFromString(a)
    game.isValidSpaceFromString(b)) && game.isValidSpaceFromString(b)) {
     boolean: executed = game.move(game.getPositionFromString(a), game.getPositionFromString(b)); 
} 
if (!executed) { 
    message to user "move invalid" 
} 
##### Check for check, checkmate, stalemate and show message to users
if (executed) { 
    if (game.getCheckMate()) { 
        message to users : "checkmate, Player (whoever's turn it is wins)" 
    } 
    else if (game.getStalemate()) { 
        message to users : "checkmate, Player (whoever's turn it is wins)" 
    } 
    else if (game.getCheck()) { 
        message to users: "Check" 
    } 
}

#### Get possible moves for piece at space 
//get space from user text box make sure it is a valid space 
if (game.isValidSpaceFromString(input)) {
    moves = game.getPossibleMovesForPieceAtSpace(input)  // returns an array
}

this get possible moves method will only return valid moves after considering whose turn it is and if it does not put the player whose turn it is into check (illegal in chess)

### Get whose turn it is 
string for black or white = game.getWhoseTurnItIs();

### Get move history 
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

## Built With

* [Typescript](https://www.typescriptlang.org/) 

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

<!-- ## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).  -->

## Authors

* **Jon Rahoi** - sponsor of project
* **Frederick Lough** - part of team project for University of San Francisco 


<!-- ## License -->
