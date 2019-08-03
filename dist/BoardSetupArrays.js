"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var King_1 = require("./King");
var Bishop_1 = require("./Bishop");
var Rook_1 = require("./Rook");
var Unicorn_1 = require("./Unicorn");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
function getRaumschachBoard(white, black) {
    return [
        new King_1.King(black, 3, 5, 5),
        new Rook_1.Rook(black, 1, 5, 5),
        new Rook_1.Rook(black, 5, 5, 5),
        new Knight_1.Knight(black, 2, 5, 5),
        new Knight_1.Knight(black, 4, 5, 5),
        new Pawn_1.Pawn(black, 1, 4, 5),
        new Pawn_1.Pawn(black, 2, 4, 5),
        new Pawn_1.Pawn(black, 3, 4, 5),
        new Pawn_1.Pawn(black, 4, 4, 5),
        new Pawn_1.Pawn(black, 5, 4, 5),
        new Queen_1.Queen(black, 3, 5, 4),
        new Bishop_1.Bishop(black, 1, 5, 4),
        new Bishop_1.Bishop(black, 4, 5, 4),
        new Unicorn_1.Unicorn(black, 2, 5, 4),
        new Unicorn_1.Unicorn(black, 5, 5, 4),
        new Pawn_1.Pawn(black, 1, 4, 4),
        new Pawn_1.Pawn(black, 2, 4, 4),
        new Pawn_1.Pawn(black, 3, 4, 4),
        new Pawn_1.Pawn(black, 4, 4, 4),
        new Pawn_1.Pawn(black, 5, 4, 4),
        new Queen_1.Queen(white, 3, 1, 2),
        new Bishop_1.Bishop(white, 1, 1, 2),
        new Bishop_1.Bishop(white, 4, 1, 2),
        new Unicorn_1.Unicorn(white, 2, 1, 2),
        new Unicorn_1.Unicorn(white, 5, 1, 2),
        new Pawn_1.Pawn(white, 1, 2, 2),
        new Pawn_1.Pawn(white, 2, 2, 2),
        new Pawn_1.Pawn(white, 3, 2, 2),
        new Pawn_1.Pawn(white, 4, 2, 2),
        new Pawn_1.Pawn(white, 5, 2, 2),
        new King_1.King(white, 3, 1, 1),
        new Rook_1.Rook(white, 1, 1, 1),
        new Rook_1.Rook(white, 5, 1, 1),
        new Knight_1.Knight(white, 2, 1, 1),
        new Knight_1.Knight(white, 4, 1, 1),
        new Pawn_1.Pawn(white, 1, 2, 1),
        new Pawn_1.Pawn(white, 2, 2, 1),
        new Pawn_1.Pawn(white, 3, 2, 1),
        new Pawn_1.Pawn(white, 4, 2, 1),
        new Pawn_1.Pawn(white, 5, 2, 1),
    ];
}
exports.getRaumschachBoard = getRaumschachBoard;
//# sourceMappingURL=BoardSetupArrays.js.map