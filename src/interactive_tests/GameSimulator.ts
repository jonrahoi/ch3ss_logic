import { Game } from "../Game"
// import { dispalyBoardState } from "./ConsoleGame"
import { Piece, Position, Color } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"
import Board from "../Board";

const numberOfMovesToSimulate = 1000;

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
    dispalyBoardState(game.getPiecesByColor("White"), game.getPiecesByColor("Black"), "initial board state:");

    while (!endOfGame && moveIterationCount < maxMoves) {
        pieces = game.getPiecesByColor(game.getWhoseTurnItIs());
        let moveFound = false;
        let moveLookCounter = 0;
        while (!moveFound && moveLookCounter < 1000) {
            //if (!game.thereIsCheck) {
                const randomPieceNum = Math.floor(Math.random() * pieces.length);
                // console.log("random number: " + randomPieceNum);
                console.log("random piece "  + getPieceNotation(pieces[randomPieceNum]) + " located at: " + pieces[randomPieceNum].getPostionString());
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
        if (!game.kingsPresentOnBoardDebug()) {
            console.log("King is missing!");
            endOfGame = true;
            break;
        }
        console.log("trying move piece: " + getPieceNotation(piece), " at " + piece.getPostionString(), " to ", moveSpace.getPostionString());
        const moveSuccessful = game.move(piece.getPosition(), moveSpace);
        console.log("move successful: " + moveSuccessful + ", " + game.getMoveCount() + " move count, ", "piece: " + getPieceNotation(piece), " at " + piece.getPostionString());
        // if (!moveSuccessful) {
        //     endOfGame = true;
        //     break;
        // }
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
        if (piece.isColor("White")) {
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
}






