"use strict";
exports.__esModule = true;
var Game_1 = require("../Game");
var King_1 = require("../King");
var Pawn_1 = require("../Pawn");
var Queen_1 = require("../Queen");
var numberOfMovesToSimulate = 100;
var testCorneredKing = [
    new King_1.King("White", 1, 1, 1),
    new Pawn_1.Pawn("Black", 1, 3, 1),
    new Pawn_1.Pawn("Black", 2, 3, 1),
    new Pawn_1.Pawn("Black", 3, 3, 1),
    new Pawn_1.Pawn("Black", 1, 3, 2),
    new Pawn_1.Pawn("Black", 2, 2, 2),
    new Pawn_1.Pawn("Black", 3, 2, 2),
    new Queen_1.Queen("Black", 1, 1, 3),
    new Queen_1.Queen("Black", 2, 1, 3),
    new Queen_1.Queen("Black", 3, 1, 3),
    new Queen_1.Queen("Black", 4, 1, 3),
    new Queen_1.Queen("Black", 5, 1, 3),
    new Queen_1.Queen("Black", 4, 2, 1),
    new Queen_1.Queen("Black", 4, 2, 2),
    new King_1.King("Black", 4, 1, 1),
    new Queen_1.Queen("Black", 4, 1, 2)
];
var testCorneredKingImmediateStalemate = [
    new King_1.King("White", 1, 1, 1),
    new Pawn_1.Pawn("Black", 1, 3, 1),
    new Pawn_1.Pawn("Black", 2, 2, 1),
    new Pawn_1.Pawn("Black", 3, 2, 1),
    new Pawn_1.Pawn("Black", 1, 2, 2),
    new Pawn_1.Pawn("Black", 2, 2, 2),
    new Pawn_1.Pawn("Black", 3, 2, 2),
    new King_1.King("Black", 4, 1, 1)
];
var game = new Game_1.Game(1);
game.setPieces(testCorneredKing);
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
            var possibleMoves = game.getPossibleMovesForPiece(piece);
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