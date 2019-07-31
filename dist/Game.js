"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var Game = (function () {
    function Game(gameID) {
        this.gameID = gameID;
        this.board = new Board_1["default"]();
        this.moveHistory = [];
        this.thereIsCheck = false;
        this.checkMate = false;
        this.stalemate = false;
        this.gameID = gameID;
    }
    Game.prototype.setPieces = function (pieces) {
        this.board.setPieces(pieces);
    };
    Game.prototype.getCheck = function () {
        return this.thereIsCheck;
    };
    Game.prototype.setCheck = function (a) {
        this.thereIsCheck = a;
    };
    Game.prototype.getCheckMate = function () {
        return this.checkMate;
    };
    Game.prototype.getGameID = function () {
        return this.gameID;
    };
    Game.prototype.getStaleMate = function () {
        return this.stalemate;
    };
    Game.prototype.getMoveHistory = function () {
        var moves = [];
        for (var i = 0; i < this.moveHistory.length; i++) {
            moves.push(this.moveHistory[i]);
        }
        return moves;
    };
    Game.prototype.getPieces = function () {
        return this.board.getPieces();
    };
    Game.prototype.getMoveCount = function () {
        return this.board.getMoveCount();
    };
    Game.prototype.move = function (a, b) {
        if (!this.validSpace(a) || !this.validSpace(b)) {
            return false;
        }
        console.log("inside Game.move, both valid spaces");
        var kingStartedInCheck = false;
        var copyOfBoardState = [];
        copyOfBoardState = this.board.getPieces();
        if (this.board.kingInCheck(this.board.getWhoseTurn())) {
            kingStartedInCheck = true;
        }
        var moveExecutedSuccessfully = this.board.executeMove(a, b);
        if (!moveExecutedSuccessfully) {
            return false;
        }
        if (kingStartedInCheck && this.board.kingInCheck(this.board.getWhoseTurn())) {
            this.board.setPieces(copyOfBoardState);
            console.log("move not executed, king still in check");
            return false;
        }
        if (moveExecutedSuccessfully) {
            console.log("game.move: successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString());
            this.board.incrementMoveCount();
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            if (this.board.kingInCheck(this.board.getWhoseTurn())) {
                this.thereIsCheck = true;
                console.log("inside game.ts there is check");
                if (this.board.playerCheckmated(this.board.getWhoseTurn())) {
                    this.checkMate = true;
                    console.log("inside game.ts there is checkmate");
                }
            }
            else {
                this.thereIsCheck = false;
                if (this.board.gameIsDrawn()) {
                    this.stalemate = true;
                }
            }
        }
        return true;
    };
    Game.prototype.gameIsDrawn = function () {
        return this.board.gameIsDrawn();
    };
    Game.prototype.getPositionFromString = function (a) {
        return new Piece_1.Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
    };
    Game.prototype.getPiecesByColor = function (color) {
        return this.board.getPiecesByColor(color);
    };
    Game.prototype.getWhoseTurnItIs = function () {
        return this.board.getWhoseTurn();
    };
    Game.prototype.getPossibleMovesForPieceAtSpace = function (posA) {
        var possibleMoves;
        if (!this.board.pieceLocatedAtBool(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMovesPosition(posA);
        return possibleMoves;
    };
    Game.prototype.getPossibleMovesForPiece = function (piece) {
        var pieceB = piece;
        return this.board.getAllPossibleMovesPosition(pieceB.getPosition());
    };
    Game.prototype.getPiecesTaken = function (color) {
        return this.board.getPiecesTaken();
    };
    Game.prototype.loadGame = function () {
        this.moveHistory = JSON.parse("moveHistory");
    };
    Game.prototype.saveGame = function () {
        JSON.stringify(this.moveHistory);
    };
    Game.prototype.goBackOneMove = function () {
        JSON.stringify(this.moveHistory);
        this.moveHistory = JSON.parse("moveHistory");
        for (var i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        }
    };
    Game.prototype.goForwardOneMove = function () {
    };
    Game.prototype.validSpace = function (a) {
        return this.board.spaceOnBoard(a);
    };
    Game.prototype.pieceLocatedAtBool = function (a) {
        return this.board.pieceLocatedAtBool(a);
    };
    Game.prototype.kingsPresentOnBoardDebug = function () {
        return this.board.kingsPresentOnBoardDebug();
    };
    Game.prototype.isValidSpaceFromString = function (str) {
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