import { Piece, Position, Color } from "./Piece"

export class Knight extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        const distances: number[] = [distance.x, distance.y, distance.z];
        // some combination of 0,1,2
        // sum of the abs of the distances should be 3
        // one is zero
        // none are 3
        let sum: number;
        let countOnes = 0;
        for (let i = 0; i < 3; i++) {
            sum += distances[i];
            if (distances[i] > 3) {
                return false;
            }
            if (distances[i] == 1) {
                countOnes++;
                if (countOnes > 1) {
                    return false;
                }
            }
        }
        if (sum > 3) {
            return false;
        }
        return true;
    }
}