// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position } from "./Piece"

export class Game {
    private moveHistory: Position[];
    private board: Board;
    private thereIsCheck: boolean;
    private checkMate: boolean;
    private stalemate: boolean;
    private gameID: number;

    constructor(gameID: number) {
        this.gameID = gameID;
        this.board = new Board();
        this.moveHistory = [];
        this.thereIsCheck = false;
        this.checkMate = false;
        this.stalemate = false;
        this.gameID = gameID;
    }

    setPieces(pieces: Piece[]) {
       this.board.setPieces(pieces);
    }
    getCheck(): boolean {
        return this.thereIsCheck;
    }
    setCheck(a: boolean) {
        this.thereIsCheck = a;
    }

    getCheckMate(): boolean {
        return this.checkMate;
    }

    getGameID(): number {
        return this.gameID;
    }

    getStaleMate(): boolean {
        return this.stalemate;
    }

    getMoveHistory(): Position[] {
        const moves: Position[] = [];
        for (let i = 0; i < this.moveHistory.length; i++) {
            moves.push(this.moveHistory[i]);
        }
        return moves;
    }

    getPieces(): Piece[] {
        return this.board.getPieces();
    }

    getMoveCount(): number {
        return this.board.getMoveCount();
    }

    move(a: Position, b: Position): boolean {
        // validate positions are on board
        if (!this.validSpace(a) || !this.validSpace(b)) { return false; }
        console.log("inside Game.move, both valid spaces");
        let kingStartedInCheck = false;
        let copyOfBoardState: Piece[] = [];
        copyOfBoardState = this.board.getPieces();
        if (this.board.kingInCheck(this.board.getWhoseTurn())) {
            kingStartedInCheck = true;
        }
        const moveExecutedSuccessfully = this.board.executeMove(a, b);
        if (!moveExecutedSuccessfully) {
            return false;
        }
        if (kingStartedInCheck && this.board.kingInCheck(this.board.getWhoseTurn())) {
            this.board.setPieces(copyOfBoardState);
            console.log("move not executed, king still in check")
            return false;
        }
        if (moveExecutedSuccessfully) {
            console.log("game.move: successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString())
            this.board.incrementMoveCount();
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            // check if king is in check, if opponent king in check set bool
            if (this.board.kingInCheck(this.board.getWhoseTurn())) {
            // if (this.board.kingInCheckFromPosition(b)) {
                this.thereIsCheck = true;
                console.log("inside game.ts there is check");
                // check if there is checkmate
                if (this.board.playerCheckmated(this.board.getWhoseTurn())) {
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
        return true;
    }

    gameIsDrawn(): boolean {
        return this.board.gameIsDrawn();
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

        let possibleMoves: Position[] = [];
        if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesPosition(posA);
        return possibleMoves;
    }

    // TODO remove, used for testing
    getPossibleMovesForPiece(piece: Piece): Position[] {
        const pieceB = piece;
        return this.board.getAllPossibleMovesPosition(pieceB.getPosition());
    }

    // possibly TODO change to list of strings
    getPiecesTaken(color: string): Piece[] {
        return this.board.getPiecesTaken();
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
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        }
        //TODO, movecount, etc
    }

    goForwardOneMove() {
        // TODO
    }

    validSpace(a: Position): boolean {
        return this.board.spaceOnBoard(a);
    }

    pieceLocatedAtBool(a: Position): boolean {
        return this.board.pieceLocatedAtBool(a);
    }

    // kingsPresentOnBoardDebug(): boolean {
    //     return this.board.kingsPresentOnBoardDebug();
    // }

    isValidSpaceFromString(str: string): boolean {
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
