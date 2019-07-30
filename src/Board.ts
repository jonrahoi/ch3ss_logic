import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Piece, Position} from "./Piece"
import { threadId } from "worker_threads";

// game contains a board (with pieces)
// game contains history of moves

export default class Board {

    private pieces = Board.setupBoard()
    private moveCount = 0;
    private piecesTaken: Piece[] = [];
    private sizeOfBoardX = 5;
    private sizeOfBoardY = 5;
    private sizeOfBoardZ = 5;
    private boardCoordinateMinimum = 1;

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
            const newQueen = new Queen(movePiece.getColor(), a.getX(), a.getY(), a.getZ());
            this.pieces.push(newQueen);
            newQueen.moveTo(b);
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

    moveIsLegalIgnoreSpecificPiece(movePiece: Piece, b: Position, pieceToIgnore: Piece): boolean {
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
        if (this.pieceInWayEvenIgnoringPiece(movePiece.getPosition(), b, pieceToIgnore)) {
            // console.log("inside moveIsLegal, piece is in way")
            return false;
        }
        // console.log("inside moveIsLegal, returning move legal")
        return true;
    }

    checkForQueening(movePiece: Piece, b: Position): boolean {
        // moving to position
        if (!(movePiece instanceof Pawn)) {
            return false;
        }
       if (movePiece.isColor("White") && b.getY() == this.sizeOfBoardY && b.getZ() >= this.sizeOfBoardZ - 1 ||
        movePiece.isColor("Black") && b.getY() == this.boardCoordinateMinimum && b.getZ() <= (this.boardCoordinateMinimum + 1)) {
           return true;
       }
    }

    // for loading
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
            return;
        }
        // move piece
        this.getPieceLocatedAt(a).moveTo(b);
    }

    kingInCheckFromPosition(pos: Position): boolean {
        // find opposite color
        console.log("hello, inside board.kingInCheckFromPosition");
        console.log("inside board.kingInCheckFromPosition " + pos.getPostionString());
        let color = "Black";
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
                if (this.getAllPossibleMovesPosition(this.pieces[i].getPosition()).length > 0) {
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
                pieces.push(this.pieces[i].makeCopy());
            }
        }
        return pieces;
    }

    getPieces(): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            pieces.push(this.pieces[i].makeCopy());
        }
        return pieces;
    }

    getPiecesTaken(): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.piecesTaken.length; i++) {
            pieces.push(this.piecesTaken[i].makeCopy());
        }
        return pieces;
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
        const newPieces: Piece[] = [];
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
        // console.log("inside board.kingInCheckAtSpace, position: " + positionKing.getPostionString())
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
                return new Position(this.pieces[i].getPosition().getX(), this.pieces[i].getPosition().getY(), this.pieces[i].getPosition().getZ());
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

    private getPieceLocatedAt(a: Position): Piece {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i];
            }
        }
    }

    spaceOnBoard(a: Position): boolean {
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

    pieceInWay(a: Position, b: Position): boolean {
        // iterate through all the places between position a and position b
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
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

    pieceInWayEvenIgnoringPiece(a: Position, b: Position, pieceToIgnore: Piece): boolean {
        // iterate through all the places between position a and position b
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        // console.log("slopes: " + dx, dy, dz)
        const c = new Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (!c.samePosition(b) && this.spaceOnBoard(c)) {
            // console.log("Positions in piece in way: " + c.getPostionString() + "  " + b.getPostionString())
            if (c.samePosition(pieceToIgnore.getPosition())) {
                continue;
            }
            if (this.pieceLocatedAtBool(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    }

    pieceInWayIgnoreSpecificPiece(a: Position, b: Position): boolean {
        // iterate through all the places between position a and position b
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
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
    getAllPossibleMovesPosition(a: Position): Position[] {
        const possibleMoves: Position[] = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        const movePiece = this.getPieceLocatedAt(a);
        // iterate through all spaces on board
        for (let x = 1; x <= this.sizeOfBoardX; x++) {
            for (let y = 1; y <= this.sizeOfBoardY; y++) {
                for (let z = 1; z <= this.sizeOfBoardZ; z++) {
                    // create a position with the three iterators
                    const possibleSpace: Position = new Position(x, y, z);
                    if (movePiece instanceof King) {
                        if (movePiece.canMoveTo(possibleSpace) && !this.kingInCheckAtSpace(movePiece.getOppositeColor(), possibleSpace)) {
                            possibleMoves.push(possibleSpace);
                        }
                    }
                    // else if (piece.canMoveTo(possibleSpace) && this.moveIsLegalDebug(piece, possibleSpace)) {
                    //     possibleMoves.push(possibleSpace);
                    // }
                    else if (movePiece.canMoveTo(possibleSpace) && this.MoveExecutable(movePiece, possibleSpace)) {
                        possibleMoves.push(possibleSpace);
                    }
                    // console.log("after testing if move legal: " + piece.getPostionString());
                }
            }
        }
        // console.log("inside board.ts after getPossibleMovesPiece, position: " + pieceToMove.getPostionString());
        return possibleMoves;
    }

    /**
     * Checks if king can't move and if no piece can move in between attacking piece and king and no piece can attack attacking piece
     * @param a Position of piece that initiated check (needed to check if opponent can take or block piece)
     */
    playerCheckmated(kingColor: string): boolean {
        // get location of king
        const locationKing = this.getLocationOfKingGivenColor(kingColor);
        if (!(this.getAllPossibleMovesPosition(locationKing).length == 0)) {
            return false; // king not stuck
        }
        // figure out if no pieces can move between king and attacking piece
        // get number of pieces that can move to location of king
        const piecesThatCanAttackKing: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(kingColor) && this.moveIsLegal(this.pieces[i], locationKing)) {
                piecesThatCanAttackKing.push(this.pieces[i]);
            }
        }
        if (piecesThatCanAttackKing.length > 1) {
            return true;
        }
        else if (piecesThatCanAttackKing.length == 1) {
            return !this.checkCanBeBlockedWithoutCreatingAnotherCheck(locationKing, piecesThatCanAttackKing[1].getPosition(), kingColor)
        }
        return false;
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

    checkCanBeBlockedWithoutCreatingAnotherCheck(positionKing: Position, positionAttacker: Position, kingColor: string) {
        const spacesThatWouldBlockCheck = this.getSpacesBetweenIncludingEnd(positionKing, positionAttacker);
        // iterate through pieces that would block check
        for (let i = 0; i < this.pieces.length; i++) {
            // iterate through spaces and check if piece appropriate color && can move to a blocking position
            for (let j = 0; j < spacesThatWouldBlockCheck.length; j++) {
                if (this.pieces[i].isColor(kingColor) && this.moveIsLegal(this.pieces[i], spacesThatWouldBlockCheck[j])) {
                    // check if piece moves to that blocking position, is there another piece that can attack the king
                    for (let k = 0; k < this.pieces.length; k++) {
                        if (i != k && this.moveIsLegalIgnoreSpecificPiece(this.pieces[k], positionKing, this.pieces[i])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }

    getMoveCount(): number {
        return this.moveCount;
    }

    kingInCheck(colorOfKingToCheckIfInCheck: string): boolean {
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

    kingsPresentOnBoardDebug(): boolean {
        let count = 0;
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King) {
                count++;
            }
        }
        return (count == 2);
    }

    // TODO insufficient material
}