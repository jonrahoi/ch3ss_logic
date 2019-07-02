class Queen extends Piece {
    canMoveTo(position: Position) {
        // Rook like move
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

        // Bishop moves are basically diagonal moves in two dimensions
        else if (distance.levelZ < 1) {
            if (distance.rankY == distance.fileX) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (distance.rankY < 1) {
            if (distance.levelZ == distance.fileX) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (distance.fileX < 1) {
            if (distance.rankY == distance.levelZ) {
                return true;
            }
            else {
                return false;
            }
        }

        // unicorn moves
        else if (distance.levelZ == distance.rankY && distance.rankY == distance.fileX) {
            return true;
        }

        return false;
    }
}