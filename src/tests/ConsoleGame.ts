import { Piece, Position, Color } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"
import Board from "../Board";

import { Game } from "../Game"


import * as readline from "readline";

const testCorneredKing = [
    new King("White", 1, 1, 1),
    new Pawn("Black", 1, 3, 1),
    new Pawn("Black", 2, 3, 1),
    new Pawn("Black", 3, 3, 1),
    new Pawn("Black", 1, 3, 2),
    new Pawn("Black", 2, 2, 2),
    new Pawn("Black", 3, 2, 2),

    // new Queen("Black", 1, 1, 3),
    // new Queen("Black", 2, 1, 3),
    // new Queen("Black", 3, 1, 3),
    // new Queen("Black", 4, 1, 3),
    // new Queen("Black", 5, 1, 3),
    new Queen("Black", 4, 2, 1),
    new Queen("Black", 4, 2, 2),
    new King("Black", 4, 1, 1)
]

const testCorneredKingImmediateStalemate = [
    new King("White", 1, 1, 1),
    new Pawn("Black", 1, 3, 1),
    new Pawn("Black", 2, 2, 1),
    new Pawn("Black", 3, 2, 1),
    new Pawn("Black", 1, 2, 2),
    new Pawn("Black", 2, 2, 2),
    new Pawn("Black", 3, 2, 2),
    new King("Black", 4, 1, 1)
]

function getInputFromUser(message: string): string {
    const readlineSync = require("readline-sync");
    return readlineSync.question(message);
}

const game = new Game();
game.newGame(1);
consoleGame();

// printPossibleMovesForPiece(new Unicorn("White", 2, 1, 2));

// let testPawn = new Pawn("White", 1, 2, 2);
// let moveSpace = new Position(1, 2, 3);
// testSpecificMove(testPawn, moveSpace);

// test pawn at 245 to 235
// let testPawn = new Pawn("Black", 2, 4, 5);
// let moveSpace = new Position(2, 3, 5);
// testSpecificMove(testPawn, moveSpace);



// console.log("test piece can move to 122" + testPawn.canMoveTo(moveSpace));

// dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "initial board state:");


// test cases
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

function consoleGame() {
    console.log("Welcome to 3D chess on the console.")
    let endOfGame = false;
    while (!endOfGame) {
        dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "Here is the board after " + game.board.getMoveCount() + " moves");
        console.log(game.getWhoseTurnItIs() + "'s turn.");
        const a = getInputFromUser("enter your start space: ");
        const b = getInputFromUser("enter your end space: ");
        let posA, posB;
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
        const moveSuccessful = game.move(posA, posB);
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


function printPossibleMovesForPiece(p: Piece) {
    console.log("after call: " + p.getPostionString());
    let possibleMoves: Position[] = [];
    possibleMoves = game.getPossibleMovesForPiece(p);
    console.log("after call to get possible moves: " + p.getPostionString());
    console.log("listing possible moves for: " + getPieceNotation(p) + " at location " + p.getPostionString());
    for (let i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].getPostionString());
    }
}

function testSpecificMove(a: Piece, b: Position) {
    console.log("Testing move:"  + " " + a.getPostionString() + " to " + b.getPostionString());
    const moveSuccessful = game.move(a.getPosition(), b);
    console.log("move successful: " + moveSuccessful);
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "board state after move: " + a.getPostionString() + " to " + b.getPostionString());
}

function dispalyBoardState(whitePieces: Piece[], blackPieces: Piece[], message: string) {
    console.log(whitePieces.length + " white pieces");
    console.log(blackPieces.length + " black pieces");
    console.log(message);
    let boardArray: String[][][];
    boardArray = [];
    // console.log(boardArray[0][0][0]);
    for (let i = 0; i < 5; i++) {
        boardArray[i] = [];
        for (let j = 0; j < 5; j++) {
            boardArray[i][j] = [];
            for (let k = 0; k < 5; k++) {
                boardArray[i][j][k] = new String();
                boardArray[i][j][k] = "_____";
            }
        }
    }
    for (let i = 0; i < whitePieces.length; i++) {
        const a = whitePieces[i].getPosition();
        boardArray[a.getX() - 1][a.getY() - 1][a.getZ() - 1] = getPieceNotation(whitePieces[i]);
    }
    for (let i = 0; i < blackPieces.length; i++) {
        const b = blackPieces[i].getPosition();
        boardArray[b.getX() - 1][b.getY() - 1][b.getZ() - 1] = getPieceNotation(blackPieces[i]);
    }
    for (let z = 4; z >= 0; z--) {
        console.log("level: " + (z + 1));
        for (let y = 4; y >= 0; y--) {
            let row: string = "|";
            for (let x = 0; x < 5; x++) {
                row += boardArray[x][y][z];
                row += "|"
            }
            console.log(row);
        }
        console.log();
    }
}

function getPieceNotation(piece: Piece): string {
    if (piece.isWhite()) {
        if (piece instanceof Pawn) {
            return "W_Pwn";
        }
        if (piece instanceof Rook) {
            return "W_Rok";
        }
        if (piece instanceof Knight) {
            return "W_Kht";
        }
        if (piece instanceof Bishop) {
            return "W_Bhp";
        }
        if (piece instanceof Unicorn) {
            return "W_Uni";
        }
        if (piece instanceof Queen) {
            return "W_Que";
        }
        if (piece instanceof King) {
            return "W_Kng";
        }
    } // else black
    if (piece instanceof Pawn) {
        return "B_Pwn";
    }
    if (piece instanceof Rook) {
        return "B_Rok";
    }
    if (piece instanceof Knight) {
        return "B_Kht";
    }
    if (piece instanceof Bishop) {
        return "B_Bhp";
    }
    if (piece instanceof Unicorn) {
        return "B_Uni";
    }
    if (piece instanceof Queen) {
        return "B_Que";
    }
    if (piece instanceof King) {
        return "B_Kng";
    }

}


// validates proper space
function validSpaceFromString(str: string): boolean {
    if (str.length != 3) {
        return false
    }
    for (let i = 0; i < 3; i++) {
        if (str.charAt(i) < "1" || str.charAt(i) > "5") {
            return false;
        }
    }
    return true;
}







