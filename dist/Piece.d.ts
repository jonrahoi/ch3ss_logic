declare type Color = "Black" | "White";
declare class Position {
    private x;
    private y;
    private z;
    constructor(x: number, y: number, z: number);
    distanceFrom(position: Position): {
        z: number;
        x: number;
        y: number;
    };
    move(): void;
}
declare abstract class Piece {
    private readonly color;
    protected position: Position;
    constructor(color: Color, x: number, y: number, z: number);
    moveTo(position: Position): void;
    abstract canMoveTo(position: Position): boolean;
}
