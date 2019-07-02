class Knight extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)

        const z = distance.levelZ;
        const x = distance.fileX;
        const y = distance.rankY;
        if (z == 0) {

            if (x == 1 && y == 2) {
                return true;
            }
            else if (x == 2 && y == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (y == 0) {
            if (x == 1 && z == 2) {
                return true;
            }
            else if (x == 2 && z == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (x == 0) {
            if (y == 1 && z == 2) {
                return true;
            }
            else if (y == 2 && z == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
}