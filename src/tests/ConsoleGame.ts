import { Game } from "../Game"
import { Piece, Position, Color } from "../Piece"
import { Knight } from "../Knight"
import { King } from "../King"
import { Bishop } from "../Bishop"
import { Rook } from "../Rook"
import { Unicorn } from "../Unicorn"
import { Pawn } from "../Pawn"
import { Queen } from "../Queen"


const game = new Game();

// let blackPieces = game.getBlackPieces();
// let whitePieces = game.getWhitePieces();

// displayPieces("black pieces: ", blackPieces);
// displayPieces("white pieces: ", blackPieces);

let testPawn = new Pawn("White", 1, 2, 2);
let moveSpace = new Position(1, 2, 3);
testSpecificMove(testPawn, moveSpace);

// console.log("test piece can move to 122" + testPawn.canMoveTo(moveSpace));

//dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "initial board state:");

//simulateGame(1);

// TODO debug queen
// let blackQueen = new Queen("Black", 4, 5, 5);
// let whitePawn = new Pawn("White", 1, 2, 2);

// const testPiece1 = new Rook("White", 3, 3, 3);
// console.log("initial: " + testPiece1.getPostionString());

// let testPiece = new Knight("Black", 2, 5, 5);
// printPossibleMovesForPiece(testPiece);

// let pos = new Position(1, 2, 2);
// console.log("white pawn can move to " + whitePawn.canMoveTo(pos));

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


// pieces = game.getWhitePieces();
// console.log("testing piece: " + getPieceNotation(pieces[0]));
// testPiecePossibleMove(pieces[0]);


// function testPiecePossibleMove(a: Piece, moveSpace: Postion) {
//     console.log(game.moveIsLegalDebug(a, moveSpace));
// }



function testSpecificMove(a: Piece, b: Position) {
    console.log("Testing move:"  + " " + a.getPostionString() + " to " + b.getPostionString());
    const moveSuccessful = game.move(a.getPosition(), b);
    console.log("move successful: " + moveSuccessful);
    dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "board state after move: " + a.getPostionString() + " to " + b.getPostionString());
}


function displayPieces(message: string, pieces: Piece[]) {
    for (let i = 0; i < pieces.length; i++) {
        console.log(game.getBlackPieces());
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




function simulateGame(maxMoves: number) {
    let quit = false;
    while (quit == false) {
    
        let moveCount = 0;
        let endOfGame = false;
        let pieces: Piece[] = [];
        let piece = new Pawn("White", 1, 1, 1);
        let moveSpace = new Position(2, 2, 2);
        let iterationCount = 0;
        dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "initial board state:");
    
        // while (endOfGame != true && iterationCount < 100) {
        while (iterationCount < maxMoves) {
            if (moveCount % 2 == 0) {
                // white's turn
                pieces = game.getWhitePieces();
            }
            else {
                pieces = game.getBlackPieces();
            }
            let moveFound = false;
            let moveLookCounter = 0;
            // while (moveFound == false || moveLookCounter < 100) {
            while (moveFound == false || moveLookCounter < 100) {
                const randomPieceNum = Math.floor(Math.random() * pieces.length);
                // console.log("random number: " + randomPieceNum);
                // console.log("random piece located at: " + pieces[randomPieceNum].getPostionString());
                piece = pieces[randomPieceNum];
                const possibleMoves: Position[] = game.getPossibleMovesForPiece(piece);
                // console.log("number of moves from that position: + " + possibleMoves.length);
                if (possibleMoves.length == 0) {
                    continue; // try with different piece
                }
                moveSpace = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                moveFound = true;
                moveLookCounter++;
            }
            moveCount++;
            console.log("Move: " + moveCount + " " + piece.getPostionString() + " to " + moveSpace.getPostionString());
            const moveSuccessful = game.move(piece.getPosition(), moveSpace);
            console.log("move successful: " + moveSuccessful);
            dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "board state after " + moveCount + " moves:");
            // if (false) {
            // // if (game.gameIsDrawn()) {
            //     console.log("game is drawn");
            //     endOfGame = true;
            // }
            // else if (game.playerInCheck()) {
            //     console.log("player in check");
            //     if (game.playerCheckmated()) {
            //         console.log("player checkmated");
            //     }
            //     endOfGame = true;
            // }
            iterationCount++;
            console.log("iteration count: " + iterationCount);
        }
        quit = true;
    }
}

function movePieces(message: string) {
    game.move
}

function getPieceNotation(piece: Piece): string {;
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






