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
    it("test get move history", function () {
        var g = new Game_1.Game(1);
        g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3));
        expect(g.getMoveHistory().length).to.equal(2);
        var history = g.getMoveHistory();
        for (var i = 0; i < history.length; i++) {
            console.log(history[i].getPostionString());
        }
    });
    it("test queening", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Pawn("White", 3, 4, 4)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(3, 4, 4), new __1.Position(3, 4, 5))).to.equal(true);
    });
});
//# sourceMappingURL=game.spec.js.map