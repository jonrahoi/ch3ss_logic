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
    it("test view back one move, not takeback", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 3, 2))).to.equal(true);
        g.changeBoardStateNumberMoves(-1);
        g.printBoardStateToConsole();
        expect(g.getMoveCount()).to.equal(1);
        expect(g.move(new __1.Position(1, 4, 4), new __1.Position(1, 4, 3))).to.equal(true);
        g.printBoardStateToConsole();
        g.changeBoardStateNumberMoves(-1);
        g.changeBoardStateNumberMoves(1);
        g.printBoardStateToConsole();
    });
});
//# sourceMappingURL=game.spec.js.map