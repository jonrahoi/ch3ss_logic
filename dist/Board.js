"use strict";
exports.__esModule = true;
var Board = (function () {
    function Board() {
        this.pieces = Board.setupBoard();
    }
    Board.setupBoard = function () {
        return [
            new King("Black", 5, 3, 5),
        ];
    };
    Board.prototype.move = function (a, b) {
        return true;
    };
    Board.prototype.pieceInWay = function (a, b) {
        return false;
    };
    return Board;
}());
exports["default"] = Board;
//# sourceMappingURL=Board.js.map