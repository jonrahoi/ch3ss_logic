import { Piece, Position, } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"
import { Game } from "../Game"

const testCorneredKing = [
    new King("White", 1, 1, 1),
    new Pawn("Black", 1, 3, 1),
    new Pawn("Black", 2, 3, 1),
    new Pawn("Black", 3, 3, 1),
    new Pawn("Black", 1, 3, 2),
    new Pawn("Black", 2, 2, 2),
    new Pawn("Black", 3, 2, 2),
    new Queen("Black", 1, 1, 3),
    new Queen("Black", 2, 1, 3),
    new Queen("Black", 3, 1, 3),
    new Queen("Black", 4, 1, 3),
    new Queen("Black", 5, 1, 3),
    new Queen("Black", 4, 2, 1),
    new Queen("Black", 4, 2, 2),
    new King("Black", 4, 1, 1),
    new Queen("Black", 4, 1, 2)
]

const testCorneredKingImmediateStalemate = [
    // TODO actually make this a stalemate
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

const game = new Game(1);
// game.setPieces(testCorneredKing);
// game.setCheck(true);

consoleGame();

function consoleGame() {
    console.log("Welcome to 3D chess on the console.")
    let endOfGame = false;
    while (!endOfGame) {
        console.log("move history: ");
        const moveHistory = game.getMoveHistory();
        for (let i = 0; i < moveHistory.length; i++) {
            console.log(moveHistory[i].getPostionString());
        }
        game.printBoardStateToConsole();
        console.log(game.getWhoseTurnItIs() + "'s turn.");
        const menu = +getInputFromUser("enter 1 to enter a move, 2 to get available moves: ");
        console.log("you entered: " + menu);
        if (menu == 2) {
            const space = getInputFromUser("enter your start space: ");
            if (game.isValidSpaceFromString(space)) {
                const spaces = game.getPossibleMovesForPieceAtSpace(game.getPositionFromString(space));
                console.log("available spaces");
                for (let i = 0; i < spaces.length; i++) {
                    console.log(spaces[i].getPostionString());
                }
                continue;
            }
            else {
                console.log("invalid space");
                continue;
            }
        }
        const a = getInputFromUser("enter your start space: ");
        const b = getInputFromUser("enter your end space: ");
        let posA, posB;
        if (validSpaceFromString(a) && validSpaceFromString(b)) {
            posA = game.getPositionFromString(a);
            posB = game.getPositionFromString(b);
        }
        else {
            console.log("enter valid spaces");
            continue;
        }
        const moveSuccessful = game.move(posA, posB);
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


function printPossibleMovesForPiece(p: Piece) {
    console.log("after call: " + p.getPostionString());
    let possibleMoves: Position[] = [];
    possibleMoves = game.getPossibleMovesForPieceAtSpace(p.getPosition());
    console.log("after call to get possible moves: " + p.getPostionString());
    console.log("listing possible moves for piece at location " + p.getPostionString());
    for (let i = 0; i < possibleMoves.length; i++) {
        console.log(possibleMoves[i].getPostionString());
    }
}

function testSpecificMove(a: Piece, b: Position) {
    console.log("Testing move:"  + " " + a.getPostionString() + " to " + b.getPostionString());
    const moveSuccessful = game.move(a.getPosition(), b);
    console.log("move successful: " + moveSuccessful);
    game.printBoardStateToConsole();
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