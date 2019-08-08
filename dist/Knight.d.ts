import { Piece, Position } from "./Piece";
export declare class Knight extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
