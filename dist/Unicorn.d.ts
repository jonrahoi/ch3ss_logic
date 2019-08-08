import { Piece, Position } from "./Piece";
export declare class Unicorn extends Piece {
    moveShapeCorrect(position: Position): boolean;
    makeCopy(): Piece;
}
