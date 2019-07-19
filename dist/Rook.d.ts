import { Piece, Position } from "./Piece";
export declare class Rook extends Piece {
    canMoveTo(position: Position): boolean;
    makeCopy(): Piece;
}
