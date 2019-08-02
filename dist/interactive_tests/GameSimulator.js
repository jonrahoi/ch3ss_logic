"use strict";
exports.__esModule = true;
var Game_1 = require("../Game");
var numberOfMovesToSimulate = 100;
var game = new Game_1.Game(1);
simulateGame(numberOfMovesToSimulate);
function simulateGame(maxMoves) {
    var endOfGame = false;
    var pieces = [];
    var piece;
    var moveSpace;
    var moveIterationCount = 1;
    game.printBoardStateToConsole();
    while (!endOfGame && moveIterationCount < maxMoves) {
        var moveFound = false;
        var moveLookCounter = 0;
        while (!moveFound && moveLookCounter < 1000) {
            var randomPieceNum = Math.floor(Math.random() * pieces.length);
            console.log("random piece located at: " + pieces[randomPieceNum].getPostionString());
            piece = pieces[randomPieceNum];
            var possibleMoves = game.getPossibleMovesForPieceAtSpace(piece.getPosition());
            console.log("number of moves from position: " + piece.getPostionString() + ": " + possibleMoves.length);
            if (possibleMoves.length == 0) {
                moveLookCounter++;
                continue;
            }
            console.log("possible moves: ");
            for (var i = 0; i < possibleMoves.length; i++) {
                console.log(possibleMoves[i].getPostionString());
            }
            console.log();
            moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveFound = true;
            moveLookCounter++;
        }
        console.log("trying move piece at " + piece.getPostionString(), " to ", moveSpace.getPostionString());
        var moveSuccessful = game.move(piece.getPosition(), moveSpace);
        console.log("move successful: " + moveSuccessful + ", " + game.getMoveCount() + " move count, ", "piece at " + piece.getPostionString());
        game.printBoardStateToConsole();
        moveIterationCount++;
        console.log("move count: " + moveIterationCount);
        if (game.getCheckMate()) {
            console.log("CHECKMATE!");
            endOfGame = true;
            break;
        }
        else if (game.getStaleMate()) {
            console.log("STALEMATE, DRAW!");
            endOfGame = true;
            break;
        }
    }
}
//# sourceMappingURL=GameSimulator.js.map