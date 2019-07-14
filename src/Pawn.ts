import { Piece, Position, Color } from "./Piece"

export class Pawn extends Piece {


    canMoveTo(position: Position) {

        const distance = this.position.distanceFrom(position);
        if (distance.x != 0) {
            return false; // moving along X illegal
        }

        if (distance.y == 0 && distance.z == 1) {
            return true;
        }
        if (distance.y == 1 && distance.z == 0) {
            return true;
        }
        return false;
        // if (distance.y < 1 && distance.z < 1) {
        //     return false; // same postion
        // }
        // else if (distance.y < 1) {
        //     if (distance.z > 1) {
        //         return false;
        //     }
        //     else {
        //         return true;
        //     }
        // }
        // else if (distance.z < 1) {
        //     if (distance.y > 1) {
        //         return false;
        //     }
        //     else {
        //         return true;
        //     }
        // }
        // return false;
    }
}