// game contains a board (with pieces)
// game contains history of moves

class Board {

    private pieces = Board.setupBoard()

    private static setupBoard() {

        return [
            // Level E Black
            // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
            new King("Black", 5, 3, 5),

            // Queens
            //

            // Bishops

            // Unicorns

            // Knights


            // Rooks

            // Pawns

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