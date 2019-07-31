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
    it("verifies 1 equals 1", function () {
        expect(1).to.equal(1);
    });
    it("returns true when 1 + 1 equals 2", function () {
        expect(1 + 1).to.equal(2);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect(g.getMoveHistory().length).to.equal(0);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3))).to.equal(true);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(3, 3, 3), new __1.Position(1, 2, 3))).to.equal(false);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 4), new __1.Position(1, 2, 3))).to.equal(false);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3));
        expect(g.getMoveHistory().length).to.equal(2);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 2, 2))).length).to.equal(2);
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(3, 1, 1))).length).to.equal(0);
    });
});
describe.skip("failure tests", function () {
    it("will fail", function () {
        expect(true).to.equal(false);
    });
});
//# sourceMappingURL=game.spec.js.map