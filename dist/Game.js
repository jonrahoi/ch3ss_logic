"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var Game = (function () {
    function Game() {
        this.moveCount = 0;
        this.moveHistory = [];
        this.board = new Board_1["default"]();
    }
    Game.prototype.newGame = function () {
        this.board = new Board_1["default"]();
        this.moveHistory = [];
    };
    Game.prototype.getPositionOfWhitePiecesArray = function () {
        return this.board.getWhitePieceLocations();
    };
    Game.prototype.getPositionOfBlackPiecesArray = function () {
        return this.board.getBlackPieceLocations();
    };
    Game.prototype.move = function (a, b) {
        if (!this.validSpaceFromString(a) && !this.validSpaceFromString(b)) {
            return false;
        }
        var posA = this.getPositionFromString(a);
        var posB = this.getPositionFromString(b);
        var moveExecutedBool = this.board.executeMove(posA, posB);
        if (moveExecutedBool) {
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            this.board.incrementMoveCount;
        }
        return moveExecutedBool;
    };
    Game.prototype.gameIsDrawn = function () {
        return this.board.gameIsDrawn();
    };
    Game.prototype.getPositionFromString = function (a) {
        return new Piece_1.Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
    };
    Game.prototype.getWhitePieceLocations = function () {
        return this.board.getWhitePieceLocations();
    };
    Game.prototype.getBlackPieceLocations = function () {
        return this.board.getBlackPieceLocations();
    };
    Game.prototype.playerInCheck = function () {
        var lastMove = this.moveHistory[this.moveHistory.length - 1];
        return this.board.kingInCheckNow(this.getPositionFromString(lastMove));
    };
    Game.prototype.playerCheckmated = function () {
        var color = "Black";
        if (this.getWhoseTurnItIs().localeCompare("Black")) {
            color = "White";
        }
        var locationKing = this.board.getLocationOfKingGivenColor(color);
        if (this.board.getAllPossibleMovesSpace(locationKing).length < 1) {
            return true;
        }
        return false;
    };
    Game.prototype.getWhoseTurnItIs = function () {
        if (this.moveCount % 2 == 0) {
            return "White";
        }
        return "Black";
    };
    Game.prototype.getPossibleMovesForPieceAtSpace = function (a) {
        var possibleMoves;
        if (!this.validSpaceFromString(a)) {
            return possibleMoves;
        }
        var posA = this.getPositionFromString(a);
        if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesSpace(posA);
        return possibleMoves;
    };
    Game.prototype.getWhitePiecesTaken = function () {
        return this.board.getWhitePiecesTaken();
    };
    Game.prototype.getBlackPiecesTaken = function () {
        return this.board.getBlackPiecesTaken();
    };
    Game.prototype.loadGame = function () {
        this.moveHistory = JSON.parse("moveHistory");
        for (var i = 0; i < this.moveHistory.length; i += 2) {
            var a = this.moveHistory[i];
            var b = this.moveHistory[i + 1];
            this.board.executeMoveNoCheck(this.getPositionFromString(a), this.getPositionFromString(b));
            this.moveCount++;
        }
    };
    Game.prototype.saveGame = function () {
        JSON.stringify(this.moveHistory);
    };
    Game.prototype.goBackOneMove = function () {
        JSON.stringify(this.moveHistory);
        this.moveHistory = JSON.parse("moveHistory");
        this.newGame();
        for (var i = 0; i < this.moveHistory.length; i += 2) {
            var a = this.moveHistory[i];
            var b = this.moveHistory[i + 1];
            this.board.executeMoveNoCheck(this.getPositionFromString(a), this.getPositionFromString(b));
        }
    };
    Game.prototype.goForwardOneMove = function () {
    };
    Game.prototype.validSpaceFromString = function (str) {
        if (str.length != 3) {
            return false;
        }
        for (var i = 0; i < 3; i++) {
            if (str.charAt(i) < "1" || str.charAt(i) > "5") {
                return false;
            }
        }
        return true;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map