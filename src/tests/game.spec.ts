import  * as Lab from "@hapi/lab";
import { Game } from "../Game"
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
        const g = new Game()
        //expect(g.moveCount).to.equal(0)
        expect(g.moveHistory.length).to.equal(0)
    })

});

describe("failure tests", () => {
    // this will fail
    it("will fail", () => {
        expect(true).to.equal(false)
    })
})