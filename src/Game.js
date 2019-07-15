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
        this.thereIsCheck = false;
        this.checkMate = false;
        this.stalemate = false;
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
    Game.prototype.getCheck = function () {
        return this.thereIsCheck;
    };
    Game.prototype.getPositionOfWhitePiecesArray = function () {
        return this.board.getWhitePieces();
    };
    Game.prototype.getPositionOfBlackPiecesArray = function () {
        return this.board.getBlackPieces();
    };
    Game.prototype.move = function (a, b) {
        // validate positions are on board
        if (!this.validSpace(a) || !this.validSpace(b)) {
            return false;
        }
        console.log("inside Game.move, both valid spaces");
        // validate that if there is a check from last move then opponent is trying to move the king
        if (this.thereIsCheck && !(this.board.getPieceLocatedAt(a) instanceof Board_2["default"])) {
            return false;
        }
        console.log("inside Game.move, player isn't in check");
        var moveExecutedBool = this.board.executeMove(a, b);
        if (moveExecutedBool) {
            console.log("successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString());
            this.moveHistory.push(a);
            this.moveHistory.push(b);
            this.board.incrementMoveCount();
            // check if king is in check
            // if opponent king in check set bool
            if (this.board.kingInCheckFromPosition(b)) {
                this.thereIsCheck = true;
                console.log("inside game.ts there is check");
                // check if there is checkmate
                if (this.board.playerCheckmated(b)) {
                    this.checkMate = true;
                    console.log("inside game.ts there is checkmate");
                }
            }
            else {
                this.thereIsCheck = false;
                // TO DO check if create stalemate
                if (this.board.gameIsDrawn()) {
                    this.stalemate = true;
                }
            }
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
    // possibly TODO remove, used for testing
    Game.prototype.getPossibleMovesForPiece = function (piece) {
        var pieceB = piece;
        return this.board.getAllPossibleMovesPiece(pieceB);
    };
    // possibly TODO change to list of strings
    Game.prototype.getWhitePiecesTaken = function () {
        return this.board.getWhitePiecesTaken();
    };
    // TODO change to list of strings
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
    Game.prototype.getKingPiece = function () {
        var pos = this.board.getLocationOfKingGivenColor(this.board.getWhoseTurn());
        return this.board.getPieceLocatedAt(pos);
    };
    return Game;
}());
exports.Game = Game;
