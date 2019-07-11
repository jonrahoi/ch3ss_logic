"use strict";
exports.__esModule = true;
var Lab = require("@hapi/lab");
var Game_1 = require("../Game");
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
        var g = new Game_1.Game();
        expect(g.moveCount).to.equal(0);
        expect(g.moveHistory.length).to.equal(0);
    });
});
describe("failure tests", function () {
    it("will fail", function () {
        expect(true).to.equal(false);
    });
});
//# sourceMappingURL=game.spec.js.map