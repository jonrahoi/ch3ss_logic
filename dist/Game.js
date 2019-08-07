"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var DisplayBoard2D_1 = require("./DisplayBoard2D");
var constants_1 = require("./constants");
var Game = (function () {
    function Game(id) {
        this.gameID = 0;
        this.gameID = id;
        this.board = new Board_1["default"](constants_1.RAUMSCHACH);
        this.moveHistory = [];
        this.moveCount = 0;
        this.numberPlayers = 2;
        this.minNumberOfPiecesBeforeDraw = 5;
        this.boardStateMoveCount = 0;
    }
    Game.prototype.setPieces = function (pieces) {
        this.board.setPieces(pieces);
    };
    Game.prototype.getBoardStateStringArray = function () {
        return DisplayBoard2D_1.getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(), this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
    };
    Game.prototype.printBoardStateToConsole = function () {
        var arr = DisplayBoard2D_1.getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(), this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
        for (var i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    };
    Game.prototype.getWhoseTurnItIs = function () {
        if (this.moveCount % this.numberPlayers == 0) {
            return constants_1.WHITE;
        }
        return constants_1.BLACK;
    };
    Game.prototype.getCheck = function () {
        var playerMoving = this.getWhoseTurnItIs();
        return this.board.kingInCheck(playerMoving);
    };
    Game.prototype.getCheckMate = function () {
        if (!this.getCheck()) {
            return false;
        }
        var pieces = this.board.getCopyOfPieces();
        for (var i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
        return true;
    };
    Game.prototype.getStaleMate = function () {
        if (this.insufficientMaterial()) {
            return true;
        }
        if (this.getCheck()) {
            return false;
        }
        var pieces = this.board.getCopyOfPieces();
        for (var i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
        return true;
    };
    Game.prototype.insufficientMaterial = function () {
        if (this.board.getCopyOfPieces().length < this.minNumberOfPiecesBeforeDraw) {
            return true;
        }
        return false;
    };
    Game.prototype.getMoveHistory = function () {
        var moves = [];
        for (var i = 0; i < this.moveHistory.length; i++) {
            moves.push(this.moveHistory[i]);
        }
        return moves;
    };
    Game.prototype.getGameID = function () {
        return this.gameID;
    };
    Game.prototype.getPieces = function () {
        return this.board.getCopyOfPieces();
    };
    Game.prototype.getMoveCount = function () {
        return this.moveCount;
    };
    Game.prototype.move = function (a, b) {
        if (this.boardStateMoveCount < this.moveCount) {
            this.setBoardToAfterAllMoves();
        }
        if (!this.validSpace(a) || !this.validSpace(b)) {
            return false;
        }
        var copyOfBoardState = this.board.getCopyOfPieces();
        var playerMoving = this.getWhoseTurnItIs();
        if (!this.board.executeMove(playerMoving, a, b)) {
            return false;
        }
        if (this.board.kingInCheck(playerMoving)) {
            this.board.setPieces(copyOfBoardState);
            return false;
        }
        this.moveCount++;
        this.boardStateMoveCount = this.moveCount;
        this.moveHistory.push(a);
        this.moveHistory.push(b);
        return true;
    };
    Game.prototype.getPossibleMovesForPieceAtSpace = function (a) {
        var possibleMoves = [];
        if (!this.board.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        var copyOfBoardState = this.board.getCopyOfPieces();
        var playerMoving = this.getWhoseTurnItIs();
        for (var x = 1; x <= this.board.getSizeOfBoardX(); x++) {
            for (var y = 1; y <= this.board.getSizeOfBoardY(); y++) {
                for (var z = 1; z <= this.board.getSizeOfBoardZ(); z++) {
                    var b = new Piece_1.Position(x, y, z);
                    this.board.setPieces(this.getCopyOfPieces(copyOfBoardState));
                    if (!this.board.executeMove(playerMoving, a, b)) {
                        continue;
                    }
                    if (!this.board.kingInCheck(playerMoving)) {
                        possibleMoves.push(b);
                    }
                    this.board.setPieces(copyOfBoardState);
                }
            }
        }
        this.board.setPieces(copyOfBoardState);
        return possibleMoves;
    };
    Game.prototype.getCopyOfPieces = function (pieces) {
        var copy = [];
        for (var i = 0; i < pieces.length; i++) {
            copy.push(pieces[i].makeCopy());
        }
        return copy;
    };
    Game.prototype.gameIsDrawn = function () {
        return this.getStaleMate();
    };
    Game.prototype.getPositionFromString = function (a) {
        if (this.isValidSpaceFromString(a)) {
            return new Piece_1.Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
        }
    };
    Game.prototype.validSpace = function (a) {
        return this.board.spaceOnBoard(a);
    };
    Game.prototype.isValidSpaceFromString = function (inputString) {
        if (inputString.length != 3) {
            return false;
        }
        if (inputString.charAt(0) < constants_1.RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(0) > constants_1.RA_SIZE_BOARD_X.toLocaleString().charAt(0)) {
            return false;
        }
        if (inputString.charAt(1) < constants_1.RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(1) > constants_1.RA_SIZE_BOARD_Y.toLocaleString().charAt(0)) {
            return false;
        }
        if (inputString.charAt(2) < constants_1.RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(2) > constants_1.RA_SIZE_BOARD_Z.toLocaleString().charAt(0)) {
            return false;
        }
        return true;
    };
    Game.prototype.getPiecesTaken = function () {
        return this.board.getCopyOfPiecesTaken();
    };
    Game.prototype.loadGameFromFile = function (fileName) {
        var fs = require("fs");
        var rawData = fs.readFileSync(fileName);
        var moves = JSON.parse(rawData);
        this.moveHistory = [];
        for (var i = 0; i < moves.length; i++) {
            this.moveHistory.push(this.getPositionFromString(moves[i]));
        }
        this.moveCount = 0;
        this.setBoardToAfterAllMoves();
    };
    Game.prototype.setBoardToAfterAllMoves = function () {
        this.board.resetPiecesToStartingPositions();
        this.moveCount = 0;
        for (var i = 0; i < this.moveHistory.length; i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
            this.moveCount++;
        }
        this.boardStateMoveCount = this.moveCount;
    };
    Game.prototype.saveGameToFile = function (fileName) {
        var fs = require("fs");
        var moveStrings = [];
        for (var i = 0; i < this.moveHistory.length; i++) {
            moveStrings.push(this.moveHistory[i].getPostionString());
        }
        fs.writeFileSync(fileName, JSON.stringify(moveStrings));
    };
    Game.prototype.takeBackLastMove = function () {
        if (this.moveCount == 0) {
            return;
        }
        this.moveHistory.pop();
        this.moveHistory.pop();
        this.setBoardToAfterAllMoves();
    };
    Game.prototype.setBoardStateBackOneMoveButNotATakeback = function () {
        if (this.moveCount == 0) {
            return;
        }
        this.board.resetPiecesToStartingPositions();
        var displayMoves = this.boardStateMoveCount - this.numberPlayers;
        for (var i = 0; i < this.moveHistory.length - (this.numberPlayers * displayMoves); i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
        }
        this.boardStateMoveCount--;
    };
    Game.prototype.displayForwardOneMove = function () {
        if (this.boardStateMoveCount == this.moveCount) {
            return;
        }
        this.board.resetPiecesToStartingPositions();
        var displayMoves = this.boardStateMoveCount + this.numberPlayers;
        for (var i = 0; i < this.moveHistory.length - (this.numberPlayers * displayMoves); i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
        }
        this.boardStateMoveCount++;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map