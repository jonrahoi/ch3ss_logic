export type Color = "Black" | "White"

export class Position {
    constructor(
        private x: number,
        private y: number,
        private z: number
    ) { //this.
     }
    distanceFrom(position: Position): {x: number, y: number, z: number} {
        return {
            x: Math.abs(position.x  - this.x),
            y: Math.abs(position.y - this.y),
            z: Math.abs(position.z - this.z)
        }
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    getZ(): number {
        return this.z;
    }
    setX(x: number) {
        this.x = x;
    }
    setY(y: number) {
        this.y = y;
    }
    setZ(z: number) {
        this.z = z;
    }
    getPostionString(): string {
        return this.getX().toString() + this.getY().toString() + this.getZ().toString();
    }
    samePosition(a: Position): boolean {
        if (a.getX() == this.x && a.getY() == this.getY() && a.getZ() == this.getZ()){
            return true;
        }
        return false;
    }
    getCopy(): Position {
        return new Position(this.getX(), this.getY(), this.getZ());
    }
}

export abstract class Piece {
    protected position: Position;
    protected color: string;

    constructor(
        // private readonly color: Color,
        color: string,
        x: number,
        y: number,
        z: number
    ) {
        this.color = color;
        this.position = new Position(x, y, z)
    }
    moveTo(position: Position) {
        this.position = position;
    }

    getPosition(): Position {
        // return new Position(this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
        return this.position.getCopy();
    }

    getPostionString(): string {
        const loc: string = "";
        return this.position.getPostionString();
    }

    getColor(): string {
        if (this.color.localeCompare("White") == 0) {
            return "White";
        }
        return "Black";
    }

    getOppositeColor(): string {
        if (this.color.localeCompare("Black") == 0) {
            return "White";
        }
        return "Black";
    }


    isColor(color: string): boolean {
        return this.color.localeCompare(color) == 0;
    }

    isAtPosition(position: Position): boolean {
        if (position == undefined) {
            return false;
        }
        if (position.getX() == this.position.getX() &&
            position.getY() == this.position.getY() &&
            position.getZ() == this.position.getZ()) {
                return true;
        }
        return false;
    }
    sameColor(b: Piece): boolean {
        return (this.color.localeCompare(b.getColor()) == 0);
    }
    abstract canMoveTo(position: Position): boolean

    abstract makeCopy(): Piece
}
