import { Piece, Position, Color } from "./Piece"

export class Bishop extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        if (distance.y == 0 && distance.x == 0 && distance.z == 0) {
            return false; // same postion
        }
        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal
        if (distance.z == 0) {
            if (distance.y == distance.x) {
                return true;
            }
            return false;
        }
        if (distance.y == 0) {
            if (distance.z == distance.x) {
                return true;
            }
            return false;
        }
        if (distance.x == 0) {
            if (distance.y == distance.z) {
                return true;
            }
            return false;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Bishop(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}