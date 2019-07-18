import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Piece, Position, Color } from "./Piece"

// game contains a board (with pieces)
// game contains history of moves

export default class Board {

    private pieces = Board.setupBoard()
    private moveCount = 0;
    private piecesTaken: Piece[] = [];

    private static setupBoard() {
        return [
            // Level E Black
            // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
            new King("Black", 3, 5, 5),
            new Rook("Black", 1, 5, 5),
            new Rook("Black", 5, 5, 5),
            new Knight("Black", 2, 5, 5),
            new Knight("Black", 4, 5, 5),
            new Pawn("Black", 1, 4, 5),
            new Pawn("Black", 2, 4, 5),
            new Pawn("Black", 3, 4, 5),
            new Pawn("Black", 4, 4, 5),
            new Pawn("Black", 5, 4, 5),

            // Level D Black
            // Queen Dc5; Bishop Da5, Dd5; Unicorn Db5, De5; Pawn Da4, Db4, Dc4; Dd4; De4
            new Queen("Black", 3, 5, 4),
            new Bishop("Black", 1, 5, 4),
            new Bishop("Black", 4, 5, 4),
            new Unicorn("Black", 2, 5, 4),
            new Unicorn("Black", 5, 5, 4),
            new Pawn("Black", 1, 4, 4),
            new Pawn("Black", 2, 4, 4),
            new Pawn("Black", 3, 4, 4),
            new Pawn("Black", 4, 4, 4),
            new Pawn("Black", 5, 4, 4),

            // // Level C Empty at beginning

            // // Level B White
            // // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
            new Queen("White", 3, 1, 2),
            new Bishop("White", 1, 1, 2),
            new Bishop("White", 4, 1, 2),
            new Unicorn("White", 2, 1, 2),
            new Unicorn("White", 5, 1, 2),
            new Pawn("White", 1, 2, 2),
            new Pawn("White", 2, 2, 2),
            new Pawn("White", 3, 2, 2),
            new Pawn("White", 4, 2, 2),
            new Pawn("White", 5, 2, 2),

            // // Level A White
            // // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
            new King("White", 3, 1, 1),
            new Rook("White", 1, 1, 1),
            new Rook("White", 5, 1, 1),
            new Knight("White", 2, 1, 1),
            new Knight("White", 4, 1, 1),
            new Pawn("White", 1, 2, 1),
            new Pawn("White", 2, 2, 1),
            new Pawn("White", 3, 2, 1),
            new Pawn("White", 4, 2, 1),
            new Pawn("White", 5, 2, 1),
        ]
    }
    setPieces(newPieces: Piece[]) {
        this.pieces = newPieces;
    }
    incrementMoveCount() {
        this.moveCount++;
    }
    setMoveCount(movesCount: number) {
        this.moveCount = movesCount;
    }
    /**
     * Executes move if possible: checks if piece at pos A, if move is legal (separate method),
     * if pawn needs to be queened, if king moving into check, deletes piece at B if necessary
     * @param a space A (from)
     * @param b space B (to)
     */
    executeMove(a: Position, b: Position): boolean {
        console.log("inside board.executeMove")
        if (!this.pieceLocatedAtBool(a)) {
            console.log("inside board.executeMove, no piece located at " + a.getPostionString());
            return false;
        }
        const movePiece = this.getPieceLocatedAt(a);
        if (!movePiece.isColor(this.getWhoseTurn())) {
            console.log("inside board.executeMove, wrong color, move not executed")
            return false;
        }
        if (!this.moveIsLegal(movePiece, b)) {
            console.log("inside board.executeMove, move is not legal")
            return false;
        }
        console.log("inside board.executeMove, right color, move legal")
        // Queening of pawn
        if (movePiece instanceof Pawn && this.checkForQueening(movePiece, b)) {
            this.deletePieceAtPosition(a);
            const newQueen = new Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            console.log("inside board.executeMove, pawn queened, move executed")
            return true;
        }
        // is King moving into check?
        if (movePiece instanceof King && this.kingInCheckAtSpace(movePiece.getOppositeColor(), b)) {
            console.log("inside board.execute player's king in check, move not executed")
            return false;
        }
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
            console.log("inside board.executeMove deleting piece at " + b.getPostionString());
        }
        // // move piece
        movePiece.moveTo(b);
        console.log("inside board.executeMove, move executed")
        return true; // move executed successfully
        // castling, en passant not available in RUAMSCHACH
    }

    MoveExecutable(movePiece: Piece, b: Position): boolean {
        // console.log("inside board.MoveExecutable")
        if (!movePiece.isColor(this.getWhoseTurn())) {
            // console.log("inside board.MoveExecutable, wrong color, move not executed")
            return false;
        }
        if (!this.moveIsLegal(movePiece, b)) {
            // console.log("inside board.MoveExecutable, move is not legal")
            return false;
        }
        // console.log("inside board.MoveExecutable, right color, move legal")
        // is King moving into check?
        if (movePiece instanceof King && this.kingInCheckAtSpace(movePiece.getOppositeColor(), b)) {
            // console.log("inside board.MoveExecutable player's king in check, move not executed")
            return false;
        }
        return true; // move executable
    }


    /**
     * Checks if move is legal for a specific piece to go to space A given board state, independent of whose turn it is
     * @param movePiece piece to check for movement
     * @param b space to check move to
     */
    moveIsLegalDebug(movePiece: Piece, b: Position): boolean {
        // check if move shape correct
        if (!movePiece.canMoveTo(b)) {
            // console.log("inside moveIsLegal, move shape incorrect")
            return false;
        }
        // check if piece at b and if same color
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            console.log("inside moveIsLegal, move space has piece of same color")
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight) {
            console.log("inside moveIsLegal")
            return true;
        }
        // if pawn moving in right direction, no need to check piece in way (only one space)
        if (movePiece instanceof Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                console.log("inside moveIsLegal, pawn incorrect direction")
                return false;
            }
            return true
        }
        // console.log("2: inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            console.log("inside moveIsLegal, piece is in way")
            return false;
        }
        console.log("inside moveIsLegal, returning move legal")
        return true;
    }


    moveIsLegal(movePiece: Piece, b: Position): boolean {
        // check if move shape correct
        if (!movePiece.canMoveTo(b)) {
            // console.log("inside moveIsLegal, move shape incorrect")
            return false;
        }
        // check if piece at b and if same color
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            // console.log("inside moveIsLegal, move space has piece of same color")
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight) {
            // console.log("inside moveIsLegal")
            return true;
        }
        // if pawn moving in right direction, no need to check piece in way (only one space)
        if (movePiece instanceof Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                // console.log("inside moveIsLegal, pawn incorrect direction")
                return false;
            }
            return true
        }
        // console.log("2: inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            // console.log("inside moveIsLegal, piece is in way")
            return false;
        }
        // console.log("inside moveIsLegal, returning move legal")
        return true;
    }


    checkForQueening(movePiece: Piece, b: Position): boolean {
        // moving to position
       if (movePiece.isColor("White") && b.getY() == 5 && b.getZ() >= 4 || !movePiece.isColor("Black") && b.getY() == 1 && b.getZ() <= 2) {
           return true;
       }
    }

    executeMoveNoLegalCheck(a: Position, b: Position) {
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        // check for queening
        const movePiece = this.getPieceLocatedAt(a);
        if (movePiece instanceof Pawn && this.checkForQueening(movePiece, b)) {
            this.deletePieceAtPosition(a);
            const newQueen = new Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            return ;
        }
        // move piece
        this.getPieceLocatedAt(a).moveTo(b);
    }

    kingInCheckFromPosition(pos: Position): boolean {
        // find opposite color
        let color: Color = "Black";
        if (!this.pieceLocatedAtBool(pos)) {
            return false;
        }
        const piece = this.getPieceLocatedAt(pos);
        if (piece.isColor("Black")) {
            color = "White";
        }
        if (this.moveIsLegal(piece, this.getLocationOfKingGivenColor(color))) {
            return true;
        }
        return false;
    }

    gameIsDrawn(): boolean {
        const whoseTurn = this.getWhoseTurn();
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isColor(whoseTurn)) {
                if (this.getPossibleMovesPiece(this.pieces[i]).length > 0) {
                    return false;
                }
            }
        }
        return true;
    }

    getWhoseTurn(): string {
        let whoseTurn = "White";
        if (this.moveCount % 2 == 1) {
            whoseTurn = "Black";
        }
        return whoseTurn;
    }

    getPiecesByColor(color: string): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isColor(color)) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    }

    getPieces(): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            pieces.push(this.pieces[i]);
        }
        return pieces;
    }
    getPiecesTakenByColor(color: string): Piece[] {
        const piecesTakenArray: Piece[] = [];
        for (let i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].isColor(color))) {
                piecesTakenArray.push(this.pieces[i]);
            }
        }
        return piecesTakenArray;
    }

    pawnMoveDirectionCorrect(colorOfPawn: string, a: Position, b: Position): boolean {
        // if white needs to move up(dz is positive) or across (dy is positive)
        // if black needs to move down(dz is negative) or across (dy is positive)
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare("White") == 0 && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare("Black") == 0 && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    }

    deletePieceAtPosition(b: Position) {
        let newPieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(b)) {
                this.piecesTaken.push(this.pieces[i]);
            }
            else {
                newPieces.push(this.pieces[i]);
            }
        }
        this.pieces = newPieces;
    }

    kingInCheckAtSpace(opponentColor: string, positionKing: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            // if opposing team, can move to where the King is, and isn't blocked
            if ((this.pieces[i].isColor(opponentColor)) && this.moveIsLegal(this.pieces[i], positionKing)) {
                // console.log(" inside board.ts King in check at space: " + positionKing.getPostionString() + " from piece at " + this.pieces[i].getPosition().getPostionString());
                return true;
            }
        }
        return false;
    }

    getLocationOfKingGivenColor(color: string): Position {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King && this.pieces[i].isColor(color)) {
                return this.pieces[i].getPosition();
            }
        }
    }

    pieceLocatedAtBool(a: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return true;
            }
        }
        return false;
    }

    getPieceLocatedAt(a: Position): Piece {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i];
            }
        }
    }

    spaceOnBoard(a: Position): boolean {
        if (a.getX() < 1 || a.getX() > 5) {
            return false;
        }
        if (a.getY() < 1 || a.getY() > 5) {
            return false;
        }
        if (a.getZ() < 1 || a.getZ() > 5) {
            return false;
        }
        return true;
    }

    pieceInWay(a: Position, b: Position): boolean {
        // let x = a.getX;
        // iterate through all the places between position a and position b
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        // console.log("slopes: " + dx, dy, dz)
        let c = new Position(a.getX(), a.getY(), a.getZ());
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

    getSlope(a: number, b: number): number {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    }
    /**
     * @param piece Gets all possible move for specific piece
     */
    getPossibleMovesPiece(piece: Piece): Position[] {
        const possibleMoves: Position[] = [];
        // iterate through all spaces on board
        for (let x = 1; x < 6; x++) {
            for (let y = 1; y < 6; y++) {
                for (let z = 1; z < 6; z++) {
                    // create a position with the three iterators
                    const possibleSpace: Position = new Position(x, y, z);
                    // if (piece instanceof King) {
                    //     if (this.moveIsLegal(piece, possibleSpace) && !this.kingInCheckAtSpace(piece.getOppositeColor(), possibleSpace)) {
                    //         possibleMoves.push(possibleSpace);
                    //     }
                    // }
                    // else if (piece.canMoveTo(possibleSpace) && this.moveIsLegalDebug(piece, possibleSpace)) {
                    //     possibleMoves.push(possibleSpace);
                    // }
                    if (piece.canMoveTo(possibleSpace) && this.MoveExecutable(piece, possibleSpace)) {
                        possibleMoves.push(possibleSpace);
                    }
                    // console.log("after testing if move legal: " + piece.getPostionString());
                }
            }
        }
        // console.log("inside board.ts after getPossibleMovesPiece, position: " + pieceToMove.getPostionString());
        return possibleMoves;
    }

    getAllPossibleMovesPosition(a: Position): Position[] {
        const possibleMoves: Position[] = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        const movePiece = this.getPieceLocatedAt(a);
        // iterate through all spaces on board
        return this.getPossibleMovesPiece(movePiece);
    }
    /**
     * Checks if king can't move and if no piece can move in between attacking piece and king and no piece can attack attacking piece
     * @param a Position of piece that initiated check (needed to check if opponent can take or block piece)
     */
    playerCheckmated(a: Position): boolean {
        // get location of king
        const kingColor = this.getPieceLocatedAt(a).getOppositeColor();
        const locationKing = this.getLocationOfKingGivenColor(kingColor);
        if (!(this.getAllPossibleMovesPosition(locationKing).length == 0)) {
            return false; // king not stuck
        }
        // figure out if no pieces can move between king and attacking piece
        return !this.checkCanBeBlocked(locationKing, a, kingColor)
    }

    getSpacesBetweenIncludingEnd(a: Position, b: Position): Position[] {
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        const c = new Position(a.getX(), a.getY(), a.getZ());
        const inBetweenSpaces = [];
        while (c != b && this.spaceOnBoard(c)) {
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
            inBetweenSpaces.push(c);
        }
        inBetweenSpaces.push(c);
        return inBetweenSpaces;
    }

    checkCanBeBlocked(positionKing: Position, positionAttacker: Position, kingColor: string) {
        const spaces = this.getSpacesBetweenIncludingEnd(positionKing, positionAttacker);
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(kingColor)) {
                for (let j = 0; j < spaces.length; j++) {
                    if (this.moveIsLegal(this.pieces[i], spaces[j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getMoveCount(): number {
        return this.moveCount;
    }

    kingInCheck(colorOfKingToCheckIfInCheck: string): boolean {
        // color passed is whose just moved
        const kingLocation = this.getLocationOfKingGivenColor(colorOfKingToCheckIfInCheck);
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(colorOfKingToCheckIfInCheck)) {
                if (this.moveIsLegal(this.pieces[i], kingLocation)) {
                    return true;
                }
            }
        }
        return false;
    }

    dummyMethodToDebugPublish() {
        return;
    }
}