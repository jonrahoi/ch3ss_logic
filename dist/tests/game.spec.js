"use strict";
exports.__esModule = true;
var Lab = require("@hapi/lab");
var Game_1 = require("../Game");
var __1 = require("..");
var expect = require("@hapi/code").expect;
var lab = Lab.script();
exports.lab = lab;
var describe = lab.describe, it = lab.it, before = lab.before;
var constants_1 = require("../constants");
describe("experiment", function () {
    before(function () { });
    it("verifies 1 equals 1", function () {
        expect(1).to.equal(1);
    });
    it("returns true when 1 + 1 equals 2", function () {
        expect(1 + 1).to.equal(2);
    });
    it("creates game", function () {
        var p = new __1.Pawn(constants_1.WHITE, 1, 1, 1);
        expect(p.getColor()).to.equal(constants_1.WHITE);
        expect(p.getPosition().getX()).to.equal(1);
        expect(p.getPosition().getY()).to.equal(1);
        expect(p.getPosition().getZ()).to.equal(1);
        expect(p.getPosition().getPostionString()).to.equal("111");
    });
    it("creates game", function () {
        var g = new Game_1.Game(1);
        expect(g.getMoveHistory().length).to.equal(0);
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
    it("king no moves at start", function () {
        var g = new Game_1.Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(3, 1, 1))).length).to.equal(0);
    });
    it("test checkmate", function () {
        var g = new Game_1.Game(1);
        var kingInCheckMate = [
            new __1.King(constants_1.WHITE, 1, 1, 1),
            new __1.Pawn(constants_1.BLACK, 1, 3, 1),
            new __1.Pawn(constants_1.BLACK, 2, 3, 1),
            new __1.Pawn(constants_1.BLACK, 3, 3, 1),
            new __1.Pawn(constants_1.BLACK, 1, 3, 2),
            new __1.Pawn(constants_1.BLACK, 2, 2, 2),
            new __1.Pawn(constants_1.BLACK, 3, 2, 2),
            new __1.Queen(constants_1.BLACK, 1, 1, 3),
            new __1.Queen(constants_1.BLACK, 2, 1, 3),
            new __1.Queen(constants_1.BLACK, 3, 1, 3),
            new __1.Queen(constants_1.BLACK, 4, 1, 3),
            new __1.Queen(constants_1.BLACK, 5, 1, 3),
            new __1.Queen(constants_1.BLACK, 4, 2, 1),
            new __1.Queen(constants_1.BLACK, 4, 2, 2),
            new __1.King(constants_1.BLACK, 4, 1, 1),
            new __1.Queen(constants_1.BLACK, 4, 1, 2)
        ];
        g.setPieces(kingInCheckMate);
        expect(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1)).length).to.equal(0);
        expect(g.getCheckMate()).to.equal(true);
    });
    it("test check", function () {
        var g = new Game_1.Game(1);
        var kingInCorner = [
            new __1.King(constants_1.BLACK, 1, 1, 1),
            new __1.Queen(constants_1.WHITE, 4, 2, 2),
            new __1.King(constants_1.WHITE, 5, 5, 5),
            new __1.Pawn(constants_1.WHITE, 1, 5, 5),
            new __1.Pawn(constants_1.WHITE, 2, 5, 5),
            new __1.Pawn(constants_1.WHITE, 3, 5, 5)
        ];
        g.setPieces(kingInCorner);
        expect(g.getStaleMate()).to.equal(false);
        expect(g.getCheckMate()).to.equal(false);
        expect(g.move(new __1.Position(4, 2, 2), new __1.Position(4, 1, 1))).to.equal(true);
        expect(g.getCheck()).to.equal(true);
        expect(g.getStaleMate()).to.equal(false);
        expect(g.getCheckMate()).to.equal(false);
    });
    it("test stalemate", function () {
        var g = new Game_1.Game(1);
        var kingInCheckMate = [
            new __1.King(constants_1.WHITE, 1, 1, 1),
            new __1.Pawn(constants_1.BLACK, 1, 3, 1),
            new __1.Pawn(constants_1.BLACK, 2, 3, 1),
            new __1.Pawn(constants_1.BLACK, 3, 3, 1),
            new __1.Pawn(constants_1.BLACK, 1, 3, 2),
            new __1.Pawn(constants_1.BLACK, 2, 2, 2),
            new __1.Pawn(constants_1.BLACK, 3, 2, 2),
            new __1.Queen(constants_1.BLACK, 4, 2, 1),
            new __1.Queen(constants_1.BLACK, 4, 2, 2),
            new __1.King(constants_1.BLACK, 3, 1, 1),
            new __1.Queen(constants_1.BLACK, 4, 1, 2)
        ];
        g.setPieces(kingInCheckMate);
        expect(g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1)).length).to.equal(0);
        expect(g.getCheckMate()).to.equal(false);
        expect(g.getStaleMate()).to.equal(true);
    });
    it("test king taking piece and moving into check", function () {
        var g = new Game_1.Game(1);
        var testCorneredKing = [
            new __1.King(constants_1.WHITE, 1, 1, 1),
            new __1.Pawn(constants_1.BLACK, 2, 2, 2),
            new __1.Queen(constants_1.BLACK, 3, 2, 2),
            new __1.King(constants_1.BLACK, 4, 1, 1),
        ];
        g.setPieces(testCorneredKing);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(2, 2, 2))).to.equal(false);
    });
    it("test queening", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Pawn(constants_1.WHITE, 3, 4, 4)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(3, 4, 4), new __1.Position(3, 5, 4))).to.equal(true);
        pieces = g.getPieces();
        expect(pieces.length).to.equal(1);
        expect(pieces[0] instanceof __1.Queen).to.equal(true);
    });
    it("test white and black turns", function () {
        var g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3))).to.equal(true);
        expect(g.move(new __1.Position(3, 2, 2), new __1.Position(3, 2, 3))).to.equal(false);
        expect(g.move(new __1.Position(1, 4, 4), new __1.Position(1, 3, 4))).to.equal(true);
        expect(g.move(new __1.Position(3, 4, 4), new __1.Position(3, 3, 4))).to.equal(false);
    });
    it("pawn possible moves", function () {
        var g = new Game_1.Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 2, 2))).length).to.equal(2);
        g = new Game_1.Game(1);
        expect(g.move(new __1.Position(1, 2, 2), new __1.Position(1, 2, 3))).to.equal(true);
    });
    it("test knight possible moves", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Knight(constants_1.WHITE, 1, 1, 1), new __1.Pawn(constants_1.WHITE, 2, 1, 1), new __1.Pawn(constants_1.WHITE, 2, 2, 2)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(2, 3, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 3, 2))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.Knight(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(6);
        g = new Game_1.Game(1);
        pieces = [new __1.Knight(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(6);
    });
    it("test bishop possible moves", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Bishop(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 1, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 2, 2))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.Bishop(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(12);
        g = new Game_1.Game(1);
        pieces = [new __1.Bishop(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(12);
    });
    it("test unicorn possible moves", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Unicorn(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 1, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(2, 2, 2))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.Unicorn(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(4);
        g = new Game_1.Game(1);
        pieces = [new __1.Unicorn(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(4);
    });
    it("test rook movement", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Rook(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 2, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 1, 4))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.Rook(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(12);
        g = new Game_1.Game(1);
        pieces = [new __1.Rook(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(12);
    });
    it("test queen movement", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.Queen(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 3, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 1, 4))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.Queen(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(28);
        g = new Game_1.Game(1);
        pieces = [new __1.Queen(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(28);
    });
    it("test king movement", function () {
        var g = new Game_1.Game(1);
        var pieces = [new __1.King(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 3, 2))).to.equal(false);
        expect(g.move(new __1.Position(1, 1, 1), new __1.Position(1, 1, 2))).to.equal(true);
        g = new Game_1.Game(1);
        pieces = [new __1.King(constants_1.WHITE, 1, 1, 1)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(1, 1, 1))).length).to.equal(7);
        g = new Game_1.Game(1);
        pieces = [new __1.King(constants_1.WHITE, 5, 5, 5)];
        g.setPieces(pieces);
        expect((g.getPossibleMovesForPieceAtSpace(new __1.Position(5, 5, 5))).length).to.equal(7);
    });
    it("test get position from string", function () {
        var g = new Game_1.Game(1);
        expect(g.isValidSpaceFromString("sfa")).to.equal(false);
        expect(g.isValidSpaceFromString("492")).to.equal(false);
        expect(g.isValidSpaceFromString("831")).to.equal(false);
        expect(g.isValidSpaceFromString("230")).to.equal(false);
        expect(g.isValidSpaceFromString("111")).to.equal(true);
    });
});
//# sourceMappingURL=game.spec.js.map