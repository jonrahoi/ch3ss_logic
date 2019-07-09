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

    move(a: Position, b: Position): boolean {

    // is there a piece in Position A?
    // are A and B on the Board?
    // move from space a to space b
    // is there a piece in B?
    // if so, is it our team?
    // ask the pieceType if this move shape is good with it
    // is the King in check?
    // would the King be in check if you move that piece?
    // is castling available? (NOT IN RAUMSCHACH)
    // is enPassant available? (NOT IN RAUMSCHACH)
    // if it is a pawn is it moving the right direction


    return true;
    }

    // checks if piece in way of the
    // pieceInWay(a: number, b: number, c: number, x: number, y: number, z: number): boolean {
    //     return false;
    // }


    pieceLocatedAt(a: Position): boolean {

        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return true;
            }
        }
        return false;
    }

    spaceNotOnBoard(a: Position): boolean {
        if (a.getX() < 1 || a.getX() > 5) {
            return true;
        }
        if (a.getY() < 1 || a.getY() > 5) {
            return true;
        }
        if (a.getZ() < 1 || a.getZ() > 5) {
            return true;
        }

    }

    pieceInWay(a: Position, b: Position): boolean {
        // let x = a.getX;
        // iterate through all the places between position a and position b
        if (this.getTypeofPiece(a) == "Knight") {
            return false;
        }
        // TODO

        const dx = this.change(a.getX(), b.getX());
        const dy = this.change(a.getY(), b.getY());
        const dz = this.change(a.getZ(), b.getZ());

        let c = a;
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (c != b || this.spaceNotOnBoard(c)) {
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

    change(a: number, b: number): number {
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