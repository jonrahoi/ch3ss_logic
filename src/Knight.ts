import { Piece, Position } from "./Piece"

export class Knight extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        const distances: number[] = [];
        distances.push(distance.x);
        distances.push(distance.y);
        distances.push(distance.z);
        // some combination of 0,1,2
        if ((distance.x + distance.y + distance.z) != 3) {
            return false;
        }
        if (distance.x > 2 || distance.y > 2 || distance.z > 2) {
            return false;
        }
        // tests if distance is 1,1,1
        if (distance.x == distance.y) {
            return false;
        }
        return true;
    }
    makeCopy(): Piece {
        return new Knight(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}