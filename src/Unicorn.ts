import { Piece, Position } from "./Piece"

export class Unicorn extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)

        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false; // same postion
        }
        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal

        else if (distance.z == distance.y && distance.y == distance.x) {
            return true;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Unicorn(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}