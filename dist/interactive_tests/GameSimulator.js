"use strict";
exports.__esModule = true;
var Game_1 = require("../Game");
var numberOfMovesToSimulate = 1000;
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
        pieces = game.getPieces();
        while (!moveFound && moveLookCounter < 1000) {
            var randomPieceNum = Math.floor(Math.random() * pieces.length);
            piece = pieces[randomPieceNum];
            var possibleMoves = game.getPossibleMovesForPieceAtSpace(piece.getPosition());
            if (possibleMoves.length == 0) {
                moveLookCounter++;
                continue;
            }
            for (var i = 0; i < possibleMoves.length; i++) {
            }
            moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveFound = true;
            moveLookCounter++;
        }
        var moveSuccessful = game.move(piece.getPosition(), moveSpace);
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
        else if (game.getCheck()) {
            console.log("CHECK!");
        }
    }
    game.printBoardStateToConsole();
}
//# sourceMappingURL=GameSimulator.js.map