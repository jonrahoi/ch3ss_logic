export declare type Color = "Black" | "White";
export declare class Position {
    private x;
    private y;
    private z;
    constructor(x: number, y: number, z: number);
    distanceFrom(position: Position): {
        z: number;
        x: number;
        y: number;
    };
    getX(): number;
    getY(): number;
    getZ(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    move(): void;
}
export declare abstract class Piece {
    private readonly color;
    protected position: Position;
    constructor(color: Color, x: number, y: number, z: number);
    moveTo(position: Position): void;
    getPosition(): Position;
    getPostionString(): string;
    getColor(): string;
    getName(): any;
    abstract canMoveTo(position: Position): boolean;
    isAtPosition(position: Position): boolean;
    isBlockingMove(a: Position, b: Position): boolean;
}
