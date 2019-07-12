// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position, Color } from "./Piece"

// game writes to JSON file for history of moves


export class Game {
    // id?
    // name?
    moveCount: number = 0;
    moveHistory: Position[] = [];
    board: Board = new Board();

    // Create a new game
    newGame() {
        this.board = new Board();
        this.moveHistory = [];
    }
/*
    let game = TwoPlayerGame();

    // for moving:
    // get strings a and b from textboxes
    let moveSuccessful = game.move(a, b);
    if (!moveSuccessful) {

    }
      // logic should be:
    // move A to B
    // if player in check
    // if player in checkmate say checkmate
    // else is player in draw
    // if player not in check is
    if (game.playerInCheck) {
        if (game.playerCheckmated) {
            //message on screen player checkmated
        }
        else
        //message on screen player in check
    }
    else if (game.GameIsDrawn()) {
        //message game is drawn
    }

    // for getting possible moves
    // get string from textbox space a
    let moveArray = game.getAllPossibleMovesSpace(a);
    // display possible moves
   */


    getPositionOfWhitePiecesArray(): Piece[] {
            return this.board.getWhitePieces();
    }

    getPositionOfBlackPiecesArray(): Piece[] {
        return this.board.getBlackPieces();
    }

    move(a: Position, b: Position): boolean {
        if (!this.validSpace(a) && !this.validSpace(b)) {
            return false;
        }
        const moveExecutedBool = this.board.executeMove(a, b);
        if (moveExecutedBool) {
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            this.board.incrementMoveCount;
        }
        return moveExecutedBool;
    }

    gameIsDrawn(): boolean {
        return this.board.gameIsDrawn();
    }

    getPositionFromString(a: string): Position {
        return new Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
    }

    getWhitePieces(): Piece[] {
         return this.board.getWhitePieces();
    }

    getBlackPieces(): Piece[] {
        return this.board.getBlackPieces();
    }

    playerInCheck(): boolean {
        const lastMove = this.moveHistory[this.moveHistory.length - 1];
        return this.board.kingInCheckNow(lastMove);
    }

    playerCheckmated(): boolean {
        // get location of king
        let color = "Black";
        if (this.getWhoseTurnItIs().localeCompare("Black")) {
            color = "White";
        }
        const locationKing = this.board.getLocationOfKingGivenColor(color);
        if (this.board.getAllPossibleMovesPosition(locationKing).length < 1) {
            return true;
        }
        return false;
    }

    getWhoseTurnItIs(): string {
        if (this.moveCount % 2 == 0) {
            return "White";
        }
        return "Black";
    }

    getPossibleMovesForPieceAtSpace(posA: Position): Position[] {

        let possibleMoves: Position[];
            if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesPosition(posA);
        return possibleMoves;
    }

    getWhitePiecesTaken(): Piece[] {
        return this.board.getWhitePiecesTaken();
    }

    getBlackPiecesTaken(): Piece[] {
        return  this.board.getBlackPiecesTaken();
    }

    loadGame() {
        // go through moves array and move the board each space
        this.moveHistory = JSON.parse("moveHistory");
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoCheck(this.moveHistory[i], this.moveHistory[i + 1]);
            this.moveCount++;
        }
    }

    saveGame() {
        JSON.stringify(this.moveHistory);
    }

    goBackOneMove() {
        JSON.stringify(this.moveHistory);
        this.moveHistory = JSON.parse("moveHistory");
        this.newGame();
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        }
    }

    goForwardOneMove() {
        // TODO
    }

    validSpace(a: Position): boolean {
        return this.board.spaceOnBoard(a);
    }
}
