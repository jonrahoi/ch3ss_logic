class King extends Piece {
    canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position)
        return distance.y < 2 && distance.x < 2 && distance.z < 2
    }
}