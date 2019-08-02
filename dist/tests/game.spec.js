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
    it("test move pawn forward", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3))).to.equal(true);
    });
});
//# sourceMappingURL=game.spec.js.map