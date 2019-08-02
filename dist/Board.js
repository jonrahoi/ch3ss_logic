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
        this.moveCount = 0;
        this.piecesTaken = [];
        this.sizeOfBoardX = 5;
        this.sizeOfBoardY = 5;
        this.sizeOfBoardZ = 5;
        this.boardCoordinateMinimum = 1;
        this.boardEmptySpace = "_____";
        this.whiteNotation = "W_";
        this.blackNotation = "B_";
        this.pawnNotation = "Pwn";
        this.rookNoation = "Rok";
        this.knightNotation = "Kht";
        this.bishopNotation = "Bhp";
        this.unicornNotation = "Uni";
        this.queenNotation = "Que";
        this.kingNotation = "Kng";
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
            new Queen_1.Queen("White", 3, 1, 2),
            new Bishop_1.Bishop("White", 1, 1, 2),
            new Bishop_1.Bishop("White", 4, 1, 2),
            new Unicorn_1.Unicorn("White", 2, 1, 2),
            new Unicorn_1.Unicorn("White", 5, 1, 2),
            new Pawn_1.Pawn("White", 1, 2, 2),
            new Pawn_1.Pawn("White", 2, 2, 2),
            new Pawn_1.Pawn("White", 3, 2, 2),
            new Pawn_1.Pawn("White", 4, 2, 2),
            new Pawn_1.Pawn("White", 5, 2, 2),
            new King_1.King("White", 3, 1, 1),
            new Rook_1.Rook("White", 1, 1, 1),
            new Rook_1.Rook("White", 5, 1, 1),
            new Knight_1.Knight("White", 2, 1, 1),
            new Knight_1.Knight("White", 4, 1, 1),
            new Pawn_1.Pawn("White", 1, 2, 1),
            new Pawn_1.Pawn("White", 2, 2, 1),
            new Pawn_1.Pawn("White", 3, 2, 1),
            new Pawn_1.Pawn("White", 4, 2, 1),
            new Pawn_1.Pawn("White", 5, 2, 1),
        ];
    };
    Board.prototype.setPieces = function (newPieces) {
        this.pieces = newPieces;
    };
    Board.prototype.incrementMoveCount = function () {
        this.moveCount++;
    };
    Board.prototype.setMoveCount = function (movesCount) {
        this.moveCount = movesCount;
    };
    Board.prototype.executeMove = function (a, b) {
        console.log("inside board.executeMove");
        if (!this.pieceLocatedAtBool(a)) {
            console.log("inside board.executeMove, no piece located at " + a.getPostionString());
            return false;
        }
        var movePiece = this.getPieceLocatedAt(a);
        if (!movePiece.isColor(this.getWhoseTurn())) {
            console.log("inside board.executeMove, wrong color, move not executed");
            return false;
        }
        if (!this.moveIsLegal(movePiece, b)) {
            console.log("inside board.executeMove, move is not legal");
            return false;
        }
        console.log("inside board.executeMove, right color, move legal");
        if (movePiece instanceof Pawn_1.Pawn && this.checkForQueening(movePiece, b)) {
            this.deletePieceAtPosition(a);
            var newQueen = new Queen_1.Queen(movePiece.getColor(), a.getX(), a.getY(), a.getZ());
            this.pieces.push(newQueen);
            newQueen.moveTo(b);
            console.log("inside board.executeMove, pawn queened, move executed");
            return true;
        }
        if (movePiece instanceof King_1.King) {
            if (this.kingInCheckAtSpace(movePiece.getOppositeColor(), b)) {
                console.log("inside board.execute player's king in check for that move, move not executed");
                return false;
            }
            else if (this.pieceLocatedAtBool(b) && this.kingTakingPieceAndMovingIntoCheck(b, movePiece.getColor())) {
                console.log("inside board.execute player's king in check after taking that piece, move not executed");
                return false;
            }
        }
        if (this.pieceLocatedAtBool(b)) {
            this.piecesTaken.push(this.getPieceLocatedAt(b));
            this.deletePieceAtPosition(b);
            console.log("inside board.executeMove deleting piece at " + b.getPostionString());
        }
        movePiece.moveTo(b);
        console.log("inside board.executeMove, move executed");
        return true;
    };
    Board.prototype.moveIsLegal = function (movePiece, b) {
        if (!movePiece.canMoveTo(b)) {
            return false;
        }
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            console.log("inside moveIsLegal, move space has piece of same color");
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
            console.log("inside moveIsLegal, piece is in way");
            return false;
        }
        return true;
    };
    Board.prototype.moveIsLegalIgnoreSpecificPiece = function (movePiece, b, pieceToIgnore) {
        if (!movePiece.canMoveTo(b)) {
            return false;
        }
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece) && !this.getPieceLocatedAt(b).getPosition().samePosition(b)) {
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
        if (this.pieceInWayEvenIgnoringPiece(movePiece.getPosition(), b, pieceToIgnore)) {
            return false;
        }
        return true;
    };
    Board.prototype.checkForQueening = function (movePiece, b) {
        if (!(movePiece instanceof Pawn_1.Pawn)) {
            return false;
        }
        if (movePiece.isColor("White") && b.getY() == this.sizeOfBoardY && b.getZ() >= this.sizeOfBoardZ - 1 ||
            movePiece.isColor("Black") && b.getY() == this.boardCoordinateMinimum && b.getZ() <= (this.boardCoordinateMinimum + 1)) {
            return true;
        }
    };
    Board.prototype.kingInCheckFromPosition = function (pos) {
        console.log("hello, inside board.kingInCheckFromPosition");
        console.log("inside board.kingInCheckFromPosition " + pos.getPostionString());
        var color = "Black";
        if (!this.pieceLocatedAtBool(pos)) {
            return false;
        }
        var piece = this.getPieceLocatedAt(pos);
        if (piece.isColor("Black")) {
            color = "White";
        }
        if (this.moveIsLegal(piece, this.getLocationOfKingGivenColor(color))) {
            return true;
        }
        return false;
    };
    Board.prototype.gameIsDrawn = function () {
        var whoseTurn = this.getWhoseTurn();
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isColor(whoseTurn)) {
                if (this.getAllPossibleMovesPosition(this.pieces[i].getPosition()).length > 0) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.getWhoseTurn = function () {
        var whoseTurn = "White";
        if (this.moveCount % 2 == 1) {
            whoseTurn = "Black";
        }
        return whoseTurn;
    };
    Board.prototype.getPieces = function () {
        var pieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            pieces.push(this.pieces[i].makeCopy());
        }
        return pieces;
    };
    Board.prototype.getPiecesTaken = function () {
        var pieces = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            pieces.push(this.piecesTaken[i].makeCopy());
        }
        return pieces;
    };
    Board.prototype.pawnMoveDirectionCorrect = function (colorOfPawn, a, b) {
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare("White") == 0 && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare("Black") == 0 && dy <= 0 && dz <= 0) {
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
    Board.prototype.kingInCheckAtSpace = function (opponentColor, positionKing) {
        for (var i = 0; i < this.pieces.length; i++) {
            if ((this.pieces[i].isColor(opponentColor)) && this.moveIsLegal(this.pieces[i], positionKing)) {
                return true;
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
        var dx = this.getSlope(a.getX(), b.getX());
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
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
    Board.prototype.pieceInWayEvenIgnoringPiece = function (a, b, pieceToIgnore) {
        var dx = this.getSlope(a.getX(), b.getX());
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        var c = new Piece_1.Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (!c.samePosition(b) && this.spaceOnBoard(c)) {
            if (c.samePosition(pieceToIgnore.getPosition())) {
                continue;
            }
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
    Board.prototype.getAllPossibleMovesPosition = function (a) {
        var possibleMoves = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        var movePiece = this.getPieceLocatedAt(a);
        if (this.kingInCheck && movePiece.getColor().localeCompare(this.getWhoseTurn())) {
        }
        for (var x = 1; x <= this.sizeOfBoardX; x++) {
            for (var y = 1; y <= this.sizeOfBoardY; y++) {
                for (var z = 1; z <= this.sizeOfBoardZ; z++) {
                    var possibleSpace = new Piece_1.Position(x, y, z);
                    if (movePiece instanceof King_1.King) {
                        if (this.moveIsLegal(movePiece, possibleSpace) && !this.kingInCheckAtSpace(movePiece.getOppositeColor(), possibleSpace)) {
                            if (this.pieceLocatedAtBool(possibleSpace) && this.kingTakingPieceAndMovingIntoCheck(possibleSpace, movePiece.getColor())) {
                                continue;
                            }
                            possibleMoves.push(possibleSpace);
                        }
                    }
                    else if (this.moveIsLegal(movePiece, possibleSpace)) {
                        possibleMoves.push(possibleSpace);
                    }
                }
            }
        }
        return possibleMoves;
    };
    Board.prototype.kingTakingPieceAndMovingIntoCheck = function (possibleSpace, kingColor) {
        var pieceToBeTaken = this.getPieceLocatedAt(possibleSpace);
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(kingColor) && this.moveIsLegalIgnoreSpecificPiece(this.pieces[i], possibleSpace, pieceToBeTaken)) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.playerCheckmated = function (kingColor) {
        var locationKing = this.getLocationOfKingGivenColor(kingColor);
        if (!(this.getAllPossibleMovesPosition(locationKing).length == 0)) {
            return false;
        }
        var piecesThatCanAttackKing = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(kingColor) && this.moveIsLegal(this.pieces[i], locationKing)) {
                piecesThatCanAttackKing.push(this.pieces[i]);
            }
        }
        if (piecesThatCanAttackKing.length > 1) {
            return true;
        }
        else if (piecesThatCanAttackKing.length == 1) {
            return !this.checkCanBeBlockedWithoutCreatingAnotherCheck(locationKing, piecesThatCanAttackKing[1].getPosition(), kingColor);
        }
        return false;
    };
    Board.prototype.getSpacesBetweenIncludingEnd = function (a, b) {
        var dx = this.getSlope(a.getX(), b.getX());
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        var c = new Piece_1.Position(a.getX(), a.getY(), a.getZ());
        var inBetweenSpaces = [];
        while (c != b && this.spaceOnBoard(c)) {
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
            inBetweenSpaces.push(c);
        }
        inBetweenSpaces.push(c);
        return inBetweenSpaces;
    };
    Board.prototype.checkCanBeBlockedWithoutCreatingAnotherCheck = function (positionKing, positionAttacker, kingColor) {
        var spacesThatWouldBlockCheck = this.getSpacesBetweenIncludingEnd(positionKing, positionAttacker);
        for (var i = 0; i < this.pieces.length; i++) {
            for (var j = 0; j < spacesThatWouldBlockCheck.length; j++) {
                if (this.pieces[i].isColor(kingColor) && this.moveIsLegal(this.pieces[i], spacesThatWouldBlockCheck[j])) {
                    for (var k = 0; k < this.pieces.length; k++) {
                        if (i != k && this.moveIsLegalIgnoreSpecificPiece(this.pieces[k], positionKing, this.pieces[i])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.getMoveCount = function () {
        return this.moveCount;
    };
    Board.prototype.kingInCheck = function (colorOfKingToCheckIfInCheck) {
        var kingLocation = this.getLocationOfKingGivenColor(colorOfKingToCheckIfInCheck);
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(colorOfKingToCheckIfInCheck)) {
                if (this.moveIsLegal(this.pieces[i], kingLocation)) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.insufficientMaterial = function () {
        if (this.pieces.length < 3) {
            return true;
        }
        return false;
    };
    Board.prototype.getBoardStateStringArray = function () {
        var arrToDisplay = [];
        arrToDisplay.push("Board currently");
        var board = [];
        for (var i = 0; i < this.sizeOfBoardX; i++) {
            board[i] = [];
            for (var j = 0; j < this.sizeOfBoardY; j++) {
                board[i][j] = [];
                for (var k = 0; k < this.sizeOfBoardZ; k++) {
                    board[i][j][k] = this.boardEmptySpace;
                }
            }
        }
        for (var i = 0; i < this.pieces.length; i++) {
            var a = this.pieces[i].getPosition();
            board[a.getX() - 1][a.getY() - 1][a.getZ() - 1] = this.getPieceNotation(this.pieces[i]);
        }
        for (var z = this.sizeOfBoardZ - this.boardCoordinateMinimum; z >= 0; z--) {
            arrToDisplay.push("level: " + (z + this.boardCoordinateMinimum));
            for (var y = this.sizeOfBoardY - this.boardCoordinateMinimum; y >= 0; y--) {
                var row = "";
                row += "|";
                for (var x = 0; x <= this.sizeOfBoardX - this.boardCoordinateMinimum; x++) {
                    row += board[x][y][z];
                    row += "|";
                }
                arrToDisplay.push(row);
            }
            arrToDisplay.push(" ");
        }
        return arrToDisplay;
    };
    Board.prototype.getPieceNotation = function (piece) {
        var a = this.whiteNotation;
        if (piece.isColor("Black")) {
            a = this.blackNotation;
        }
        if (piece instanceof Pawn_1.Pawn) {
            return a + this.pawnNotation;
        }
        if (piece instanceof Rook_1.Rook) {
            return a + this.rookNoation;
        }
        if (piece instanceof Knight_1.Knight) {
            return a + this.knightNotation;
        }
        if (piece instanceof Bishop_1.Bishop) {
            return a + this.bishopNotation;
        }
        if (piece instanceof Unicorn_1.Unicorn) {
            return a + this.unicornNotation;
        }
        if (piece instanceof Queen_1.Queen) {
            return a + this.queenNotation;
        }
        if (piece instanceof King_1.King) {
            return a + this.kingNotation;
        }
    };
    return Board;
}());
exports["default"] = Board;
//# sourceMappingURL=Board.js.map