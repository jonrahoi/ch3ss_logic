import { Piece, Position } from "./Piece"


export class Queen extends Piece {
    moveShapeCorrect(position: Position) {
        // Rook like move
        const distance = this.position.distanceFrom(position)
        if (distance.y == 0 && distance.x == 0 && distance.z == 0) {
            return false; // same postion
        }
        else if (distance.y == 0 && distance.x == 0 ) {
            return true; // move only along Z
        }
        else if (distance.x == 0 && distance.z == 0) {
            return true; // move only along Y
        }
        else if (distance.y == 0 && distance.z == 0) {
            return true; // move only along X
        }

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
        // unicorn moves
        if (distance.z == distance.y && distance.y == distance.x) {
            return true;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Queen(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}