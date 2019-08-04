import { Piece, Position } from "./Piece"

export class Rook extends Piece {
    moveShapeCorrect(position: Position) {
        // if change along one direction like a rook
        const distance = this.position.distanceFrom(position)
        if (distance.y == distance.x && distance.x == distance.z) {
            return false; // all 0, also all same
        }
        // not all same, test if two are
        else if (distance.y == 0 && distance.x == 0 ) {
            return true; // move only along Z
        }
        else if (distance.x == 0 && distance.z == 0) {
            return true; // move only along Y
        }
        else if (distance.y == 0 && distance.z == 0) {
            return true; // move only along X
        }
        return false;
    }
    makeCopy(): Piece {
        return new Rook(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}