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
type LevelZ = "A" | "B" | "C" | "D" | "E"
type FileX = "a" | "b" | "c" | "d" | "e"
type RankY = 1 | 2 | 3 | 4 | 5


class Position {
    constructor(
        private levelZ: LevelZ,
        private fileX: FileX,
        private rankY: RankY
    )
    {}
    distanceFrom(position: Position) {
        return {
            levelZ: Math.abs(position.levelZ.charCodeAt(0 - this.levelZ.charCodeAt(0))),
            fileX: Math.abs(position.fileX.charCodeAt(0 - this.fileX.charCodeAt(0))),
            rankY: Math.abs(position.rankY = this.rankY)
        }
    }
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
        levelZ: LevelZ,
        fileX: FileX,
        rankY: RankY
    ) {
        this.position = new Position(levelZ, fileX, rankY)
    }
    moveTo(position: Position) {
        this.position = position
    }
    abstract canMoveTo(position: Position): boolean

}
