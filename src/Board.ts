import Knight from "./Knight"

// game contains a board (with pieces)
// game contains history of moves

class Point {
    constructor(
        private x: number,
        private y: number,
        private z: number
    ) { }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getZ(): number {
        return this.z;
    }
    move() {}
}

export default class Board {

    private pieces = Board.setupBoard()
    private moves = 0;

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

            // Level C Empty at beginning

            // Level B White
            // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
            new Queen("Black", 3, 1, 2),
            new Bishop("Black", 1, 1, 2),
            new Bishop("Black", 4, 1, 2),
            new Unicorn("Black", 2, 1, 2),
            new Unicorn("Black", 5, 1, 2),
            new Pawn("Black", 1, 2, 2),
            new Pawn("Black", 2, 2, 2),
            new Pawn("Black", 3, 2, 2),
            new Pawn("Black", 4, 2, 2),
            new Pawn("Black", 5, 2, 2),

            // Level A White
            // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
            new King("Black", 3, 1, 1),
            new Rook("Black", 1, 5, 1),
            new Rook("Black", 5, 5, 1),
            new Knight("Black", 2, 5, 1),
            new Knight("Black", 4, 5, 1),
            new Pawn("Black", 1, 4, 1),
            new Pawn("Black", 2, 4, 1),
            new Pawn("Black", 3, 4, 1),
            new Pawn("Black", 4, 4, 1),
            new Pawn("Black", 5, 4, 1),
        ]
    }

    executeMove(a: Position, b: Position): boolean {

        // are A and B on the Board?
        if (!this.spaceOnBoard(a) || !this.spaceOnBoard(b)) {
            return false;
        }
        // is there a piece in Position A?
        if (!this.pieceLocatedAt(a)) {
            return false;
        }

        // TODO probably change above method to return the piece at space A, will reduce iterating through pieces and increase efficiency

        // is it the right color
        if ((this.moves % 2 == 1 && this.colorOfPieceIsWhite(a)) || (this.moves % 2 == 0 && !this.colorOfPieceIsWhite(a))) {
            return false;
        }
        let enemyPieceAtB = false;
        // is there a piece at space B?
        // TODO probably change to returning piece at B to increase efficiency
        if (this.pieceLocatedAt(b)) {
            // is the piece there on the same team?
            if ((this.moves % 2 == 0 && this.colorOfPieceIsWhite(b)) || (this.moves % 2 == 1 && !this.colorOfPieceIsWhite(b))) {
                return false;
            }
            enemyPieceAtB = true;
        }
        // is the move shape correct for that piece
        if (!this.moveShapeCorrectForPiece(a, b)) {
            return false;
        }
        let whoseTurn = "White";
        if (this.moves % 2 == 1) {
            whoseTurn = "Black";
        }
        // get current location of king
        const whoseTurnKingPosition = this.getLocationOfKingGivenColor(whoseTurn);

        // is the King in check?, if you're king is in check then you have to move the king
        if (this.playersKingInCheckAtSpace(whoseTurn, whoseTurnKingPosition) && this.getLocationOfKingGivenColor(whoseTurn) != a) {
            return false;
        }
        // is King moving into check?
        if (this.playersKingInCheckAtSpace(whoseTurn, b)) {
            return false;
        }
        // if it is a pawn is it moving the right direction
        if (this.getTypeofPiece(a) instanceof Pawn) {
            if (!this.pawnMoveDirectionCorrect(whoseTurn, a, b)) {
                return false;
            }
        }
        // delete piece if there
        if (enemyPieceAtB) {
            this.deletePieceAtPosition(b);
        }
        // move pieces
        this.getPieceLocatedAt(a).moveTo(b);
        // increment move count
        this.moves++;
        return true; // move executed successfully

        // TODO
        // is castling available? (NOT IN RAUMSCHACH)
        // is enPassant available? (NOT IN RAUMSCHACH)
    }

    pawnMoveDirectionCorrect(whoseTurn: string, a: Position, b: Position): boolean {
        // if white needs to move up(dz is positive) or across (dy is positive)
        // if black needs to move down(dz is negative) or across (dy is positive)
        const dy = this.slope(a.getY(), b.getY());
        const dz = this.slope(a.getZ(), b.getZ());
        if (whoseTurn.localeCompare("White") && dy >= 0 && dz >= 0) {
            return true;
        }
        if (whoseTurn.localeCompare("Black") && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    }

    deletePieceAtPosition(b: Position) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isAtPosition(b)) {
                delete this.pieces[i];
                return;
            }
        }
    }
    // TODO check, checkmate, draw
    isKingInCheckNow(): boolean {

        return false;
    }

    isKingCheckMated(): boolean {
        // is the
        return false;
    }

    // check for draw
    canKingMove(): boolean {

        return true;
    }

    playersKingInCheckAtSpace(whoseTurn: string, positionKing: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            // if opposing team, can move to where the King is, and isn't blocked
            if (!this.pieces[i].getColor().localeCompare("whoseTurn") && 
            this.pieces[i].canMoveTo(positionKing) && 
            !this.pieceInWay(this.pieces[i].getPosition(), positionKing)) {
                return true;
            }
        }

        return false;
    }

    getLocationOfKingGivenColor(color: string): Position {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King && this.pieces[i].getColor().localeCompare(color)) {
                return this.pieces[i].getPosition();
            }
        }

    }

    moveShapeCorrectForPiece(a: Position, b: Position): boolean {

        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                if (this.pieces[i].canMoveTo(b)) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }
    pieceLocatedAt(a: Position): boolean {

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

    colorOfPieceIsWhite(a: Position): boolean {

        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a) && this.pieces[i].getColor().localeCompare("White") == 0) {
                return true;
            }
        }
        return false;
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
        if (this.getTypeofPiece(a) == "Knight") {
            return false;
        }

        const dx = this.slope(a.getX(), b.getX());
        const dy = this.slope(a.getY(), b.getY());
        const dz = this.slope(a.getZ(), b.getZ());
        let c: Position;
        c = a;
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (c != b && this.spaceOnBoard(c)) {
            if (this.pieceLocatedAt(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    }

    getTypeofPiece(a: Position): any {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i].getName;
            }
        }
    }

    slope(a: number, b: number): number {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    }

    // TODO taking a piece code, removing from board
    // TODO checkmates, draw
}