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
var testCorneredKing = [
    new King_1.King("White", 1, 1, 1),
    new Pawn_1.Pawn("Black", 1, 3, 1),
    new Pawn_1.Pawn("Black", 2, 3, 1),
    new Pawn_1.Pawn("Black", 3, 3, 1),
    new Pawn_1.Pawn("Black", 1, 3, 2),
    new Pawn_1.Pawn("Black", 2, 2, 2),
    new Pawn_1.Pawn("Black", 3, 2, 2),
    // new Queen("Black", 1, 1, 3),
    // new Queen("Black", 2, 1, 3),
    // new Queen("Black", 3, 1, 3),
    // new Queen("Black", 4, 1, 3),
    // new Queen("Black", 5, 1, 3),
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
function getInputFromUser(message) {
    var readlineSync = require("readline-sync");
    return readlineSync.question(message);
}
var game = new Game_1.Game();
game.setPieces(testCorneredKing);
// game.setPreviousMoveCreatedCheck(true);
// console.log("you entered: " + getInputFromUser("enter something "));
consoleGame();
// simulateGame(1000);
// testSpecificMove(111, 121);
function consoleGame() {
    console.log("Welcome to 3D chess on the console.");
    var endOfGame = false;
    while (!endOfGame) {
        dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "Here is the board after " + game.board.getMoveCount() + " moves");
        console.log(game.getWhoseTurnItIs() + "'s turn.");
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
            if (game.checkMate == true) {
                console.log("CHECKMATE!");
                endOfGame = true;
            }
            else if (game.thereIsCheck) {
                console.log("Check!");
            }
            else if (game.stalemate == true) {
                console.log("STALEMATE, DRAW!");
                endOfGame = true;
            }
            // if move successful update board, messages (check, stalemate, checkmate) move number, previous moves on user interface
        }
    }
}
// let blackPieces = game.getBlackPieces();
// let whitePieces = game.getWhitePieces();
// displayPieces("black pieces: ", blackPieces);
// displayPieces("white pieces: ", blackPieces);
// let testPawn = new Pawn("White", 1, 2, 2);
// let moveSpace = new Position(1, 2, 3);
//testSpecificMove(testPawn, moveSpace);
// test pawn at 245 to 235
// let testPawn = new Pawn("Black", 2, 4, 5);
// let moveSpace = new Position(2, 3, 5);
// testSpecificMove(testPawn, moveSpace);
// console.log("test piece can move to 122" + testPawn.canMoveTo(moveSpace));
//dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "initial board state:");
// TODO debug queen
// let blackQueen = new Queen("Black", 4, 5, 5);
// let whitePawn = new Pawn("White", 1, 2, 2);
// const testPiece1 = new Rook("White", 3, 3, 3);
// console.log("initial: " + testPiece1.getPostionString());
// let testPiece = new Knight("Black", 2, 5, 5);
// printPossibleMovesForPiece(testPiece);
// let pos = new Position(1, 2, 2);
// console.log("white pawn can move to " + whitePawn.canMoveTo(pos));
// pieces = game.getWhitePieces();
// console.log("testing piece: " + getPieceNotation(pieces[0]));
// testPiecePossibleMove(pieces[0]);
// function testPiecePossibleMove(a: Piece, moveSpace: Postion) {
//     console.log(game.moveIsLegalDebug(a, moveSpace));
// }
function printPossibleMovesForPiece(p) {
    console.log("after call: " + p.getPostionString());
    var possibleMoves = [];
    possibleMoves = game.getPossibleMovesForPiece(p);
    console.log("after call to get possible moves: " + p.getPostionString());
    console.log("listing possible moves for: " + getPieceNotation(p) + " at location " + p.getPostionString());
    for (var i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].getPostionString());
    }
}
function testSpecificMove(a, b) {
    console.log("Testing move:" + " " + a.getPostionString() + " to " + b.getPostionString());
    var moveSuccessful = game.move(a.getPosition(), b);
    console.log("move successful: " + moveSuccessful);
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "board state after move: " + a.getPostionString() + " to " + b.getPostionString());
}
function dispalyBoardState(whitePieces, blackPieces, message) {
    console.log(whitePieces.length + " white pieces");
    console.log(blackPieces.length + " black pieces");
    console.log(message);
    var boardArray;
    boardArray = [];
    // console.log(boardArray[0][0][0]);
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
function simulateGame(maxMoves) {
    var endOfGame = false;
    var pieces = [];
    var piece;
    var moveSpace;
    var iterationCount = 0;
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "initial board state:");
    while (!endOfGame && iterationCount < maxMoves) {
        pieces = game.getPiecesByColor(game.getWhoseTurnItIs());
        var moveFound = false;
        var moveLookCounter = 0;
        while (!moveFound || moveLookCounter < 100) {
            //if (!game.thereIsCheck) {
            var randomPieceNum = Math.floor(Math.random() * pieces.length);
            // console.log("random number: " + randomPieceNum);
            // console.log("random piece "  + getPieceNotation(pieces[randomPieceNum]) + " located at: " + pieces[randomPieceNum].getPostionString());
            piece = pieces[randomPieceNum];
            // }
            //else {
            // find a move that stops the check
            // 
            //}
            var possibleMoves = game.getPossibleMovesForPiece(piece);
            // console.log("number of moves from position: " + piece.getPostionString() + ": " + possibleMoves.length);
            if (possibleMoves.length == 0) {
                moveLookCounter++;
                continue; // try with different piece
            }
            moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveFound = true;
            moveLookCounter++;
        }
        // if (!moveFound) {
        //     endOfGame = true;
        //     break;
        // }
        var moveSuccessful = game.move(piece.getPosition(), moveSpace);
        console.log("move successful: " + moveSuccessful + " " + game.board.getMoveCount() + " " + piece.getPostionString() + " to " + moveSpace.getPostionString());
        if (!moveSuccessful) {
            continue;
        }
        dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "board state after " + game.board.getMoveCount() + " moves:");
        iterationCount++;
        console.log("iteration count: " + iterationCount);
        if (game.checkMate == true) {
            console.log("CHECKMATE!");
            endOfGame = true;
        }
        else if (game.stalemate == true) {
            console.log("STALEMATE, DRAW!");
            endOfGame = true;
        }
    }
}
function getPieceNotation(piece) {
    if (piece.isWhite()) {
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
    } // else black
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
// validates proper space
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
