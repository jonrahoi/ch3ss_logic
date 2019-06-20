"use strict";
exports.__esModule = true;
var PieceType;
(function (PieceType) {
    PieceType[PieceType["Pawn"] = 0] = "Pawn";
    PieceType[PieceType["Knight"] = 1] = "Knight";
    PieceType[PieceType["Rook"] = 2] = "Rook";
    PieceType[PieceType["Bishop"] = 3] = "Bishop";
    PieceType[PieceType["Queen"] = 4] = "Queen";
    PieceType[PieceType["Unicorn"] = 5] = "Unicorn";
    PieceType[PieceType["King"] = 6] = "King";
})(PieceType = exports.PieceType || (exports.PieceType = {}));
var Piece = (function () {
    function Piece(type, white) {
        if (white === void 0) { white = false; }
        this.isWhite = white;
        this.type = type;
    }
    Piece.prototype.validMoves = function (cb, position) {
        return [1, 2, 3];
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map