import { Piece, Position } from "./Piece";
export declare class Bishop extends Piece {
    canMoveTo(position: Position): boolean;
    makeCopy(): Piece;
}
