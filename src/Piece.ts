// export enum PieceType {
//     Pawn,
//     Knight,
//     Rook,
//     Bishop,
//     Queen,
//     Unicorn,
//     King
// }


type Color = "Black" | "White"

class Position {
    constructor(
        private x: number,
        private y: number,
        private z: number
    ) { }
    distanceFrom(position: Position): {z: number, x: number, y: number} {
        return {
            z: Math.abs(position.z - this.z),
            x: Math.abs(position.x  - this.x),
            y: Math.abs(position.y = this.y)
        }
    }
    move() {}
}


// export class Piece {
//     isWhite: boolean
//     type: PieceType
//     constructor(type: PieceType, white: boolean = false) {
//         this.isWhite = white
//         this.type = type
//     }
//     validMoves(cb: any, position: any): number[] {
//         return [1, 2, 3]
//     }
// }

abstract class Piece {
    protected position: Position
    constructor(
        private readonly color: Color,
        x: number,
        y: number,
        z: number
    ) {
        this.position = new Position(z, x, y)
    }
    moveTo(position: Position) {
        this.position = position
    }
    abstract canMoveTo(position: Position): boolean
}
