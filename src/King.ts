class King extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        return distance.rankY < 2 && distance.fileX < 2 && distance.levelZ < 2
    }
}