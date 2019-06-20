export enum PieceType {
    Pawn,
    Knight,
    Rook,
    Bishop,
    Queen,
    Unicorn,
    King
}

export class Piece {
    isWhite: boolean
    type: PieceType
    constructor(type: PieceType, white: boolean = false) {
        this.isWhite = white
        this.type = type
    }
    validMoves(cb: any, position: any): number[] {
        return [1, 2, 3]
    }
}