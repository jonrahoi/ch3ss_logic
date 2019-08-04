import { Piece, Position } from "./Piece";
export declare class Rook extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
