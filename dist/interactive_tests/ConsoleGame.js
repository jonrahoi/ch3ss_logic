"use strict";
exports.__esModule = true;
var King_1 = require("../King");
var Pawn_1 = require("../Pawn");
var Queen_1 = require("../Queen");
var Game_1 = require("../Game");
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
function getInputFromUser(message) {
    var readlineSync = require("readline-sync");
    return readlineSync.question(message);
}
var game = new Game_1.Game(1);
consoleGame();
function consoleGame() {
    console.log("Welcome to 3D chess on the console.");
    var endOfGame = false;
    while (!endOfGame) {
        console.log("move history: ");
        var moveHistory = game.getMoveHistory();
        for (var i = 0; i < moveHistory.length; i++) {
            console.log(moveHistory[i].getPostionString());
        }
        game.printBoardStateToConsole();
        console.log(game.getWhoseTurnItIs() + "'s turn.");
        var menu = +getInputFromUser("enter 1 to enter a move, 2 to get available moves: ");
        console.log("you entered: " + menu);
        if (menu == 2) {
            var space = getInputFromUser("enter your start space: ");
            if (game.isValidSpaceFromString(space)) {
                var spaces = game.getPossibleMovesForPieceAtSpace(game.getPositionFromString(space));
                console.log("available spaces");
                for (var i = 0; i < spaces.length; i++) {
                    console.log(spaces[i].getPostionString());
                }
                continue;
            }
            else {
                console.log("invalid space");
                continue;
            }
        }
        var a = getInputFromUser("enter your start space: ");
        var b = getInputFromUser("enter your end space: ");
        var posA = void 0, posB = void 0;
        if (validSpaceFromString(a) && validSpaceFromString(b)) {
            posA = game.getPositionFromString(a);
            if (!game.pieceLocatedAtBool(posA)) {
                console.log("piece not located there, enter a valid starting space");
                continue;
            }
            posB = game.getPositionFromString(b);
        }
        else {
            console.log("enter valid spaces");
            continue;
        }
        var moveSuccessful = game.move(posA, posB);
        if (moveSuccessful) {
            if (game.getCheckMate()) {
                console.log("CHECKMATE!");
                endOfGame = true;
            }
            else if (game.getCheck()) {
                console.log("Check!");
            }
            else if (game.getStaleMate() == true) {
                console.log("STALEMATE, DRAW!");
                endOfGame = true;
            }
        }
    }
}
function printPossibleMovesForPiece(p) {
    console.log("after call: " + p.getPostionString());
    var possibleMoves = [];
    possibleMoves = game.getPossibleMovesForPiece(p);
    console.log("after call to get possible moves: " + p.getPostionString());
    console.log("listing possible moves for piece at location " + p.getPostionString());
    for (var i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].getPostionString());
    }
}
function testSpecificMove(a, b) {
    console.log("Testing move:" + " " + a.getPostionString() + " to " + b.getPostionString());
    var moveSuccessful = game.move(a.getPosition(), b);
    console.log("move successful: " + moveSuccessful);
    game.printBoardStateToConsole();
}
function validSpaceFromString(str) {
    if (str.length != 3) {
        return false;
    }
    for (var i = 0; i < 3; i++) {
        if (str.charAt(i) < "1" || str.charAt(i) > "5") {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=ConsoleGame.js.map