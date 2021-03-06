export declare class Position {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    distanceFrom(position: Position): {
        x: number;
        y: number;
        z: number;
    };
    getX(): number;
    getY(): number;
    getZ(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    getPostionString(): string;
    samePosition(a: Position): boolean;
    getCopy(): Position;
}
export declare abstract class Piece {
    protected position: Position;
    protected color: string;
    constructor(color: string, x: number, y: number, z: number);
    setPosition(position: Position): void;
    getPosition(): Position;
    getPostionString(): string;
    getColor(): string;
    getOppositeColor(): string;
    isColor(color: string): boolean;
    isAtPosition(position: Position): boolean;
    abstract moveShapeCorrect(position: Position): boolean;
    abstract makeCopy(): Piece;
}
