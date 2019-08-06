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

const numberOfMovesToSimulate = 1000;


const game = new Game(1);

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
        pieces = game.getPieces();
        while (!moveFound && moveLookCounter < 1000) {
            const randomPieceNum = Math.floor(Math.random() * pieces.length);
            // console.log("random number: " + randomPieceNum);
            // console.log("random piece located at: " + pieces[randomPieceNum].getPostionString());
            piece = pieces[randomPieceNum];
            const possibleMoves: Position[] = game.getPossibleMovesForPieceAtSpace(piece.getPosition());
            // console.log("number of moves from position: " + piece.getPostionString() + ": " + possibleMoves.length);
            if (possibleMoves.length == 0) {
                moveLookCounter++;
                continue; // try with different piece
            }
            // list possible moves
            // console.log("possible moves: ");
            for (let i = 0; i < possibleMoves.length; i++) {
                // console.log(possibleMoves[i].getPostionString())
            }
            // console.log();
            moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveFound = true;
            moveLookCounter++;
        }
        // console.log("trying move piece at " + piece.getPostionString(), " to ", moveSpace.getPostionString());
        const moveSuccessful = game.move(piece.getPosition(), moveSpace);
        // console.log("move successful: " + moveSuccessful + ", " + game.getMoveCount() + " move count, ", "piece at " + piece.getPostionString());
        // game.printBoardStateToConsole();
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
            console.log("CHECK!")
        }
}
    game.printBoardStateToConsole();
}