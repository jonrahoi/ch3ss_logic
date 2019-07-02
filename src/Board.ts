//game contains a board (with pieces)
//game contains history of moves

class Board{

    private pieces = Board.setupBoard()

    private static setupBoard() {
    
        return [
            // Level E Black
            //King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
            new King("Black", "E", "c", 5),

            //Queens
            //

            //Bishops

            //Unicorns

            //Knights


            //Rooks

            //Pawns

        ]
    }

    move(a: string, b: string): boolean {
    // move from space a to space b
    // are spaces valid
    // is there a piece there to be moved
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