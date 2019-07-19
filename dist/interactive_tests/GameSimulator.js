"use strict";
exports.__esModule = true;
var Game_1 = require("../Game");
var Knight_1 = require("../Knight");
var King_1 = require("../King");
var Bishop_1 = require("../Bishop");
var Rook_1 = require("../Rook");
var Unicorn_1 = require("../Unicorn");
var Pawn_1 = require("../Pawn");
var Queen_1 = require("../Queen");
var numberOfMovesToSimulate = 1000;
var testCorneredKing = [
    new King_1.King("White", 1, 1, 1),
    new Pawn_1.Pawn("Black", 1, 3, 1),
    new Pawn_1.Pawn("Black", 2, 3, 1),
    new Pawn_1.Pawn("Black", 3, 3, 1),
    new Pawn_1.Pawn("Black", 1, 3, 2),
    new Pawn_1.Pawn("Black", 2, 2, 2),
    new Pawn_1.Pawn("Black", 3, 2, 2),
    new Queen_1.Queen("Black", 4, 2, 1),
    new Queen_1.Queen("Black", 4, 2, 2),
    new King_1.King("Black", 4, 1, 1)
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
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "initial board state:");
    while (!endOfGame && moveIterationCount < maxMoves) {
        pieces = game.getPiecesByColor(game.getWhoseTurnItIs());
        var moveFound = false;
        var moveLookCounter = 0;
        while (!moveFound && moveLookCounter < 1000) {
            var randomPieceNum = Math.floor(Math.random() * pieces.length);
            console.log("random piece " + getPieceNotation(pieces[randomPieceNum]) + " located at: " + pieces[randomPieceNum].getPostionString());
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
        if (!game.kingsPresentOnBoardDebug()) {
            console.log("King is missing!");
            endOfGame = true;
            break;
        }
        console.log("trying move piece: " + getPieceNotation(piece), " at " + piece.getPostionString(), " to ", moveSpace.getPostionString());
        var moveSuccessful = game.move(piece.getPosition(), moveSpace);
        console.log("move successful: " + moveSuccessful + ", " + game.getMoveCount() + " move count, ", "piece: " + getPieceNotation(piece), " at " + piece.getPostionString());
        dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "board state after " + game.getMoveCount() + " moves:");
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
    function dispalyBoardState(whitePieces, blackPieces, message) {
        console.log(whitePieces.length + " white pieces");
        console.log(blackPieces.length + " black pieces");
        console.log(message);
        var boardArray;
        boardArray = [];
        for (var i = 0; i < 5; i++) {
            boardArray[i] = [];
            for (var j = 0; j < 5; j++) {
                boardArray[i][j] = [];
                for (var k = 0; k < 5; k++) {
                    boardArray[i][j][k] = new String();
                    boardArray[i][j][k] = "_____";
                }
            }
        }
        for (var i = 0; i < whitePieces.length; i++) {
            var a = whitePieces[i].getPosition();
            boardArray[a.getX() - 1][a.getY() - 1][a.getZ() - 1] = getPieceNotation(whitePieces[i]);
        }
        for (var i = 0; i < blackPieces.length; i++) {
            var b = blackPieces[i].getPosition();
            boardArray[b.getX() - 1][b.getY() - 1][b.getZ() - 1] = getPieceNotation(blackPieces[i]);
        }
        for (var z = 4; z >= 0; z--) {
            console.log("level: " + (z + 1));
            for (var y = 4; y >= 0; y--) {
                var row = "|";
                for (var x = 0; x < 5; x++) {
                    row += boardArray[x][y][z];
                    row += "|";
                }
                console.log(row);
            }
            console.log();
        }
    }
    function getPieceNotation(piece) {
        if (piece.isColor("White")) {
            if (piece instanceof Pawn_1.Pawn) {
                return "W_Pwn";
            }
            if (piece instanceof Rook_1.Rook) {
                return "W_Rok";
            }
            if (piece instanceof Knight_1.Knight) {
                return "W_Kht";
            }
            if (piece instanceof Bishop_1.Bishop) {
                return "W_Bhp";
            }
            if (piece instanceof Unicorn_1.Unicorn) {
                return "W_Uni";
            }
            if (piece instanceof Queen_1.Queen) {
                return "W_Que";
            }
            if (piece instanceof King_1.King) {
                return "W_Kng";
            }
        }
        if (piece instanceof Pawn_1.Pawn) {
            return "B_Pwn";
        }
        if (piece instanceof Rook_1.Rook) {
            return "B_Rok";
        }
        if (piece instanceof Knight_1.Knight) {
            return "B_Kht";
        }
        if (piece instanceof Bishop_1.Bishop) {
            return "B_Bhp";
        }
        if (piece instanceof Unicorn_1.Unicorn) {
            return "B_Uni";
        }
        if (piece instanceof Queen_1.Queen) {
            return "B_Que";
        }
        if (piece instanceof King_1.King) {
            return "B_Kng";
        }
    }
}
//# sourceMappingURL=GameSimulator.js.map