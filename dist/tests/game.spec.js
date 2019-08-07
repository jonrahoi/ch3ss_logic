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
    it("test take back a move", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 3, 2))).to.equal(true);
        g.takeBackLastMove();
        expect(g.getMoveCount()).to.equal(0);
        expect(g.move(new __1.Position(1, 4, 4), new __1.Position(1, 4, 3))).to.equal(false);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3))).to.equal(true);
    });
});
//# sourceMappingURL=game.spec.js.map