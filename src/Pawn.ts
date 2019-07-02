class Pawn extends Piece {


    canMoveTo(position: Position) {

        const distance = this.position.distanceFrom(position)
        if (distance.fileX > 0) {
            return false; // moving along X illegal
        }
        if (distance.rankY < 1 && distance.levelZ < 1) {
            return false; // same postion
        }
        else if (distance.rankY < 1) {
            if (distance.levelZ > 1) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (distance.levelZ < 1) {
            if (distance.rankY > 1) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }
}