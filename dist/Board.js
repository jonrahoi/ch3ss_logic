"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var King_1 = require("./King");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
var Piece_1 = require("./Piece");
var BoardSetupArrays_1 = require("./BoardSetupArrays");
var constants_1 = require("./constants");
var Board = (function () {
    function Board(gameVersion) {
        this.pieces = [];
        this.piecesTaken = [];
        if (gameVersion === constants_1.RAUMSCHACH) {
            this.pieces = BoardSetupArrays_1.getRaumschachBoardSetup();
            this.sizeOfBoardX = constants_1.RA_SIZE_BOARD_X;
            this.sizeOfBoardY = constants_1.RA_SIZE_BOARD_Y;
            this.sizeOfBoardZ = constants_1.RA_SIZE_BOARD_Z;
            this.boardCoordinateMinimum = constants_1.RA_BOARD_MIN;
            this.enPassant = false;
            this.castling = false;
            this.queeningTwoBackRows = true;
        }
    }
    Board.prototype.resetPiecesToStartingPositions = function () {
        if (this.gameVersion === constants_1.RAUMSCHACH) {
            this.pieces = BoardSetupArrays_1.getRaumschachBoardSetup();
        }
    };
    Board.prototype.getSizeOfBoardX = function () {
        return this.sizeOfBoardX;
    };
    Board.prototype.getSizeOfBoardY = function () {
        return this.sizeOfBoardY;
    };
    Board.prototype.getSizeOfBoardZ = function () {
        return this.sizeOfBoardZ;
    };
    Board.prototype.getBoardCoordinateMinimum = function () {
        return this.boardCoordinateMinimum;
    };
    Board.prototype.setPieces = function (newPieces) {
        this.pieces = newPieces;
    };
    Board.prototype.executeMove = function (playerMoving, a, b) {
        var initialPiecesCopy = this.getCopyOfPieces();
        if (!this.pieceLocatedAtBool(a)) {
            return false;
        }
        var movePiece = this.getPieceLocatedAt(a);
        if (!movePiece.isColor(playerMoving)) {
            return false;
        }
        if (!this.pieceMoveFollowsMovementRules(movePiece, b)) {
            return false;
        }
        if (this.queeningTwoBackRows && movePiece instanceof Pawn_1.Pawn && this.checkForQueeningTwoBackRows(movePiece, b)) {
            this.deletePieceAtPosition(a);
            var newQueen = new Queen_1.Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            return true;
        }
        if (this.pieceLocatedAtBool(b)) {
            this.piecesTaken.push(this.getPieceLocatedAt(b));
            this.deletePieceAtPosition(b);
        }
        movePiece.setPosition(b);
        return true;
    };
    Board.prototype.pieceMoveFollowsMovementRules = function (movePiece, b) {
        if (!movePiece.moveShapeCorrect(b)) {
            return false;
        }
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).isColor(movePiece.getColor())) {
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
    Board.prototype.checkForQueeningTwoBackRows = function (pawn, b) {
        if (!(pawn instanceof Pawn_1.Pawn)) {
            return false;
        }
        if (pawn.isColor(constants_1.WHITE) && b.getY() == this.sizeOfBoardY && b.getZ() >= this.sizeOfBoardZ - 1 ||
            pawn.isColor(constants_1.BLACK) && b.getY() == this.boardCoordinateMinimum && b.getZ() <= (this.boardCoordinateMinimum + 1)) {
            return true;
        }
    };
    Board.prototype.getCopyOfPieces = function () {
        var copy = [];
        for (var i = 0; i < this.pieces.length; i++) {
            copy.push(this.pieces[i].makeCopy());
        }
        return copy;
    };
    Board.prototype.getCopyOfPiecesTaken = function () {
        var copy = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            copy.push(this.piecesTaken[i].makeCopy());
        }
        return copy;
    };
    Board.prototype.pawnMoveDirectionCorrect = function (colorOfPawn, a, b) {
        var dy = this.coordinateCompare(a.getY(), b.getY());
        var dz = this.coordinateCompare(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare(constants_1.WHITE) == 0 && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare(constants_1.BLACK) == 0 && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    };
    Board.prototype.deletePieceAtPosition = function (b) {
        var newPieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isAtPosition(b)) {
                newPieces.push(this.pieces[i]);
            }
        }
        this.pieces = newPieces;
    };
    Board.prototype.kingInCheck = function (colorOfKingToCheckIfInCheck) {
        var kingLocation = this.getLocationOfKingGivenColor(colorOfKingToCheckIfInCheck);
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(colorOfKingToCheckIfInCheck)) {
                if (this.pieceMoveFollowsMovementRules(this.pieces[i], kingLocation)) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.getLocationOfKingGivenColor = function (color) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King_1.King && this.pieces[i].isColor(color)) {
                return new Piece_1.Position(this.pieces[i].getPosition().getX(), this.pieces[i].getPosition().getY(), this.pieces[i].getPosition().getZ());
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
        if (a.getX() < this.boardCoordinateMinimum || a.getX() > this.sizeOfBoardX) {
            return false;
        }
        if (a.getY() < this.boardCoordinateMinimum || a.getY() > this.sizeOfBoardY) {
            return false;
        }
        if (a.getZ() < this.boardCoordinateMinimum || a.getZ() > this.sizeOfBoardZ) {
            return false;
        }
        return true;
    };
    Board.prototype.pieceInWay = function (a, b) {
        var dx = this.coordinateCompare(a.getX(), b.getX());
        var dy = this.coordinateCompare(a.getY(), b.getY());
        var dz = this.coordinateCompare(a.getZ(), b.getZ());
        var c = new Piece_1.Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (!c.samePosition(b) && this.spaceOnBoard(c)) {
            if (this.pieceLocatedAtBool(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    };
    Board.prototype.coordinateCompare = function (a, b) {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    };
    return Board;
}());
exports["default"] = Board;
//# sourceMappingURL=Board.js.map