import { Piece, Position } from "./Piece"

export class King extends Piece {
    canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position);
        if (distance.y == 0 && distance.x == 0 && distance.z == 0) {
            return false;
        }
        return distance.y < 2 && distance.x < 2 && distance.z < 2
    }
    makeCopy(): Piece {
        return new King(this.getColor(), this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
    }
}