// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position, Color } from "./Piece"

// game writes to JSON file for history of moves

export class TwoPlayerGame {
    // id?
    // name?
    moveCount: number = 0;
    moveHistory: string[];
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


    move(a: string, b: string): boolean {
        if (!this.validSpaceFromString(a) && !this.validSpaceFromString(b)) {
            return false;
        }
        const posA = this.getPositionFromString(a);
        const posB = this.getPositionFromString(b);
        const moveExecutedBool = this.board.executeMove(posA, posB);
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

    getWhitePieceLocations(): string[] {
         return this.board.getWhitePieceLocations();
    }

    getBlackPieceLocations(): string[] {
        return this.board.getBlackPieceLocations();
    }

    playerInCheck(): boolean {
        const lastMove = this.moveHistory[this.moveHistory.length - 1];
        return this.board.kingInCheckNow(this.getPositionFromString(lastMove));
    }

    playerCheckmated(): boolean {
        // get location of king
        let color = "Black";
        if (this.getWhoseTurnItIs().localeCompare("Black")) {
            color = "White";
        }
        const locationKing = this.board.getLocationOfKingGivenColor(color);
        if (this.board.getAllPossibleMovesSpace(locationKing).length < 1) {
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

    getPossibleMovesForPieceAtSpace(a: string): string[] {

        let possibleMoves: string[];
        if (!this.validSpaceFromString(a)) {
            return possibleMoves;
        }
        const posA = this.getPositionFromString(a);
        if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesSpace(posA);
        return possibleMoves;
    }

    getWhitePiecesTaken(): string[] {
        return this.board.getWhitePiecesTaken();
    }

    getBlackPiecesTaken(): string[] {
        return  this.board.getBlackPiecesTaken();
    }
    // TODO
    loadGame() {
        // go through moves array and move the board each space
        this.moveHistory = JSON.parse("moveHistory");
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            const a = this.moveHistory[i];
            const b = this.moveHistory[i + 1];
            this.board.executeMoveNoCheck(this.getPositionFromString(a), this.getPositionFromString(b));
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
            const a = this.moveHistory[i];
            const b = this.moveHistory[i + 1];
            this.board.executeMoveNoCheck(this.getPositionFromString(a), this.getPositionFromString(b));
        }
    }

    goForwardOneMove() {
        // TODO
    }

    // validates proper space
    validSpaceFromString(str: string): boolean {
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
}
