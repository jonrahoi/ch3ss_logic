class Unicorn extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)

        if (distance.rankY < 1 && distance.fileX < 1 && distance.levelZ < 1) {
            return false; // same postion
        }

        // two out of three distance has to be greater than 0
        // those two non-zero numbers have to be equal

        else if (distance.levelZ == distance.rankY && distance.rankY == distance.fileX) {
            return true;
        }
        return false;
    }
}