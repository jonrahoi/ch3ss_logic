class Bishop extends Piece {
    canMoveTo(position: Position) {
        let distance = this.position.distanceFrom(position)

        if (distance.rankY < 1 && distance.fileX < 1 && distance.levelZ < 1) {
            return false; // same postion
        }

        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal

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
        return false;
    }
}