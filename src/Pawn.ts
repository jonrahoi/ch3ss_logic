import { Piece, Position, Color } from "./Piece"

export class Pawn extends Piece {
    canMoveTo(position: Position) {

        const distance = this.position.distanceFrom(position);
        if (distance.x != 0) {
            return false; // moving along X illegal
        }

        if (distance.y == 0 && distance.z == 1) {
            return true;
        }
        if (distance.y == 1 && distance.z == 0) {
            return true;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Pawn(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}