import Knight from "./Knight"

// game contains a board (with pieces)
// game contains history of moves

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

    // for (const piece in this.pieces) {
    //     if (piece instanceof King){

    //     }
    // }

    return true;
    }

    // checks if piece in way of the
    pieceInWay(a: string, b: string): boolean {
        return false;
    }

}