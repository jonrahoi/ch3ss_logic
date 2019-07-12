"use strict";
exports.__esModule = true;
var Game_1 = require("../Game");
var game = new Game_1.Game();
var blackPieces = game.getBlackPieceLocations();
var whitePieces = game.getWhitePieceLocations();
displayPieces("black pieces: ", blackPieces);
displayPieces("white pieces: ", blackPieces);
function displayPieces(message, pieces) {
    for (var i = 0; i < pieces.length; i++) {
        console.log(blackPieces[i]);
    }
}
