import { Piece, Position, Color } from "./Piece"

export class Bishop extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)

        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false; // same postion
        }

        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal

        else if (distance.z < 1) {
            if (distance.y == distance.x) {
                return true;
            }
            else {
                return false;
            }
        }

        else if (distance.y < 1) {
            if (distance.z == distance.x) {
                return true;
            }
            else {
                return false;
            }
        }

        else if (distance.x < 1) {
            if (distance.y == distance.z) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    makeCopy(): Piece {
        return new Bishop(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}