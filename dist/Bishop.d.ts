import { Piece, Position } from "./Piece";
export declare class Bishop extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
