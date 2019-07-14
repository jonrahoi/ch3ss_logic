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
// game contains a board (with pieces)
// game contains history of moves
var Board = /** @class */ (function () {
    function Board() {
        this.pieces = Board.setupBoard();
        this.moves = 0;
        this.piecesTaken = [];
    }
    Board.setupBoard = function () {
        return [
            // Level E Black
            // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
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
            // Level D Black
            // Queen Dc5; Bishop Da5, Dd5; Unicorn Db5, De5; Pawn Da4, Db4, Dc4; Dd4; De4
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
            // // Level C Empty at beginning
            // // Level B White
            // // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
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
            // // Level A White
            // // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
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
    Board.prototype.executeMove = function (a, b) {
        // are A and B on the Board?
        // currently checked in TwoPlayerGame space entry validation
        // if (!this.spaceOnBoard(a) || !this.spaceOnBoard(b)) {
        //     return false;
        // }
        // get piece at position a
        console.log("inside board.executeMove");
        var movePiece;
        var pieceFound = false;
        for (var i = 0; i < this.pieces.length && !pieceFound; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                pieceFound = true;
                movePiece = this.pieces[i];
            }
        }
        // no piece at posA return false
        if (!pieceFound) {
            return false;
        }
        // is it the right color for whose turn it is
        if (!this.movePieceIsRightColor(movePiece)) {
            return false;
        }
        // is move legal, can this piece move to that square? (including all movement rules i.e. shape, jumping, etc)
        if (!this.moveIsLegal(movePiece, b)) {
            return false;
        }
        console.log("inside board.executeMove, right color, move legal");
        // const whoseTurn = movePiece.getColor();
        // // get current location of king
        // const whoseTurnKingPosition = this.getLocationOfKingGivenColor(whoseTurn);
        // // is the King in check?, if you're king is in check then you have to move the king
        // if (this.playersKingInCheckAtSpace(whoseTurn, whoseTurnKingPosition) && this.getLocationOfKingGivenColor(whoseTurn) != a) {
        //     return false;
        // }
        // // is King moving into check?
        // if (this.playersKingInCheckAtSpace(whoseTurn, b)) {
        //     return false;
        // }
        // // is there a piece at space B?, delete piece if there
        // if (this.pieceLocatedAtBool(b)) {
        //     this.deletePieceAtPosition(b);
        // }
        // // move piece
        movePiece.moveTo(b);
        return true; // move executed successfully
        // castling, en passant not available in RUAMSCHACH
    };
    // TODO debug
    Board.prototype.moveIsLegal = function (movePiece, b) {
        // check if piece at b and if same color
        // console.log("1: checking for piece located at: " + movePiece.getPostionString());
        // console.log("2: checking for move to: " + b.getPostionString());
        // console.log("piece located at b: " + this.pieceLocatedAtBool(b));
        // if (this.pieceLocatedAtBool(b)) {
        //     console.log("piece same color: " + this.getPieceLocatedAt(b).sameColor(movePiece));
        // }
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            return false;
        }
        // check if move shape correct
        if (!movePiece.canMoveTo(b)) {
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight_1.Knight) {
            return true;
        }
        // if pawn moving in right direction
        if (movePiece instanceof Pawn_1.Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                return false;
            }
            // if pawn and moving right direction and correct shape no need to check piece in way (only one space)
            return true;
        }
        // console.log("2:    inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            return false;
        }
        return true;
    };
    Board.prototype.executeMoveNoLegalCheck = function (a, b) {
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        // move piece
        this.getPieceLocatedAt(a).moveTo(b);
    };
    // kingCanMove(): boolean {
    //     // get whose turn it is
    //     const whoseTurn = this.getStringWhoseTurn();
    //     // return kingCantMove
    //     if (this.getAllPossibleMoves(this.getLocationOfKingGivenColor(whoseTurn)).length == 0) {
    //         return false;
    //     }
    //     return true;
    // }
    Board.prototype.kingInCheckFromPosition = function (pos) {
        // find opposite color
        var color = "Black";
        var piece = this.getPieceLocatedAt(pos);
        if (piece.getColor().localeCompare("Black") == 0) {
            color = "White";
        }
        if (piece.canMoveTo(this.getLocationOfKingGivenColor(color))) {
            return true;
        }
        return false;
    };
    Board.prototype.gameIsDrawn = function () {
        var whoseTurn = this.getWhoseTurn();
        // TODO are we incrementing the move count properly?
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare(whoseTurn) == 0) {
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
        if (piece.getColor().localeCompare("Black") == 0 && this.getWhoseTurn().localeCompare("Black") == 0) {
            return false;
        }
        return true;
    };
    Board.prototype.getWhoseTurn = function () {
        var whoseTurn = "White";
        if (this.moves % 2 == 1) {
            whoseTurn = "Black";
        }
        return whoseTurn;
    };
    // getWhitePieceLocations(): string[] {
    //     const locations: string[] = [];
    //     for (let i = 0; i < this.pieces.length; i++) {
    //         if (!this.pieces[i].getColor().localeCompare("White")) {
    //             locations.push(this.pieces[i].getPostionString() + this.pieces[i].getName());
    //         }
    //     }
    //     return locations;
    // }
    Board.prototype.getWhitePieces = function () {
        var pieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare("White") == 0) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    };
    Board.prototype.getBlackPieces = function () {
        var pieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare("Black") == 0) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    };
    Board.prototype.getWhitePiecesTaken = function () {
        var piecesTakenArray = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].getColor().localeCompare("White") == 0)) {
                piecesTakenArray.push(this.pieces[i]);
            }
        }
        return piecesTakenArray;
    };
    Board.prototype.getBlackPiecesTaken = function () {
        var piecesTakenArray = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].getColor().localeCompare("Black") == 0)) {
                piecesTakenArray.push(this.pieces[i]);
            }
        }
        return piecesTakenArray;
    };
    Board.prototype.pawnMoveDirectionCorrect = function (colorOfPawn, a, b) {
        // if white needs to move up(dz is positive) or across (dy is positive)
        // if black needs to move down(dz is negative) or across (dy is positive)
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
            // if opposing team, can move to where the King is, and isn't blocked
            if (!(this.pieces[i].getColor().localeCompare("whoseTurn") == 0) &&
                this.pieces[i].canMoveTo(positionKing) &&
                !this.pieceInWay(this.pieces[i].getPosition(), positionKing)) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.getLocationOfKingGivenColor = function (color) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King_1.King && this.pieces[i].getColor().localeCompare(color) == 0) {
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
        // let x = a.getX;
        // iterate through all the places between position a and position b
        var dx = this.getSlope(a.getX(), b.getX());
        var dy = this.getSlope(a.getY(), b.getY());
        var dz = this.getSlope(a.getZ(), b.getZ());
        var c = new Piece_1.Position(a.getX(), a.getY(), a.getZ());
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
    // TODO debug
    Board.prototype.getAllPossibleMovesPiece = function (pieceToMove) {
        var possibleMoves = [];
        // iterate through all spaces on board
        for (var x = 1; x < 6; x++) {
            for (var y = 1; y < 6; y++) {
                for (var z = 1; z < 6; z++) {
                    var piece = pieceToMove;
                    // create a position with the three iterators
                    // console.log("iterators: " + x + " " + y + " " + z);
                    // console.log("piece location: " + piece.getPostionString());
                    var space = new Piece_1.Position(x, y, z);
                    var pieceToSend = piece;
                    if (this.moveIsLegal(pieceToSend, space)) {
                        possibleMoves.push(space);
                    }
                    // console.log("after testing if move legal: " + piece.getPostionString());
                }
            }
        }
        // console.log("inside board.ts after getAllPossibleMovesPiece, position: " + pieceToMove.getPostionString());
        return possibleMoves;
    };
    Board.prototype.getAllPossibleMovesPosition = function (a) {
        var possibleMoves = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        var movePiece = this.getPieceLocatedAt(a);
        // iterate through all spaces on board
        for (var i = 1; i < 6; i++) {
            for (var j = 1; j < 6; j++) {
                for (var k = 1; k < 6; k++) {
                    // create a position with the three iterators
                    var space = new Piece_1.Position(i, j, k);
                    if (this.moveIsLegal(movePiece, space)) {
                        possibleMoves.push(space);
                    }
                }
            }
        }
        return possibleMoves;
    };
    return Board;
}());
exports["default"] = Board;
