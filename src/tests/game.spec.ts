import  * as Lab from "@hapi/lab";
import { Game } from "../Game"
import { Position } from "..";
const { expect } = require("@hapi/code");
const lab = Lab.script();
const { describe, it, before } = lab;
export { lab };

describe("experiment", () => {
    before(() => {});

    it("verifies 1 equals 1", () => {
        expect(1).to.equal(1);
    });
    it("returns true when 1 + 1 equals 2", () => {
        expect(1 + 1).to.equal(2);
    });

    it("creates game", () => {
        const g = new Game(1);
        expect(g.getMoveHistory().length).to.equal(0)
    })

    // test move pawn forward
    it("creates game", () => {
        const g = new Game(1);
        expect(g.move(new Position(1, 2, 2), new Position(1, 2, 3))).to.equal(true)
    })

    // space a doesn't have a piece
    it("creates game", () => {
        const g = new Game(1);
        expect(g.move(new Position(3, 3, 3), new Position(1, 2, 3))).to.equal(false)
    })

    // space a has piece of wrong color, not their turn
    it("creates game", () => {
        const g = new Game(1);
        expect(g.move(new Position(1, 2, 4), new Position(1, 2, 3))).to.equal(false)
    })


    // test get move history
    it("creates game", () => {
        const g = new Game(1);
        g.move(new Position(1, 2, 2), new Position(1, 2, 3))
        expect(g.getMoveHistory().length).to.equal(2)
    })

    // test getpossible moves pawn, should be one forward and one up
    it("creates game", () => {
        const g = new Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 2, 2))).length).to.equal(2)
    })

    // test King has no moves at beginning of game
    it("creates game", () => {
        const g = new Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new Position(3, 1, 1))).length).to.equal(0)
    })


});

describe.skip("failure tests", () => {
    // this will fail
    it("will fail", () => {
        expect(true).to.equal(false)
    })
})