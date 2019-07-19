import { Piece, Position, Color } from "./Piece"


export class Queen extends Piece {
    canMoveTo(position: Position) {
        // Rook like move
        const distance = this.position.distanceFrom(position)
        if (distance.y < 1 && distance.x < 1 && distance.z < 1) {
            return false; // same postion
        }
        else if (distance.y < 1 && distance.x < 1 ) {
            return true; // move only along Z
        }
        else if (distance.x < 1 && distance.z < 1) {
            return true; // move only along Y
        }
        else if (distance.y < 1 && distance.z < 1) {
            return true; // move only along X
        }

        // Bishop moves are basically diagonal moves in two dimensions
        else if (distance.z < 1) {
            if (distance.y == distance.x) {
                return true;
            }
            return false;
        }
        else if (distance.y < 1) {
            if (distance.z == distance.x) {
                return true;
            }
            return false;
        }
        else if (distance.x < 1) {
            if (distance.y == distance.z) {
                return true;
            }
            return false;
        }

        // unicorn moves
        else if (distance.z == distance.y && distance.y == distance.x) {
            return true;
        }
        return false;
    }
    makeCopy(): Piece {
        return new Queen(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}