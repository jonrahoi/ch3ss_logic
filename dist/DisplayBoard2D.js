"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var Bishop_1 = require("./Bishop");
var Rook_1 = require("./Rook");
var Unicorn_1 = require("./Unicorn");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
var constants_1 = require("./constants");
var boardEmptySpace = ".";
var pawnNotation = "p";
var rookNoation = "r";
var knightNotation = "h";
var bishopNotation = "b";
var unicornNotation = "u";
var queenNotation = "q";
var kingNotation = "k";
var lineIndent = " ";
function getBoardStateStringArraySliceByZ(pieces, sizeOfBoardX, sizeOfBoardY, sizeOfBoardZ, boardCoordinateMinimum) {
    var arrToDisplay = [];
    arrToDisplay.push("Board state, sliced by Z coordinate value:");
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
        board[a.getX() - boardCoordinateMinimum][a.getY() - boardCoordinateMinimum][a.getZ() - boardCoordinateMinimum] = getPieceNotation(pieces[i]);
    }
    for (var z = sizeOfBoardZ - boardCoordinateMinimum; z >= 0; z--) {
        arrToDisplay.push("level(Z): " + (z + boardCoordinateMinimum));
        for (var y = sizeOfBoardY - boardCoordinateMinimum; y >= 0; y--) {
            var row = "" + lineIndent;
            for (var x = 0; x <= sizeOfBoardX - boardCoordinateMinimum; x++) {
                row += board[x][y][z];
                row += " ";
            }
            arrToDisplay.push(row);
        }
        arrToDisplay.push(" ");
    }
    return arrToDisplay;
}
exports.getBoardStateStringArraySliceByZ = getBoardStateStringArraySliceByZ;
function getPieceNotation(piece) {
    var str = kingNotation;
    if (piece instanceof Pawn_1.Pawn) {
        str = pawnNotation;
    }
    if (piece instanceof Rook_1.Rook) {
        str = rookNoation;
    }
    if (piece instanceof Knight_1.Knight) {
        str = knightNotation;
    }
    if (piece instanceof Bishop_1.Bishop) {
        str = bishopNotation;
    }
    if (piece instanceof Unicorn_1.Unicorn) {
        str = unicornNotation;
    }
    if (piece instanceof Queen_1.Queen) {
        str = queenNotation;
    }
    if (piece.isColor(constants_1.WHITE)) {
        str = str.toUpperCase();
    }
    return str;
}
//# sourceMappingURL=DisplayBoard2D.js.map