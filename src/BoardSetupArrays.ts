import { Piece, Position } from "./Piece"
import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"


/**** note the piece declaration is (x,y,z) instead of (z,x,y) so Ec5(5,3,5) in normal Raumschach notation becomes 3,5,5 for our purposes*/


export function getRaumschachBoard(white: string, black: string): Piece[] {
    console.log("inside get board setup array.ts")
    return [
        // Level E Black
        // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
        // note the piece declaration is (x,y,z) instead of (z,x,y) so Ec5(5,3,5) becomes 3,5,5
        new King(black, 3, 5, 5),
        new Rook(black, 1, 5, 5),
        new Rook(black, 5, 5, 5),
        new Knight(black, 2, 5, 5),
        new Knight(black, 4, 5, 5),
        new Pawn(black, 1, 4, 5),
        new Pawn(black, 2, 4, 5),
        new Pawn(black, 3, 4, 5),
        new Pawn(black, 4, 4, 5),
        new Pawn(black, 5, 4, 5),

        // Level D Black
        // Queen Dc5; Bishop Da5, Dd5; Unicorn Db5, De5; Pawn Da4, Db4, Dc4; Dd4; De4
        new Queen(black, 3, 5, 4),
        new Bishop(black, 1, 5, 4),
        new Bishop(black, 4, 5, 4),
        new Unicorn(black, 2, 5, 4),
        new Unicorn(black, 5, 5, 4),
        new Pawn(black, 1, 4, 4),
        new Pawn(black, 2, 4, 4),
        new Pawn(black, 3, 4, 4),
        new Pawn(black, 4, 4, 4),
        new Pawn(black, 5, 4, 4),

        // // Level C Empty at beginning

        // // Level B White
        // // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
        new Queen(white, 3, 1, 2),
        new Bishop(white, 1, 1, 2),
        new Bishop(white, 4, 1, 2),
        new Unicorn(white, 2, 1, 2),
        new Unicorn(white, 5, 1, 2),
        new Pawn(white, 1, 2, 2),
        new Pawn(white, 2, 2, 2),
        new Pawn(white, 3, 2, 2),
        new Pawn(white, 4, 2, 2),
        new Pawn(white, 5, 2, 2),

        // // Level A White
        // // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
        new King(white, 3, 1, 1),
        new Rook(white, 1, 1, 1),
        new Rook(white, 5, 1, 1),
        new Knight(white, 2, 1, 1),
        new Knight(white, 4, 1, 1),
        new Pawn(white, 1, 2, 1),
        new Pawn(white, 2, 2, 1),
        new Pawn(white, 3, 2, 1),
        new Pawn(white, 4, 2, 1),
        new Pawn(white, 5, 2, 1),
    ]
}