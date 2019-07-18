// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position, Color } from "./Piece"
import King from "./Board"


export class Game {
    moveHistory: Position[] = [];
    board: Board;
    previousMoveCreatedCheck: boolean = false;
    thereIsCheck = false;
    checkMate = false;
    stalemate = false;
    gameID = 0;

    // Create a new game
    newGame(gameID: number) {
        this.gameID = gameID;
        this.board = new Board();
        this.moveHistory = [];
    }
/*
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

   setPieces(pieces: Piece[]) {
       this.board.setPieces(pieces);
   }
    getCheck(): boolean {
        return this.thereIsCheck;
    }

    getGameID(): number {
        return this.gameID;
    }

    getMoveHistory(): Position[] {
        return this.moveHistory;
    }

    move(a: Position, b: Position): boolean {
        // validate positions are on board
        if (!this.validSpace(a) || !this.validSpace(b)) { return false; }
        console.log("inside Game.move, both valid spaces");
        // // validate that if there is a check from last move then opponent is trying to move the king or is trying to move to the last space
        // // 
        // if (this.thereIsCheck && (!(this.board.getPieceLocatedAt(a) instanceof King))) {
        //     // there is check but the king is not moving 
        //     return false
        // }
        // if ( b != this.moveHistory[this.moveHistory.length - 1]) {
        //      return false;
        // }
        const moveExecutedBool = this.board.executeMove(a, b);
        if (moveExecutedBool) {
            console.log("game.move: successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString())
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            // check if king is in check, if opponent king in check set bool
            if (this.board.kingInCheckFromPosition(b)) {
                this.thereIsCheck = true;
                console.log("inside game.ts there is check");
                // check if there is checkmate
                if (this.board.playerCheckmated(b)) {
                    this.checkMate = true;
                    console.log("inside game.ts there is checkmate");
                }
            }
            else {
                this.thereIsCheck = false;
                // TO DO check if create stalemate
                if (this.board.gameIsDrawn()) {
                    this.stalemate = true;
                }
            }
        }
        return moveExecutedBool;
    }

    gameIsDrawn(): boolean {
        return this.board.gameIsDrawn();
    }

    setPreviousMoveCreatedCheck(b: boolean) {
        this.previousMoveCreatedCheck = b;
    }

    getPositionFromString(a: string): Position {
        return new Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
    }

    getPiecesByColor(color:string): Piece[] {
         return this.board.getPiecesByColor(color);
    }

    getWhoseTurnItIs(): string {
        return this.board.getWhoseTurn();
    }

    getPossibleMovesForPieceAtSpace(posA: Position): Position[] {

        let possibleMoves: Position[];
            if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesPosition(posA);
        return possibleMoves;
    }

    // possibly TODO remove, used for testing
    getPossibleMovesForPiece(piece: Piece): Position[] {
        const pieceB = piece;
        return this.board.getPossibleMovesPiece(pieceB);
    }

    // possibly TODO change to list of strings
    getPiecesTakenByColor(color: string): Piece[] {
        return this.board.getPiecesTakenByColor(color);
    }

    loadGame() {
        // go through moves array and move the board each space
        this.moveHistory = JSON.parse("moveHistory");
        // for (let i = 0; i < this.moveHistory.length; i += 2) {
        //     this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        //     this.board.moveCount++;
        // }
    }

    saveGame() {
        JSON.stringify(this.moveHistory);
    }

    goBackOneMove() {
        JSON.stringify(this.moveHistory);
        this.moveHistory = JSON.parse("moveHistory");
        this.newGame(1);
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        }
    }

    goForwardOneMove() {
        // TODO
    }

    validSpace(a: Position): boolean {
        return this.board.spaceOnBoard(a);
    }

    getKingPiece(): Piece {
        const pos = this.board.getLocationOfKingGivenColor(this.board.getWhoseTurn());
        return this.board.getPieceLocatedAt(pos);
    }

    getPieceLocatedAt(a: Position): Piece {
        return this.board.getPieceLocatedAt(a);
    }

    pieceLocatedAtBool(a: Position): boolean {
        return this.board.pieceLocatedAtBool(a);
    }
}
