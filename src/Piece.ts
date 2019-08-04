import { WHITE, BLACK } from "./constants"

/**
 * Position class that represents position on board with an x, y, and z coordinate
 */
export class Position {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
     }
    /**
     * Method to return distance from another position
     * @param position other position
     */
    distanceFrom(position: Position): {x: number, y: number, z: number} {
        return {
            x: Math.abs(position.x  - this.x),
            y: Math.abs(position.y - this.y),
            z: Math.abs(position.z - this.z)
        }
    }
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getZ(): number {
        return this.z;
    }
    public setX(x: number) {
        this.x = x;
    }
    public setY(y: number) {
        this.y = y;
    }
    public setZ(z: number) {
        this.z = z;
    }
    /**
     * Returns a string in the format xyz as in 111
     */
    public getPostionString(): string {
        return this.getX().toString() + this.getY().toString() + this.getZ().toString();
    }
    /**
     * Checks if position is same
     * @param a
     */
    public samePosition(a: Position): boolean {
        if (a.getX() == this.x && a.getY() == this.getY() && a.getZ() == this.getZ()) {
            return true;
        }
        return false;
    }
    /**
     * Returns a copy of the position
     */
    public getCopy(): Position {
        return new Position(this.getX(), this.getY(), this.getZ());
    }
}
/**
 * abstract class for pieces, piece has position and color. Pieces know what spaces they can move
 * relative to their own by calculating absolute distance in each coordinate axis
 */
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
    /**
     * Sets position
     * @param position new position
     */
    public setPosition(position: Position) {
        this.position = position;
    }
    /**
     * Returns a copy of the current position
     */
    public getPosition(): Position {
        // return new Position(this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
        return this.position.getCopy();
    }
    /**
     * Returns a string in the format xyz as in 111
     */
    public getPostionString(): string {
        const loc: string = "";
        return this.position.getPostionString();
    }
    /**
     * Returns the color of piece
     */
    public getColor(): string {
        if (this.color.localeCompare(WHITE) == 0) {
            return WHITE;
        }
        return BLACK;
    }
    /**
     * Gets the opposite color of the piece
     */
    public getOppositeColor(): string {
        if (this.color.localeCompare(BLACK) == 0) {
            return WHITE;
        }
        return WHITE;
    }
    /**
     * Checks if the color of the piece is the same as the passed parameter
     * @param color string for color
     */
    public isColor(color: string): boolean {
        return this.color.localeCompare(color) == 0;
    }
    /**
     * checks if piece is at position
     * @param position position to compare to
     */
    public isAtPosition(position: Position): boolean {
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
    /**
     * checks if position is a legal geometric change
     * @param position
     */
    abstract moveShapeCorrect(position: Position): boolean
    /**
     * gets a copy of a piece
     */
    abstract makeCopy(): Piece
}
