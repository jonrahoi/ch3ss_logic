import { Piece, Position } from "./Piece";
export declare class King extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
