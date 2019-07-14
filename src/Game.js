"use strict";
exports.__esModule = true;
// game contains a board (with pieces)
var Board_1 = require("./Board");
var Piece_1 = require("./Piece");
var Board_2 = require("./Board");
// game writes to JSON file for history of moves
var Game = /** @class */ (function () {
    function Game() {
        // id?
        // name?
        this.moveCount = 0;
        this.moveHistory = [];
        this.board = new Board_1["default"]();
        this.previousMoveCreatedCheck = false;
    }
    // Create a new game
    Game.prototype.newGame = function () {
        this.board = new Board_1["default"]();
        this.moveHistory = [];
    };
    /*
        let game = TwoPlayerGame();
    
        // for moving:
        // get strings a and b from textboxes
        let moveSuccessful = game.move(a, b);
        if (!moveSuccessful) {
    
        }
          // logic should be:
        // move A to B
        // if player in check
        // if player in checkmate say checkmate
        // else is player in draw
        // if player not in check is
        if (game.playerInCheck) {
            if (game.playerCheckmated) {
                //message on screen player checkmated
            }
            else
            //message on screen player in check
        }
        else if (game.GameIsDrawn()) {
            //message game is drawn
        }
    
        // for getting possible moves
        // get string from textbox space a
        let moveArray = game.getAllPossibleMovesSpace(a);
        // display possible moves
       */
    Game.prototype.getPositionOfWhitePiecesArray = function () {
        return this.board.getWhitePieces();
    };
    Game.prototype.getPositionOfBlackPiecesArray = function () {
        return this.board.getBlackPieces();
    };
    Game.prototype.move = function (a, b) {
        if (!this.validSpace(a) || !this.validSpace(b)) {
            return false;
        }
        console.log("inside Game.move, both valid spaces");
        if (this.playerInCheck() && !(this.board.getPieceLocatedAt(a) instanceof Board_2["default"])) {
            return false;
        }
        console.log("inside Game.move, player isn't in check");
        var moveExecutedBool = this.board.executeMove(a, b);
        if (moveExecutedBool) {
            console.log("successfully moved piece " + this.board.getPieceLocatedAt(b).getColor() + " from: " + a.getPostionString() + " to " + b.getPostionString());
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            this.board.incrementMoveCount();
        }
        return moveExecutedBool;
    };
    Game.prototype.gameIsDrawn = function () {
        return this.board.gameIsDrawn();
    };
    Game.prototype.setPreviousMoveCreatedCheck = function (b) {
        this.previousMoveCreatedCheck = b;
    };
    Game.prototype.getPositionFromString = function (a) {
        return new Piece_1.Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
    };
    Game.prototype.getWhitePieces = function () {
        return this.board.getWhitePieces();
    };
    Game.prototype.getBlackPieces = function () {
        return this.board.getBlackPieces();
    };
    Game.prototype.playerInCheck = function () {
        if (this.moveHistory.length == 0) {
            return false;
        }
        var lastMove = this.moveHistory[this.moveHistory.length - 1];
        return this.board.kingInCheckFromPosition(lastMove);
    };
    Game.prototype.playerCheckmated = function () {
        // get location of king
        var color = "Black";
        if (this.getWhoseTurnItIs().localeCompare("Black") == 0) {
            color = "White";
        }
        var locationKing = this.board.getLocationOfKingGivenColor(color);
        if (this.board.getAllPossibleMovesPosition(locationKing).length < 1) {
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
        return this.board.getAllPossibleMovesPiece(pieceB);
    };
    Game.prototype.getWhitePiecesTaken = function () {
        return this.board.getWhitePiecesTaken();
    };
    Game.prototype.getBlackPiecesTaken = function () {
        return this.board.getBlackPiecesTaken();
    };
    Game.prototype.loadGame = function () {
        // go through moves array and move the board each space
        this.moveHistory = JSON.parse("moveHistory");
        for (var i = 0; i < this.moveHistory.length; i += 2) {
            this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
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
            this.board.executeMoveNoLegalCheck(this.moveHistory[i], this.moveHistory[i + 1]);
        }
    };
    Game.prototype.goForwardOneMove = function () {
        // TODO
    };
    Game.prototype.validSpace = function (a) {
        return this.board.spaceOnBoard(a);
    };
    Game.prototype.moveIsLegalDebug = function (a, b) {
        return this.board.moveIsLegal(a, b);
    };
    return Game;
}());
exports.Game = Game;
