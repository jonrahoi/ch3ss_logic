import { Knight } from "./Knight"
import { King } from "./King"
// import { Bishop } from "./Bishop"
// import { Rook } from "./Rook"
// import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Piece, Position } from "./Piece"
import { getRaumschachBoardSetup } from "./BoardSetupArrays"
import { RAUMSCHACH, RA_SIZE_BOARD_X, RA_SIZE_BOARD_Y, RA_SIZE_BOARD_Z, RA_BOARD_MIN, WHITE, BLACK } from "./constants"

/**
 * Class for 2 player 3D chess. Board knows the geometry of the board and the location of pieces
 * Can move pieces around board and check if a piece can move to another space and whether piece should be taken or queened.
 * Doesn't know about how to use check, checkmate, stalemate higher level rules but can check for if those occur
 * Pieces know their own movement shape but board checks if piece is in the way of if a possible positon is available to move to.
 */
export default class Board {

    private pieces: Piece[] = [];
    // private moveCount: number;  // WHITE's turn at beginning
    private piecesTaken: Piece[] = []; // no pieces taken at beginning
    private sizeOfBoardX: number;  // number of spaces in x axis
    private sizeOfBoardY: number; // number of spaces in y axis
    private sizeOfBoardZ: number; // number of spaces in z axis
    private boardCoordinateMinimum: number; // corner of board e.g. 1,1,1 or 0,0,0

    private gameVersion: string;
    // first player to make a move is WHITE

    private queeningTwoBackRows: boolean;
    private enPassant: boolean;  // not used for Raumschach
    private castling: boolean;  // not used for Ruamschach

    constructor(gameVersion: string) {
        this.gameVersion = gameVersion;
        if (gameVersion === RAUMSCHACH) {
            this.pieces = getRaumschachBoardSetup();
            // these are the rules for Raumschach
            this.sizeOfBoardX = RA_SIZE_BOARD_X;
            this.sizeOfBoardY = RA_SIZE_BOARD_Y;
            this.sizeOfBoardZ = RA_SIZE_BOARD_Z;
            this.boardCoordinateMinimum = RA_BOARD_MIN;
            this.enPassant = false;  // no en passant in Raumschach
            this.castling = false; // no castling in Raumschach
            this.queeningTwoBackRows = true;
        }
        else {
            console.log("this game version: + " + gameVersion + " could not be found")
        }
        // add other versions here
        // if (gameVersion === ("insert another version")) {
        // size of board could be (8x8x8) and castling = true for example
        // if you want to use en passant must update Pawn class and add a method that would check for that rule
        // if you want to add castling must design rule for that and add code that implements the rule
        //  must add castling and en passant checks to move executeMove method as well as movementRules method
    }
    public resetPiecesToStartingPositions() {
        if (this.gameVersion === RAUMSCHACH) {
            this.pieces = getRaumschachBoardSetup();
        }
    }
    public getSizeOfBoardX() {
        return this.sizeOfBoardX;
    }
    public getSizeOfBoardY() {
        return this.sizeOfBoardY;
    }
    public getSizeOfBoardZ() {
        return this.sizeOfBoardZ;
    }
    public getBoardCoordinateMinimum() {
        return this.boardCoordinateMinimum;
    }
    /**
     * sets the board to a new set of pieces
     * @param newPieces
     */
    public setPieces(newPieces: Piece[]) {
        this.pieces = newPieces;
    }
    /**
     * Executes move if possible: checks if piece at pos A, if move is legal (separate method),
     * if pawn needs to be queened, deletes piece at B if necessary, does not check for king moving into check
     * @param a space A (from)
     * @param b space B (to)
     */
    executeMove(playerMoving: string, a: Position, b: Position): boolean {
        const initialPiecesCopy = this.getCopyOfPieces();
        // console.log("inside board.executeMove")
        if (!this.pieceLocatedAtBool(a)) {
            // console.log("inside board.executeMove, no piece located at " + a.getPostionString());
            return false;
        }
        const movePiece = this.getPieceLocatedAt(a);
        if (!movePiece.isColor(playerMoving)) {
            // console.log("inside board.executeMove, wrong color, move not executed")
            return false;
        }
        if (!this.pieceMoveFollowsMovementRules(movePiece, b)) {
            // console.log("inside board.executeMove, move does not follow movement rules")
            return false;
        }
        // console.log("inside board.executeMove, right color, move legal")
        // Queening of pawn
        if (this.queeningTwoBackRows && movePiece instanceof Pawn && this.checkForQueeningTwoBackRows(movePiece, b)) {
            // console.log("queening pawn")
            this.deletePieceAtPosition(a);
            const newQueen = new Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            // console.log("inside board.executeMove, pawn queened, move executed")
            return true;
        }
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.piecesTaken.push(this.getPieceLocatedAt(b));
            this.deletePieceAtPosition(b);
            // console.log("inside board.executeMove deleting piece at " + b.getPostionString());
        }
        // move piece
        movePiece.setPosition(b);

        // console.log("inside board.executeMove, move executed")
        return true; // move executed successfully
        // castling, en passant not available in RUAMSCHACH
    }
    /**
     * move shape, piece not attacking same team, pawn movement direction, piece in way
     * @param movePiece
     * @param b
     */
    private pieceMoveFollowsMovementRules(movePiece: Piece, b: Position): boolean {
        // check if move shape correct
        if (!movePiece.moveShapeCorrect(b)) {
            // console.log("inside board.pieceMoveFollowsMovementRules, move shape incorrect")
            return false;
        }
        // check if piece at b and if same color
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).isColor(movePiece.getColor())) {
            // console.log("inside board.pieceMoveFollowsMovementRules, move space has piece of same color")
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight) {
            // console.log("inside board.pieceMoveFollowsMovementRules, returning true because instance of knight")
            return true;
        }
        // if pawn moving in right direction, no need to check piece in way (only one space)
        if (movePiece instanceof Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                // console.log("inside board.pieceMoveFollowsMovementRules, pawn incorrect direction")
                return false;
            }
            return true
        }
        // console.log("2: inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            // console.log("inside board.pieceMoveFollowsMovementRules, piece is in way")
            return false;
        }
        // console.log("inside moveIsLegal, returning move legal")
        return true;
    }
    /**
     * Checks if pawn needs to be queened based on Raumschach rules which is that if a pawn reaches
     * the two back rows of the opposite corner from where they started then they turn into an additional queen for that player
     * @param pawn Pawn
     * @param b where the piece is being moved
     */
    private checkForQueeningTwoBackRows(pawn: Piece, b: Position): boolean {
        // moving to position
        if (!(pawn instanceof Pawn)) {
            return false;
        }
        // - 1 and + 1 are to determine if pawn in two far rows (max row - 1) for WHITE and (min row + 1) for BLACK
        if (pawn.isColor(WHITE) && b.getY() == this.sizeOfBoardY && b.getZ() >= this.sizeOfBoardZ - 1 ||
        pawn.isColor(BLACK) && b.getY() == this.boardCoordinateMinimum && b.getZ() <= (this.boardCoordinateMinimum + 1)) {
        return true;
        }
    }
    /**
     * Returns a copys of the set of pieces on the board (prevents outside adjustment of board state)
     */
    public getCopyOfPieces(): Piece[] {
        const copy: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            copy.push(this.pieces[i].makeCopy());
        }
        return copy;
    }
    /**
     * Returns a copys of the set of pieces taken off the board (prevents outside adjustment of board state)
     */
    public getCopyOfPiecesTaken(): Piece[] {
        const copy: Piece[] = [];
        for (let i = 0; i < this.piecesTaken.length; i++) {
             copy.push(this.piecesTaken[i].makeCopy());
        }
        return copy;
    }
    /**
     * Checks if pawn is moving in corrent direction based on Raumschach rules (up/across for WHITE, down/across for BLACK)
     * @param colorOfPawn
     * @param a space moving from
     * @param b space moving to
     */
    private pawnMoveDirectionCorrect(colorOfPawn: string, a: Position, b: Position): boolean {
        // if WHITE needs to move up(dz is positive) or across (dy is positive)
        // if BLACK needs to move down(dz is negative) or across (dy is positive)
        const dy = this.coordinateCompare(a.getY(), b.getY());
        const dz = this.coordinateCompare(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare(WHITE) == 0 && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare(BLACK) == 0 && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    }
    /**
     * Deletes a piece at the given position
     * @param b giving position
     */
    private deletePieceAtPosition(b: Position) {
        const newPieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isAtPosition(b)) {
                newPieces.push(this.pieces[i]);
            }
        }
        this.pieces = newPieces;
    }
    /**
     * Checks if any pieces are checking/attacking their opponent's king
     * @param colorOfKingToCheckIfInCheck
     */
    public kingInCheck(colorOfKingToCheckIfInCheck: string): boolean {
        const kingLocation = this.getLocationOfKingGivenColor(colorOfKingToCheckIfInCheck);
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(colorOfKingToCheckIfInCheck)) {
                if (this.pieceMoveFollowsMovementRules(this.pieces[i], kingLocation)) {
                    // console.log("board.king in check: king is in check")
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Gets the location of a king given a color
     * @param color
     */
    private getLocationOfKingGivenColor(color: string): Position {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King && this.pieces[i].isColor(color)) {
                return new Position(this.pieces[i].getPosition().getX(), this.pieces[i].getPosition().getY(), this.pieces[i].getPosition().getZ());
            }
        }
    }
    /**
     * Determines if a piece exists at a given location
     * @param a position
     */
    public pieceLocatedAtBool(a: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return true;
            }
        }
        return false;
    }
    /**
     * gets a piece given at a specific position
     * @param a position
     */
    private getPieceLocatedAt(a: Position): Piece {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i];
            }
        }
    }
    /**
     * determines if a space is on the board
     * @param a position
     */
    public spaceOnBoard(a: Position): boolean {
        if (a.getX() < this.boardCoordinateMinimum || a.getX() > this.sizeOfBoardX) {
            return false;
        }
        if (a.getY() < this.boardCoordinateMinimum || a.getY() > this.sizeOfBoardY) {
            return false;
        }
        if (a.getZ() < this.boardCoordinateMinimum || a.getZ() > this.sizeOfBoardZ) {
            return false;
        }
        return true;
    }
    /**
     * Determines if a piece is between two spaces, iterates to each space after getting the direction to go in from coordinateCompare
     * @param a space a
     * @param b space b
     */
    private pieceInWay(a: Position, b: Position): boolean {
        // iterate through all the places between position a and position b
        const dx = this.coordinateCompare(a.getX(), b.getX());
        const dy = this.coordinateCompare(a.getY(), b.getY());
        const dz = this.coordinateCompare(a.getZ(), b.getZ());
        // console.log("slopes: " + dx, dy, dz)
        const c = new Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (!c.samePosition(b) && this.spaceOnBoard(c)) {
            // console.log("Positions in piece in way: " + c.getPostionString() + "  " + b.getPostionString())
            if (this.pieceLocatedAtBool(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    }
    /**
     * Determines the change along a coordinate axis, 1, 0, or -1
     * @param a coordinate for space b
     * @param b coordinate for space a
     */
    private coordinateCompare(a: number, b: number): number {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    }
}