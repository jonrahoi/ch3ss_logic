export default class Knight extends Piece {
    canMoveTo(position: Position) {
        const distance = this.position.distanceFrom(position)
        let distances: number[];
        distances.push(distance.x);
        distances.push(distance.y);
        distances.push(distance.z);
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