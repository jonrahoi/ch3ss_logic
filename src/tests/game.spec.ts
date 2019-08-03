import  * as Lab from "@hapi/lab";
import { Game } from "../Game"
import { Piece, Position, King, Queen, Pawn, Knight, Rook, Unicorn, Bishop } from "..";
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


    // it("test move pawn forward", () => {
    //     const g = new Game(1);
    //     expect(g.move(new Position(1, 2, 2), new Position(1, 2, 3))).to.equal(true)
    // })

    // it("space a doesn't have a piece", () => {
    //     const g = new Game(1);
    //     expect(g.move(new Position(3, 3, 3), new Position(1, 2, 3))).to.equal(false)
    // })

    // // space a has piece of wrong color, not their turn
    // it("piece of wrong color", () => {
    //     const g = new Game(1);
    //     expect(g.move(new Position(1, 2, 4), new Position(1, 2, 3))).to.equal(false)
    // })

    // test get move history
    it("test get move history", () => {
        const g = new Game(1);
        g.move(new Position(1, 2, 2), new Position(1, 2, 3))
        expect(g.getMoveHistory().length).to.equal(2)
        let history = g.getMoveHistory();
        for (let i = 0; i < history.length; i++) {
            console.log(history[i].getPostionString());
        }
    })

    // // test getpossible moves pawn, should be one forward and one up
    // it("pawn possible moves", () => {
    //     const g = new Game(1);
    //     g.printBoardStateToConsole();
    //     console.log(g.getPossibleMovesForPieceAtSpace(new Position(1, 2, 2)))
    //     expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 2, 2))).length).to.equal(2)
    // })

    // // test King has no moves at beginning of game
    // it("king no moves at start", () => {
    //     const g = new Game(1);
    //     expect((g.getPossibleMovesForPieceAtSpace(new Position(3, 1, 1))).length).to.equal(0)
    // })

    // // test checkmate
    // it("test checkmate", () => {
    //     const g = new Game(1);
    //     const testCorneredKing = [
    //         new King("White", 1, 1, 1),
    //         new Pawn("Black", 1, 3, 1),
    //         new Pawn("Black", 2, 3, 1),
    //         new Pawn("Black", 3, 3, 1),
    //         new Pawn("Black", 1, 3, 2),
    //         new Pawn("Black", 2, 2, 2),
    //         new Pawn("Black", 3, 2, 2),
        
    //         new Queen("Black", 1, 1, 3),
    //         new Queen("Black", 2, 1, 3),
    //         new Queen("Black", 3, 1, 3),
    //         new Queen("Black", 4, 1, 3),
    //         new Queen("Black", 5, 1, 3),
        
    //         new Queen("Black", 4, 2, 1),
    //         new Queen("Black", 4, 2, 2),
    //         new King("Black", 4, 1, 1),
    //         new Queen("Black", 4, 1, 2)
    //     ]
    //     g.setPieces(testCorneredKing);
    //     g.printBoardStateToConsole();
    //     // g.setMoveCount(1);
    //     // expect(1).to.equal(1);
    //     expect(g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1)).length).to.equal(0)
    //     expect(g.getCheckMate()).to.equal(true);
    // })


    // it("test king taking piece and moving into check", () => {
    //     const g = new Game(1);
    //     const testCorneredKing = [
    //         new King("White", 1, 1, 1),
    //         new Pawn("Black", 2, 2, 2),
    //         new Queen("Black", 3, 2, 2),
    //         new King("Black", 4, 1, 1),
    //     ]
    //     g.setPieces(testCorneredKing);
    //     g.printBoardStateToConsole();
    //     expect(g.move(new Position(1, 1, 1), new Position(2, 2, 2))).to.equal(false);
    // })

    // test queening
    it("test queening", () => {
        const g = new Game(1);
        let pieces = [new Pawn("White", 3, 4, 4)]
        g.setPieces(pieces)
        expect(g.move(new Position(3, 4, 4), new Position(3, 4, 5))).to.equal(true);
        // pieces = g.getPieces();
        // expect(pieces.length).to.equal(1);
        // expect(pieces[0] instanceof Queen).to.equal(true);
        // expect((g.getPossibleMovesForPieceAtSpace(new Position(3, 1, 1))).length).to.equal(0)
    })

});



// describe.skip("failure tests", () => {
//     // this will fail
//     it("will fail", () => {
//         expect(true).to.equal(false)
//     })
// })