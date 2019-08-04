import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Piece, Position } from "./Piece"

/** Piece Notations for display on 2D space, number of spaces in notation is 4 */
const boardEmptySpace = "_____";
const whiteNotation = "W_";
const blackNotation = "B_";
const pawnNotation = "Pwn";
const rookNoation = "Rok";
const knightNotation = "Kht";
const bishopNotation = "Bhp";
const unicornNotation = "Uni";
const queenNotation = "Que";
const kingNotation = "Kng";

/**
 * Displays board by slicing along z axis and put in array where each line is an element of the array
 * @param pieces pieces on board
 * @param sizeOfBoardX x size, as in the board is 5 spaces across
 * @param sizeOfBoardY y size
 * @param sizeOfBoardZ z size
 * @param boardCoordinateMinimum where a corner is, for example (1, 1, 1)
 */
export function getBoardStateStringArraySliceByZ(pieces: Piece[], sizeOfBoardX: number, sizeOfBoardY: number, sizeOfBoardZ: number, boardCoordinateMinimum: number): String[] {
    const arrToDisplay = [];
    arrToDisplay.push("Board state, sliced by Z coordinate value:");
    const board: string[][][] = [];
    for (let i = 0; i < sizeOfBoardX; i++) {
        board[i] = [];
        for (let j = 0; j < sizeOfBoardY; j++) {
            board[i][j] = [];
            for (let k = 0; k < sizeOfBoardZ; k++) {
                board[i][j][k] = boardEmptySpace;
            }
        }
    }
    for (let i = 0; i < pieces.length; i++) {
        const a = pieces[i].getPosition();
        board[a.getX() - boardCoordinateMinimum][a.getY() - boardCoordinateMinimum][a.getZ() - boardCoordinateMinimum] = getPieceNotation(pieces[i]);
    }
    for (let z = sizeOfBoardZ - boardCoordinateMinimum; z >= 0; z--) {
        arrToDisplay.push("level(Z): " + (z + boardCoordinateMinimum));
        for (let y = sizeOfBoardY - boardCoordinateMinimum; y >= 0; y--) {
            let row = "";
            row += "|";
            for (let x = 0; x <= sizeOfBoardX - boardCoordinateMinimum; x++) {
                row += board[x][y][z];
                row += "|";
            }
            arrToDisplay.push(row);
        }
        arrToDisplay.push(" ");
    }
    return arrToDisplay;
}
/**
 * Function to get a string to represent a piece
 * @param piece piece to get notation of
 */
function getPieceNotation(piece: Piece): string {
    let a = whiteNotation;
    if (piece.isColor("Black")) {
        a = blackNotation;
    }
    if (piece instanceof Pawn) { return a + pawnNotation }
    if (piece instanceof Rook) { return a + rookNoation }
    if (piece instanceof Knight) { return a + knightNotation }
    if (piece instanceof Bishop) { return a + bishopNotation }
    if (piece instanceof Unicorn) { return a + unicornNotation }
    if (piece instanceof Queen) { return a + queenNotation }
    // if (piece instanceof King) { return a + this.kingNotation }
    return a + kingNotation;
}