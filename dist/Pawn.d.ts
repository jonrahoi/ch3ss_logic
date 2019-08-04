import { Piece, Position } from "./Piece";
export declare class Pawn extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
