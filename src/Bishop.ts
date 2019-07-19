import { Piece, Position, Color } from "./Piece"

export class Bishop extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        if (distance.y == 0 && distance.x == 0 && distance.z == 0) {
            return false; // same postion
        }
        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal
        // Bishop moves are basically diagonal moves in two dimensions
        if (distance.z == 0 && distance.y == distance.x) {
            return true;
        }
        if (distance.x == 0 && distance.y == distance.z) {
            return true;
        }
        if (distance.y == 0 && distance.x == distance.z) {
            return true;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Bishop(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}