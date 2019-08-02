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
    it("space a doesn't have a piece", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(3, 3, 3), new __1.Position(1, 2, 3))).to.equal(false);
    });
    it("piece of wrong color", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 4), new __1.Position(1, 2, 3))).to.equal(false);
    });
    it("test get move history", function () {
        var g = new Game_1.Game(1);
        g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3));
        expect(g.getMoveHistory().length).to.equal(2);
    });
    it("pawn possible moves", function () {
        var g = new Game_1.Game(1);
        g.printBoardStateToConsole();
        console.log(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 2, 2)));
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 2, 2))).length).to.equal(2);
    });
    it("king no moves at start", function () {
        var g = new Game_1.Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(3, 1, 1))).length).to.equal(0);
    });
    it("test checkmate", function () {
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
        expect(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1)).length).to.equal(0);
        expect(g.getCheckMate()).to.equal(true);
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
    it("test queening", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Pawn("White", 3, 4, 4)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(3, 4, 4), new __1.Position(3, 4, 5))).to.equal(true);
    });
});
//# sourceMappingURL=game.spec.js.map