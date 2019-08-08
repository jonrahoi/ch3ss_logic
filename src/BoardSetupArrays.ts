import { Piece, Position } from "./Piece"
import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { WHITE, BLACK } from "./constants"
/**** note the piece declaration is (x,y,z) instead of (z,x,y) so Ec5(5,3,5) in normal Raumschach notation becomes 3,5,5 for our purposes*/

export function getRaumschachBoardSetup(): Piece[] {
    return [
        // Level E BLACK
        // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
        // note the piece declaration is (x,y,z) instead of (z,x,y) so Ec5(5,3,5) becomes 3,5,5
        new King(BLACK, 3, 5, 5),
        new Rook(BLACK, 1, 5, 5),
        new Rook(BLACK, 5, 5, 5),
        new Knight(BLACK, 2, 5, 5),
        new Knight(BLACK, 4, 5, 5),
        new Pawn(BLACK, 1, 4, 5),
        new Pawn(BLACK, 2, 4, 5),
        new Pawn(BLACK, 3, 4, 5),
        new Pawn(BLACK, 4, 4, 5),
        new Pawn(BLACK, 5, 4, 5),

        // Level D BLACK
        // Queen Dc5; Bishop Da5, Dd5; Unicorn Db5, De5; Pawn Da4, Db4, Dc4; Dd4; De4
        new Queen(BLACK, 3, 5, 4),
        new Bishop(BLACK, 1, 5, 4),
        new Bishop(BLACK, 4, 5, 4),
        new Unicorn(BLACK, 2, 5, 4),
        new Unicorn(BLACK, 5, 5, 4),
        new Pawn(BLACK, 1, 4, 4),
        new Pawn(BLACK, 2, 4, 4),
        new Pawn(BLACK, 3, 4, 4),
        new Pawn(BLACK, 4, 4, 4),
        new Pawn(BLACK, 5, 4, 4),

        // // Level C Empty at beginning

        // // Level B WHITE
        // // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
        new Queen(WHITE, 3, 1, 2),
        new Bishop(WHITE, 1, 1, 2),
        new Bishop(WHITE, 4, 1, 2),
        new Unicorn(WHITE, 2, 1, 2),
        new Unicorn(WHITE, 5, 1, 2),
        new Pawn(WHITE, 1, 2, 2),
        new Pawn(WHITE, 2, 2, 2),
        new Pawn(WHITE, 3, 2, 2),
        new Pawn(WHITE, 4, 2, 2),
        new Pawn(WHITE, 5, 2, 2),

        // // Level A WHITE
        // // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
        new King(WHITE, 3, 1, 1),
        new Rook(WHITE, 1, 1, 1),
        new Rook(WHITE, 5, 1, 1),
        new Knight(WHITE, 2, 1, 1),
        new Knight(WHITE, 4, 1, 1),
        new Pawn(WHITE, 1, 2, 1),
        new Pawn(WHITE, 2, 2, 1),
        new Pawn(WHITE, 3, 2, 1),
        new Pawn(WHITE, 4, 2, 1),
        new Pawn(WHITE, 5, 2, 1),
    ]
}