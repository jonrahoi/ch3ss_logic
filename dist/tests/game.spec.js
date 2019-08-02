"use strict";
exports.__esModule = true;
var Lab = require("@hapi/lab");
var Game_1 = require("../Game");
var __1 = require("..");
var expect = require("@hapi/code").expect;
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
describe("experiment", function () {
    before(function () { });
    it("test stalemate", function () {
        var g = new Game_1.Game(1);
        var testCorneredKing = [
            new __1.King("White", 1, 1, 1),
            new __1.Pawn("Black", 1, 3, 1),
            new __1.Pawn("Black", 2, 3, 1),
            new __1.Pawn("Black", 3, 3, 1),
            new __1.Pawn("Black", 1, 3, 2),
            new __1.Pawn("Black", 2, 2, 2),
            new __1.Pawn("Black", 3, 2, 2),
            new __1.Queen("Black", 1, 1, 3),
            new __1.Queen("Black", 2, 1, 3),
            new __1.Queen("Black", 3, 1, 3),
            new __1.Queen("Black", 4, 1, 3),
            new __1.Queen("Black", 5, 1, 3),
            new __1.Queen("Black", 4, 2, 1),
            new __1.Queen("Black", 4, 2, 2),
            new __1.King("Black", 4, 1, 1),
            new __1.Queen("Black", 4, 1, 2)
        ];
        g.setPieces(testCorneredKing);
        g.printBoardStateToConsole();
        console.log(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1)));
        expect(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1)).length).to.equal(0);
        expect(g.gameIsDrawn()).to.equal(true);
    });
    it("test king taking piece and moving into check", function () {
        var g = new Game_1.Game(1);
        var testCorneredKing = [
            new __1.King("White", 1, 1, 1),
            new __1.Pawn("Black", 2, 2, 2),
            new __1.Queen("Black", 3, 2, 2),
            new __1.King("Black", 4, 1, 1),
        ];
        g.setPieces(testCorneredKing);
        g.printBoardStateToConsole();
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(2, 2, 2))).to.equal(false);
    });
});
//# sourceMappingURL=game.spec.js.map