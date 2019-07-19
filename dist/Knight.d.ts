import { Piece, Position } from "./Piece";
export declare class Knight extends Piece {
    canMoveTo(position: Position): boolean;
    makeCopy(): Piece;
}
