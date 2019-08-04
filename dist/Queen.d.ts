import { Piece, Position } from "./Piece";
export declare class Queen extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
