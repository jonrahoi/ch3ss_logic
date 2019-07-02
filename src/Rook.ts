class Rook extends Piece {
    canMoveTo(position: Position) {
        // if change along one direction like a rook
        const distance = this.position.distanceFrom(position)
        if (distance.rankY < 1 && distance.fileX < 1 && distance.levelZ < 1) {
            return false; // same postion
        }
        else if (distance.rankY < 1 && distance.fileX < 1 ) {
            return true; // move only along Z
        }
        else if (distance.fileX < 1 && distance.levelZ < 1) {
            return true; // move only along Y
        }
        else if (distance.rankY < 1 && distance.levelZ < 1) {
            return true; // move only along X
        }
        return false;
    }
}