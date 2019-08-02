import { Game } from "../Game"
// import { dispalyBoardState } from "./ConsoleGame"
import { Piece, Position } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"
import Board from "../Board";

const numberOfMovesToSimulate = 100;

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
    new King("White", 1, 1, 1),
    new Pawn("Black", 1, 3, 1),
    new Pawn("Black", 2, 2, 1),
    new Pawn("Black", 3, 2, 1),
    new Pawn("Black", 1, 2, 2),
    new Pawn("Black", 2, 2, 2),
    new Pawn("Black", 3, 2, 2),
    new King("Black", 4, 1, 1)
]

const game = new Game(1);

game.setPieces(testCorneredKing);
// game.setPreviousMoveCreatedCheck(true);

simulateGame(numberOfMovesToSimulate);

function simulateGame(maxMoves: number) {
    let endOfGame = false;
    let pieces: Piece[] = [];
    let piece;
    let moveSpace;
    let moveIterationCount = 1;
    game.printBoardStateToConsole();

    while (!endOfGame && moveIterationCount < maxMoves) {
        let moveFound = false;
        let moveLookCounter = 0;
        while (!moveFound && moveLookCounter < 1000) {
            //if (!game.thereIsCheck) {
                const randomPieceNum = Math.floor(Math.random() * pieces.length);
                // console.log("random number: " + randomPieceNum);
                console.log("random piece located at: " + pieces[randomPieceNum].getPostionString());
                piece = pieces[randomPieceNum];
            // }
            //else {
                // find a move that stops the check
                // 
            //}
            const possibleMoves: Position[] = game.getPossibleMovesForPiece(piece);
            console.log("number of moves from position: " + piece.getPostionString() + ": " + possibleMoves.length);
            if (possibleMoves.length == 0) {
                moveLookCounter++;
                continue; // try with different piece
            }
            // list possible moves
            console.log("possible moves: ");
            for (let i = 0; i < possibleMoves.length; i++) {
                console.log(possibleMoves[i].getPostionString())
            }
            console.log();
            moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveFound = true;
            moveLookCounter++;
            // if (moveLookCounter > 1000) {
            //     break;
            // }
        }
        // if (!moveFound) {
        //     endOfGame = true;
        //     break;
        // }

        // TODO remove
        // if (!game.kingsPresentOnBoardDebug()) {
        //     console.log("King is missing!");
        //     endOfGame = true;
        //     break;
        // }
        console.log("trying move piece at " + piece.getPostionString(), " to ", moveSpace.getPostionString());
        const moveSuccessful = game.move(piece.getPosition(), moveSpace);
        console.log("move successful: " + moveSuccessful + ", " + game.getMoveCount() + " move count, ", "piece at " + piece.getPostionString());
        // if (!moveSuccessful) {
        //     endOfGame = true;
        //     break;
        // }
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






