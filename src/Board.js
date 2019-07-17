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
        this.moveCount = 0;
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
    Board.prototype.setPieces = function (newPieces) {
        this.pieces = newPieces;
    };
    /**
     * Executes move if possible: checks if piece at pos A, if move is legal (separate method),
     * if pawn needs to be queened, if king moving into check, deletes piece at B if necessary
     * @param a space A (from)
     * @param b space B (to)
     */
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
        // Queening of pawn
        if (movePiece instanceof Pawn_1.Pawn && this.checkForQueening(movePiece, b)) {
            this.deletePieceAtPosition(a);
            var newQueen = new Queen_1.Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            console.log("inside board.executeMove, pawn queened, move executed");
            return true;
        }
        // is King moving into check?
        if (movePiece instanceof King_1.King && this.kingInCheckAtSpace(movePiece.getOppositeColor(), b)) {
            console.log("inside board.execute player's king in check, move not executed");
            return false;
        }
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
            console.log("inside board.executeMove deleting piece at " + b.getPostionString());
        }
        // // move piece
        movePiece.moveTo(b);
        console.log("inside board.executeMove, move executed");
        this.moveCount++;
        return true; // move executed successfully
        // castling, en passant not available in RUAMSCHACH
    };
    /**
     * Checks if move is legal for a specific piece to go to space A given board state, independent of whose turn it is
     * @param movePiece piece to check for movement
     * @param b space to check move to
     */
    Board.prototype.moveIsLegal = function (movePiece, b) {
        // check if move shape correct
        if (!movePiece.canMoveTo(b)) {
            // console.log("inside moveIsLegal, move shape incorrect")
            return false;
        }
        // check if piece at b and if same color
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            // console.log("inside moveIsLegal, move space has piece of same color")
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight_1.Knight) {
            // console.log("inside moveIsLegal")
            return true;
        }
        // if pawn moving in right direction, no need to check piece in way (only one space)
        if (movePiece instanceof Pawn_1.Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                // console.log("inside moveIsLegal, pawn incorrect direction")
                return false;
            }
            return true;
        }
        // console.log("2:    inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            // console.log("inside moveIsLegal, piece is in way")
            return false;
        }
        // console.log("inside moveIsLegal")
        return true;
    };
    Board.prototype.checkForQueening = function (movePiece, b) {
        // moving to position
        if (movePiece.isWhite() && b.getY() == 5 && b.getZ() >= 4 || !movePiece.isWhite() && b.getY() == 1 && b.getZ() <= 2) {
            return true;
        }
    };
    Board.prototype.executeMoveNoLegalCheck = function (a, b) {
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        // check for queening
        var movePiece = this.getPieceLocatedAt(a);
        if (movePiece instanceof Pawn_1.Pawn && this.checkForQueening(movePiece, b)) {
            this.deletePieceAtPosition(a);
            var newQueen = new Queen_1.Queen(movePiece.getColor(), b.getX(), b.getY(), b.getZ());
            this.pieces.push(newQueen);
            return;
        }
        // move piece
        this.getPieceLocatedAt(a).moveTo(b);
        this.moveCount++;
    };
    Board.prototype.kingInCheckFromPosition = function (pos) {
        // find opposite color
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
                if (this.getAllPossibleMovesPiece(this.pieces[i]).length > 0) {
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
    Board.prototype.getPiecesByColor = function (color) {
        var pieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isColor(color)) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    };
    Board.prototype.getPiecesTakenByColor = function (color) {
        var piecesTakenArray = [];
        for (var i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].isColor(color))) {
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
        var newPieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(b)) {
                this.piecesTaken.push(this.pieces[i]);
            }
            else {
                newPieces.push(this.pieces[i]);
            }
        }
        this.pieces = newPieces;
    };
    Board.prototype.kingInCheckAtSpace = function (opponentColor, positionKing) {
        for (var i = 0; i < this.pieces.length; i++) {
            // if opposing team, can move to where the King is, and isn't blocked
            if ((this.pieces[i].isColor(opponentColor)) && this.moveIsLegal(this.pieces[i], positionKing)) {
                // console.log(" inside board.ts King in check at space: " + positionKing.getPostionString() + " from piece at " + this.pieces[i].getPosition().getPostionString());
                return true;
            }
        }
        return false;
    };
    Board.prototype.getLocationOfKingGivenColor = function (color) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King_1.King && this.pieces[i].isColor(color)) {
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
        // console.log("slopes: " + dx, dy, dz)
        var c = new Piece_1.Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (!c.samePosition(b) && this.spaceOnBoard(c)) {
            // console.log("Positions in piece in way: " + c.getPostionString() + "  " + b.getPostionString())
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
    /**
     * @param pieceToMove Gets all possible move for specific piece
     */
    Board.prototype.getAllPossibleMovesPiece = function (pieceToMove) {
        var possibleMoves = [];
        // iterate through all spaces on board
        for (var x = 1; x < 6; x++) {
            for (var y = 1; y < 6; y++) {
                for (var z = 1; z < 6; z++) {
                    var piece = pieceToMove;
                    // create a position with the three iterators
                    var space = new Piece_1.Position(x, y, z);
                    var pieceToSend = piece;
                    if (piece instanceof King_1.King) {
                        if (this.moveIsLegal(pieceToSend, space) && !this.kingInCheckAtSpace(piece.getOppositeColor(), space)) {
                            possibleMoves.push(space);
                        }
                    }
                    else if (this.moveIsLegal(pieceToSend, space)) {
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
        return this.getAllPossibleMovesPiece(movePiece);
    };
    /**
     * Checks if king can't move and if no piece can move in between attacking piece and king and no piece can attack attacking piece
     * @param a Position of piece that initiated check (needed to check if opponent can take or block piece)
     */
    Board.prototype.playerCheckmated = function (a) {
        // get location of king
        var kingColor = this.getPieceLocatedAt(a).getOppositeColor();
        var locationKing = this.getLocationOfKingGivenColor(kingColor);
        if (!(this.getAllPossibleMovesPosition(locationKing).length == 0)) {
            return false; // king not stuck
        }
        // figure out if no pieces can move between king and attacking piece
        return !this.checkCanBeBlocked(locationKing, a, kingColor);
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
    Board.prototype.checkCanBeBlocked = function (positionKing, positionAttacker, kingColor) {
        var spaces = this.getSpacesBetweenIncludingEnd(positionKing, positionAttacker);
        for (var i = 0; i < this.pieces.length; i++) {
            if (!this.pieces[i].isColor(kingColor)) {
                for (var j = 0; j < spaces.length; j++) {
                    if (this.moveIsLegal(this.pieces[i], spaces[j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Board.prototype.getMoveCount = function () {
        return this.moveCount;
    };
    return Board;
}());
exports["default"] = Board;
