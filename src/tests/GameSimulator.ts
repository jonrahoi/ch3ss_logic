import { Game } from "../Game"
import { dispalyBoardState } from "./ConsoleGame"
import { Piece, Position, Color } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"
import Board from "../Board";

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

game.setPieces(testCorneredKing);
// game.setPreviousMoveCreatedCheck(true);

simulateGame(1000);

function simulateGame(maxMoves: number) {
    let endOfGame = false;
    let pieces: Piece[] = [];
    let piece;
    let moveSpace;
    let iterationCount = 0;
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "initial board state:");

    while (!endOfGame && iterationCount < maxMoves) {
        pieces = game.getPiecesByColor(game.getWhoseTurnItIs());
        let moveFound = false;
        let moveLookCounter = 0;
        while (!moveFound || moveLookCounter < 100) {
            //if (!game.thereIsCheck) {
                const randomPieceNum = Math.floor(Math.random() * pieces.length);
                // console.log("random number: " + randomPieceNum);
                // console.log("random piece "  + getPieceNotation(pieces[randomPieceNum]) + " located at: " + pieces[randomPieceNum].getPostionString());
                piece = pieces[randomPieceNum];
            // }
            //else {
                // find a move that stops the check
                // 
            //}
            const possibleMoves: Position[] = game.getPossibleMovesForPiece(piece);
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

        const moveSuccessful = game.move(piece.getPosition(), moveSpace);
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






