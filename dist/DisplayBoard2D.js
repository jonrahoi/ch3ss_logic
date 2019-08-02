"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var Bishop_1 = require("./Bishop");
var Rook_1 = require("./Rook");
var Unicorn_1 = require("./Unicorn");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
var boardEmptySpace = "_____";
var whiteNotation = "W_";
var blackNotation = "B_";
var pawnNotation = "Pwn";
var rookNoation = "Rok";
var knightNotation = "Kht";
var bishopNotation = "Bhp";
var unicornNotation = "Uni";
var queenNotation = "Que";
var kingNotation = "Kng";
function getBoardStateStringArraySliceByZ(pieces, sizeOfBoardX, sizeOfBoardY, sizeOfBoardZ, boardCoordinateMinimum) {
    var arrToDisplay = [];
    arrToDisplay.push("Board currently");
    var board = [];
    for (var i = 0; i < sizeOfBoardX; i++) {
        board[i] = [];
        for (var j = 0; j < sizeOfBoardY; j++) {
            board[i][j] = [];
            for (var k = 0; k < sizeOfBoardZ; k++) {
                board[i][j][k] = boardEmptySpace;
            }
        }
    }
    for (var i = 0; i < pieces.length; i++) {
        var a = pieces[i].getPosition();
        board[a.getX() - 1][a.getY() - 1][a.getZ() - 1] = getPieceNotation(pieces[i]);
    }
    for (var z = sizeOfBoardZ - boardCoordinateMinimum; z >= 0; z--) {
        arrToDisplay.push("level/Z: " + (z + boardCoordinateMinimum));
        for (var y = sizeOfBoardY - boardCoordinateMinimum; y >= 0; y--) {
            var row = "";
            row += "|";
            for (var x = 0; x <= sizeOfBoardX - boardCoordinateMinimum; x++) {
                row += board[x][y][z];
                row += "|";
            }
            arrToDisplay.push(row);
        }
        arrToDisplay.push(" ");
    }
    return arrToDisplay;
}
exports.getBoardStateStringArraySliceByZ = getBoardStateStringArraySliceByZ;
function getPieceNotation(piece) {
    var a = whiteNotation;
    if (piece.isColor("Black")) {
        a = blackNotation;
    }
    if (piece instanceof Pawn_1.Pawn) {
        return a + pawnNotation;
    }
    if (piece instanceof Rook_1.Rook) {
        return a + rookNoation;
    }
    if (piece instanceof Knight_1.Knight) {
        return a + knightNotation;
    }
    if (piece instanceof Bishop_1.Bishop) {
        return a + bishopNotation;
    }
    if (piece instanceof Unicorn_1.Unicorn) {
        return a + unicornNotation;
    }
    if (piece instanceof Queen_1.Queen) {
        return a + queenNotation;
    }
    return a + kingNotation;
}
exports.getPieceNotation = getPieceNotation;
//# sourceMappingURL=DisplayBoard2D.js.map