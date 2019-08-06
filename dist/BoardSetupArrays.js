"use strict";
exports.__esModule = true;
var Knight_1 = require("./Knight");
var King_1 = require("./King");
var Bishop_1 = require("./Bishop");
var Rook_1 = require("./Rook");
var Unicorn_1 = require("./Unicorn");
var Pawn_1 = require("./Pawn");
var Queen_1 = require("./Queen");
var constants_1 = require("./constants");
function getRaumschachBoardSetup() {
    return [
        new King_1.King(constants_1.BLACK, 3, 5, 5),
        new Rook_1.Rook(constants_1.BLACK, 1, 5, 5),
        new Rook_1.Rook(constants_1.BLACK, 5, 5, 5),
        new Knight_1.Knight(constants_1.BLACK, 2, 5, 5),
        new Knight_1.Knight(constants_1.BLACK, 4, 5, 5),
        new Pawn_1.Pawn(constants_1.BLACK, 1, 4, 5),
        new Pawn_1.Pawn(constants_1.BLACK, 2, 4, 5),
        new Pawn_1.Pawn(constants_1.BLACK, 3, 4, 5),
        new Pawn_1.Pawn(constants_1.BLACK, 4, 4, 5),
        new Pawn_1.Pawn(constants_1.BLACK, 5, 4, 5),
        new Queen_1.Queen(constants_1.BLACK, 3, 5, 4),
        new Bishop_1.Bishop(constants_1.BLACK, 1, 5, 4),
        new Bishop_1.Bishop(constants_1.BLACK, 4, 5, 4),
        new Unicorn_1.Unicorn(constants_1.BLACK, 2, 5, 4),
        new Unicorn_1.Unicorn(constants_1.BLACK, 5, 5, 4),
        new Pawn_1.Pawn(constants_1.BLACK, 1, 4, 4),
        new Pawn_1.Pawn(constants_1.BLACK, 2, 4, 4),
        new Pawn_1.Pawn(constants_1.BLACK, 3, 4, 4),
        new Pawn_1.Pawn(constants_1.BLACK, 4, 4, 4),
        new Pawn_1.Pawn(constants_1.BLACK, 5, 4, 4),
        new Queen_1.Queen(constants_1.WHITE, 3, 1, 2),
        new Bishop_1.Bishop(constants_1.WHITE, 1, 1, 2),
        new Bishop_1.Bishop(constants_1.WHITE, 4, 1, 2),
        new Unicorn_1.Unicorn(constants_1.WHITE, 2, 1, 2),
        new Unicorn_1.Unicorn(constants_1.WHITE, 5, 1, 2),
        new Pawn_1.Pawn(constants_1.WHITE, 1, 2, 2),
        new Pawn_1.Pawn(constants_1.WHITE, 2, 2, 2),
        new Pawn_1.Pawn(constants_1.WHITE, 3, 2, 2),
        new Pawn_1.Pawn(constants_1.WHITE, 4, 2, 2),
        new Pawn_1.Pawn(constants_1.WHITE, 5, 2, 2),
        new King_1.King(constants_1.WHITE, 3, 1, 1),
        new Rook_1.Rook(constants_1.WHITE, 1, 1, 1),
        new Rook_1.Rook(constants_1.WHITE, 5, 1, 1),
        new Knight_1.Knight(constants_1.WHITE, 2, 1, 1),
        new Knight_1.Knight(constants_1.WHITE, 4, 1, 1),
        new Pawn_1.Pawn(constants_1.WHITE, 1, 2, 1),
        new Pawn_1.Pawn(constants_1.WHITE, 2, 2, 1),
        new Pawn_1.Pawn(constants_1.WHITE, 3, 2, 1),
        new Pawn_1.Pawn(constants_1.WHITE, 4, 2, 1),
        new Pawn_1.Pawn(constants_1.WHITE, 5, 2, 1),
    ];
}
exports.getRaumschachBoardSetup = getRaumschachBoardSetup;
//# sourceMappingURL=BoardSetupArrays.js.map