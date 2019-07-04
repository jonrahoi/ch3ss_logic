class Rook extends Piece {
    canMoveTo(position: Position) {
        // if change along one direction like a rook
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
        return false;
    }
}