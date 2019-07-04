"use strict";
exports.__esModule = true;
var Game = (function () {
    function Game() {
        this.moves = 0;
        this.board = new Board();
    }
    Game.prototype.newGame = function () {
        this.board = new Board();
    };
    Game.prototype.move = function (a, b) {
        return true;
    };
    Game.prototype.loadGame = function (arrayFromMoves, arrayToMoves) {
    };
    Game.prototype.saveGame = function () {
    };
    Game.prototype.goBackOneMove = function () {
    };
    Game.prototype.goForwardOneMove = function () {
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map