"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var King_1 = require("./King");
var Bishop_1 = require("./Bishop");
var Rook_1 = require("./Rook");
var Unicorn_1 = require("./Unicorn");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
var Piece_1 = require("./Piece");
var Board = (function () {
    function Board() {
        this.pieces = Board.setupBoard();
        this.moves = 0;
    }
    Board.setupBoard = function () {
        return [
            new King_1.King("Black", 3, 5, 5),
            new Rook_1.Rook("Black", 1, 5, 5),
            new Rook_1.Rook("Black", 5, 5, 5),
            new Knight_1.Knight("Black", 2, 5, 5),
            new Knight_1.Knight("Black", 4, 5, 5),
            new Pawn_1.Pawn("Black", 1, 4, 5),
            new Pawn_1.Pawn("Black", 2, 4, 5),
            new Pawn_1.Pawn("Black", 3, 4, 5),
            new Pawn_1.Pawn("Black", 4, 4, 5),
            new Pawn_1.Pawn("Black", 5, 4, 5),
            new Queen_1.Queen("Black", 3, 5, 4),
            new Bishop_1.Bishop("Black", 1, 5, 4),
            new Bishop_1.Bishop("Black", 4, 5, 4),
            new Unicorn_1.Unicorn("Black", 2, 5, 4),
            new Unicorn_1.Unicorn("Black", 5, 5, 4),
            new Pawn_1.Pawn("Black", 1, 4, 4),
            new Pawn_1.Pawn("Black", 2, 4, 4),
            new Pawn_1.Pawn("Black", 3, 4, 4),
            new Pawn_1.Pawn("Black", 4, 4, 4),
            new Pawn_1.Pawn("Black", 5, 4, 4),
            new Queen_1.Queen("Black", 3, 1, 2),
            new Bishop_1.Bishop("Black", 1, 1, 2),
            new Bishop_1.Bishop("Black", 4, 1, 2),
            new Unicorn_1.Unicorn("Black", 2, 1, 2),
            new Unicorn_1.Unicorn("Black", 5, 1, 2),
            new Pawn_1.Pawn("Black", 1, 2, 2),
            new Pawn_1.Pawn("Black", 2, 2, 2),
            new Pawn_1.Pawn("Black", 3, 2, 2),
            new Pawn_1.Pawn("Black", 4, 2, 2),
            new Pawn_1.Pawn("Black", 5, 2, 2),
            new King_1.King("Black", 3, 1, 1),
            new Rook_1.Rook("Black", 1, 5, 1),
            new Rook_1.Rook("Black", 5, 5, 1),
            new Knight_1.Knight("Black", 2, 5, 1),
            new Knight_1.Knight("Black", 4, 5, 1),
            new Pawn_1.Pawn("Black", 1, 4, 1),
            new Pawn_1.Pawn("Black", 2, 4, 1),
            new Pawn_1.Pawn("Black", 3, 4, 1),
            new Pawn_1.Pawn("Black", 4, 4, 1),
            new Pawn_1.Pawn("Black", 5, 4, 1),
        ];
    };
    Board.prototype.executeMove = function (a, b) {
        var movePiece;
        var pieceFound = false;
        for (var i = 0; i < this.pieces.length && !pieceFound; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                pieceFound = true;
                movePiece = this.pieces[i];
            }
        }
        if (!pieceFound) {
            return false;
        }
        if (!this.movePieceIsRightColor(movePiece)) {
            return false;
        }
        if (!this.moveIsLegal(movePiece, b)) {
            return false;
        }
        var whoseTurn = this.getStringWhoseTurn();
        var whoseTurnKingPosition = this.getLocationOfKingGivenColor(whoseTurn);
        if (this.playersKingInCheckAtSpace(whoseTurn, whoseTurnKingPosition) && this.getLocationOfKingGivenColor(whoseTurn) != a) {
            return false;
        }
        if (this.playersKingInCheckAtSpace(whoseTurn, b)) {
            return false;
        }
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        movePiece.moveTo(b);
        return true;
    };
    Board.prototype.moveIsLegal = function (movePiece, b) {
        if (this.pieceLocatedAtBool(b) && movePiece.getColor().localeCompare(this.getPieceLocatedAt(b).getColor())) {
            return false;
        }
        if (!movePiece.canMoveTo(b)) {
            return false;
        }
        if (movePiece instanceof Knight_1.Knight) {
            return true;
        }
        if (movePiece instanceof Pawn_1.Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                return false;
            }
            return true;
        }
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            return false;
        }
        return true;
    };
    Board.prototype.executeMoveNoCheck = function (a, b) {
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        this.getPieceLocatedAt(a).moveTo(b);
    };
    Board.prototype.kingInCheckNow = function (a) {
        var piece = this.getPieceLocatedAt(a);
        var color = "Black";
        if (piece.getColor().localeCompare("Black")) {
            color = "White";
        }
        if (piece.canMoveTo(this.getLocationOfKingGivenColor(color))) {
            return true;
        }
        return false;
    };
    Board.prototype.gameIsDrawn = function () {
        var whoseTurn = this.getStringWhoseTurn();
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!this.pieces[i].getColor().localeCompare(whoseTurn)) {
                if (this.getAllPossibleMovesPiece(this.pieces[i]).length > 0) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.incrementMoveCount = function () {
        this.moves++;
    };
    Board.prototype.movePieceIsRightColor = function (piece) {
        if (piece.getColor().localeCompare(this.getStringWhoseTurn())) {
            return false;
        }
    };
    Board.prototype.getStringWhoseTurn = function () {
        var whoseTurn = "White";
        if (this.moves % 2 == 1) {
            whoseTurn = "Black";
        }
        return whoseTurn;
    };
    Board.prototype.getWhitePieceLocations = function () {
        var locations = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].getColor().localeCompare("White")) {
                locations.push(this.pieces[i].getPostionString() + this.pieces[i].getName());
            }
        }
        return locations;
    };
    Board.prototype.getWhitePiecesTaken = function () {
        var piecesTakenArray = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!this.pieces[i].getColor().localeCompare("White")) {
                piecesTakenArray.push(this.pieces[i].getName());
            }
        }
        return piecesTakenArray;
    };
    Board.prototype.getBlackPiecesTaken = function () {
        var piecesTakenArray = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!this.pieces[i].getColor().localeCompare("Black")) {
                piecesTakenArray.push(this.pieces[i].getName());
            }
        }
        return piecesTakenArray;
    };
    Board.prototype.getBlackPieceLocations = function () {
        var locations = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].getColor().localeCompare("White")) {
                locations.push(this.pieces[i].getPostionString() + this.pieces[i].getName());
            }
        }
        return locations;
    };
    Board.prototype.pawnMoveDirectionCorrect = function (colorOfPawn, a, b) {
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare("White") && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare("Black") && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    };
    Board.prototype.deletePieceAtPosition = function (b) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isAtPosition(b)) {
                this.piecesTaken.push(this.pieces[i]);
                delete this.pieces[i];
                return;
            }
        }
    };
    Board.prototype.playersKingInCheckAtSpace = function (whoseTurn, positionKing) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].getColor().localeCompare("whoseTurn") &&
                this.pieces[i].canMoveTo(positionKing) &&
                !this.pieceInWay(this.pieces[i].getPosition(), positionKing)) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.getLocationOfKingGivenColor = function (color) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King_1.King && this.pieces[i].getColor().localeCompare(color)) {
                return this.pieces[i].getPosition();
            }
        }
    };
    Board.prototype.pieceLocatedAtBool = function (a) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.getPieceLocatedAt = function (a) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i];
            }
        }
    };
    Board.prototype.spaceOnBoard = function (a) {
        if (a.getX() < 1 || a.getX() > 5) {
            return false;
        }
        if (a.getY() < 1 || a.getY() > 5) {
            return false;
        }
        if (a.getZ() < 1 || a.getZ() > 5) {
            return false;
        }
        return true;
    };
    Board.prototype.pieceInWay = function (a, b) {
        var dx = this.getSlope(a.getX(), b.getX());
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        var c;
        c = a;
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (c != b && this.spaceOnBoard(c)) {
            if (this.pieceLocatedAtBool(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    };
    Board.prototype.getSlope = function (a, b) {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    };
    Board.prototype.getAllPossibleMovesPiece = function (movePiece) {
        var possibleMoves = [];
        for (var i = 1; i < 6; i++) {
            for (var j = 1; j < 6; j++) {
                for (var k = 1; k < 6; k++) {
                    var space = new Piece_1.Position(i, j, k);
                    if (this.moveIsLegal(movePiece, space)) {
                        var legal = void 0;
                        legal = i.toString() + j.toString() + k.toString();
                        possibleMoves.push(legal);
                    }
                }
            }
        }
        return possibleMoves;
    };
    Board.prototype.getAllPossibleMovesSpace = function (a) {
        var possibleMoves = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        var movePiece = this.getPieceLocatedAt(a);
        for (var i = 1; i < 6; i++) {
            for (var j = 1; j < 6; j++) {
                for (var k = 1; k < 6; k++) {
                    var space = new Piece_1.Position(i, j, k);
                    if (this.moveIsLegal(movePiece, space)) {
                        var legal = void 0;
                        legal = i.toString() + j.toString() + k.toString();
                        possibleMoves.push(legal);
                    }
                }
            }
        }
        return possibleMoves;
    };
    return Board;
}());
exports["default"] = Board;
//# sourceMappingURL=Board.js.map