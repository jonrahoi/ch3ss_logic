// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position } from "./Piece"
import { getBoardStateStringArraySliceByZ } from "./DisplayBoard2D"
import { RUAMSCHACH } from "./constants"

/**
 * Class to be instantiated by user interface for two player game of 3D chess
 */
export class Game {
    private moveHistory: Position[];
    private board: Board;
    private gameID: number;
    private moveCount: number;
    private minNumberOfPiecesBeforeDraw = 5; // less than 5 pieces causes draw
    private white = "White";
    private black = "Black";
    /**
     * constructor for class
     * @param gameID unique game ID
     */
    constructor(gameID: number) {
        this.gameID = gameID;
        this.board = new Board(RUAMSCHACH, this.white, this.black);
        this.moveHistory = [];
        this.gameID = gameID;
        this.moveCount = 0;
    }
    /**
     * Sets pieces for board, used for testing
     * @param pieces array of Piece objects
     */
    public setPieces(pieces: Piece[]) {
       this.board.setPieces(pieces);
    }
    /**
     * 
     */
    public getBoardStateStringArray(): String[] {
        return getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(), 
            this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
    }
    public printBoardStateToConsole() {
        const arr = getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(), 
            this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    }
    public getWhoseTurnFromMoveCount(moveCount: number): string {
        if (moveCount % 2 == 0) {
            return this.white;
        }
        return this.black;
    }
    public getCheck(): boolean {
        const playerMoving = this.getWhoseTurnFromMoveCount(this.moveCount);
        return this.board.kingInCheck(playerMoving);
    }
    public getCheckMate(): boolean {
        if (!this.getCheck()) {
            return false;
        }
        const pieces = this.board.getCopyOfPieces();
        for (let i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
        return true;
    }
    public getStaleMate(): boolean {
        if (this.getCheck()) {
            return false;
        }
        const pieces = this.board.getCopyOfPieces();
        for (let i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
    }
    public getInsufficientMaterial(): boolean {
        if (this.board.getCopyOfPieces().length < this.minNumberOfPiecesBeforeDraw) {
            return true;
        }
        return false;
    }
    public getMoveHistory(): Position[] {
        const moves: Position[] = [];
        for (let i = 0; i < this.moveHistory.length; i++) {
            moves.push(this.moveHistory[i]);
        }
        return moves;
    }
    public getPieces(): Piece[] {
        return this.board.getCopyOfPieces();
    }
    public getMoveCount(): number {
        return this.getMoveCount();
    }
    public move(a: Position, b: Position): boolean {
        if (!this.validSpace(a) || !this.validSpace(b)) { return false; }
        console.log("inside Game.move, both valid spaces");
        // const kingStartedInCheck = this.board.kingInCheck(this.board.getWhoseTurn());
        const copyOfBoardState: Piece[] = this.board.getCopyOfPieces();

        const playerMoving = this.getWhoseTurnFromMoveCount(this.moveCount);
        if (!this.board.executeMove(playerMoving, a, b)) {
            return false;
        }
        if (this.board.kingInCheck(playerMoving)) {
            this.board.setPieces(copyOfBoardState);
            console.log("move not executed, king still in check")
            return false;
        }
        console.log("game.move: successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString())
        this.moveCount++;
        this.moveHistory.push(a);
        this.moveHistory.push(b);
        return true;
    }
    public getPossibleMovesForPieceAtSpace(a: Position): Position[] {
        const possibleMoves: Position[] = [];
        if (!this.board.pieceLocatedAtBool(a)) {
            // console.log("inside game.possibleMoves, no piece located there")
            return possibleMoves;
        }
        const copyOfBoardState: Piece[] = this.board.getCopyOfPieces();
        const playerMoving = this.getWhoseTurnFromMoveCount(this.moveCount);
        for (let x = 1; x <= this.board.getSizeOfBoardX(); x++) {
            for (let y = 1; y <= this.board.getSizeOfBoardY(); y++) {
                for (let z = 1; z <= this.board.getSizeOfBoardZ(); z++) {
                    // create a position with the three iterators
                    const b: Position = new Position(x, y, z);
                    this.board.setPieces(this.getCopyOfPieces(copyOfBoardState));
                    if (this.board.executeMove(playerMoving, a, b) && !this.board.kingInCheck(playerMoving)) {
                        possibleMoves.push(b);
                    }
                }
            }
        }
        this.board.setPieces(copyOfBoardState);
        return possibleMoves;
    }
    private getCopyOfPieces(pieces: Piece[]): Piece[] {
        const copy: Piece[] = [];
        for (let i = 0; i < pieces.length; i++) {
            copy.push(pieces[i].makeCopy());
        }
        return copy;
    }
    public gameIsDrawn(): boolean {
        return this.getStaleMate();
    }

    public getPositionFromString(a: string): Position {
        if (this.isValidSpaceFromString(a)) {
            return new Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
        }
        else {
            return new Position(0, 0, 0);
        }
    }

    public getWhoseTurnItIs(): string {
        return this.getWhoseTurnItIs();
    }

    getPiecesTaken(): Piece[] {
        return this.board.getCopyOfPiecesTaken();
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
        for (let i = 0; i < this.moveHistory.length - 2; i += 2) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
        }
    }

    goForwardOneMove() {
        // TODO
    }

    public validSpace(a: Position): boolean {
        return this.board.spaceOnBoard(a);
    }


    // kingsPresentOnBoardDebug(): boolean {
    //     return this.board.kingsPresentOnBoardDebug();
    // }

    public isValidSpaceFromString(str: string): boolean {
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