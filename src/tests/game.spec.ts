import  * as Lab from "@hapi/lab";
import { Game } from "../Game"
import { Piece, Position, King, Queen, Pawn, Knight, Rook, Unicorn, Bishop } from "..";
const { expect } = require("@hapi/code");
const lab = Lab.script();
const { describe, it, before } = lab;
export { lab };
import { WHITE, BLACK } from "../constants"

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

    it("space a doesn't have a piece", () => {
        const g = new Game(1);
        expect(g.move(new Position(3, 3, 3), new Position(1, 2, 3))).to.equal(false)
    })

    // space a has piece of wrong color, not their turn
    it("piece of wrong color", () => {
        const g = new Game(1);
        expect(g.move(new Position(1, 2, 4), new Position(1, 2, 3))).to.equal(false)
    })

    // test get move history
    it("test get move history", () => {
        const g = new Game(1);
        g.move(new Position(1, 2, 2), new Position(1, 2, 3))
        expect(g.getMoveHistory().length).to.equal(2)
        // let history = g.getMoveHistory();
        // for (let i = 0; i < history.length; i++) {
        //     //console.log(history[i].getPostionString());
        // }
    })
    it("king no moves at start", () => {
        const g = new Game(1);
        expect((g.getPossibleMovesForPieceAtSpace(new Position(3, 1, 1))).length).to.equal(0)
    })
    it("test checkmate", () => {
        const g = new Game(1);
        const kingInCheckMate = [
            new King("White", 1, 1, 1),
            new Pawn("Black", 1, 3, 1),
            new Pawn("Black", 2, 3, 1),
            new Pawn("Black", 3, 3, 1),
            new Pawn("Black", 1, 3, 2),
            new Pawn("Black", 2, 2, 2),
            new Pawn("Black", 3, 2, 2),
            new Queen("Black", 1, 1, 3),
            new Queen("Black", 2, 1, 3),
            new Queen("Black", 3, 1, 3),
            new Queen("Black", 4, 1, 3),
            new Queen("Black", 5, 1, 3),
            new Queen("Black", 4, 2, 1),
            new Queen("Black", 4, 2, 2),
            new King("Black", 4, 1, 1),
            new Queen("Black", 4, 1, 2)
        ]
        g.setPieces(kingInCheckMate);
        // g.printBoardStateToConsole();
        expect(g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1)).length).to.equal(0)
        expect(g.getCheckMate()).to.equal(true);
    })

     it("test stalemate", () => {
        const g = new Game(1);
        const kingInCheckMate = [
            new King("Black", 1, 1, 1),
            new Queen("White", 4, 2, 2),
            new King("White", 5, 5, 5),
        ]
        g.setPieces(kingInCheckMate);
        // g.printBoardStateToConsole();
        expect(g.getStaleMate()).to.equal(false);
        expect(g.getCheckMate()).to.equal(false);
        expect(g.move(new Position(4, 2, 2), new Position(4, 1, 1))).to.equal(true)
        expect(g.getCheck()).to.equal(true);
        expect(g.getStaleMate()).to.equal(false);
        expect(g.getCheckMate()).to.equal(false);
    })
    it("test checkmate", () => {
        const g = new Game(1);
        const kingInCheckMate = [
            new King("White", 1, 1, 1),
            new Pawn("Black", 1, 3, 1),
            new Pawn("Black", 2, 3, 1),
            new Pawn("Black", 3, 3, 1),
            new Pawn("Black", 1, 3, 2),
            new Pawn("Black", 2, 2, 2),
            new Pawn("Black", 3, 2, 2),
            new Queen("Black", 4, 2, 1),
            new Queen("Black", 4, 2, 2),
            new King("Black", 3, 1, 1),
            new Queen("Black", 4, 1, 2)
        ]
        g.setPieces(kingInCheckMate);
        // g.printBoardStateToConsole();
        expect(g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1)).length).to.equal(0)
        expect(g.getStaleMate()).to.equal(true);
    })

    // test king taking piece and moving into check
    it("test king taking piece and moving into check", () => {
        const g = new Game(1);
        const testCorneredKing = [
            new King("White", 1, 1, 1),
            new Pawn("Black", 2, 2, 2),
            new Queen("Black", 3, 2, 2),
            new King("Black", 4, 1, 1),
        ]
        g.setPieces(testCorneredKing);
        // g.printBoardStateToConsole();
        expect(g.move(new Position(1, 1, 1), new Position(2, 2, 2))).to.equal(false);
    })

    // test queening
    it("test queening", () => {
        const g = new Game(1);
        let pieces = [new Pawn("White", 3, 4, 4)]
        g.setPieces(pieces)
        expect(g.move(new Position(3, 4, 4), new Position(3, 5, 4))).to.equal(true);
        pieces = g.getPieces();
        expect(pieces.length).to.equal(1);
        expect(pieces[0] instanceof Queen).to.equal(true);
    })


    // /***** test piece movement *****/
    it("pawn possible moves", () => {
        let g = new Game(1);
        // g.printBoardStateToConsole();
        // console.log(g.getPossibleMovesForPieceAtSpace(new Position(1, 2, 2)))
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 2, 2))).length).to.equal(2)
        g = new Game(1);
        expect(g.move(new Position(1, 2, 2), new Position(1, 2, 3))).to.equal(true)
    })
    it("test knight possible moves", () => {
        let g = new Game(1);
        let pieces = [new Knight(WHITE, 1, 1, 1), new Pawn(WHITE, 2, 1, 1), new Pawn(WHITE, 2, 2, 2)];
        g.setPieces(pieces);
        expect(g.move(new Position(1, 1, 1), new Position(2, 3, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(1, 3, 2))).to.equal(true);
        g = new Game(1);
        pieces = [new Knight("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(6)
        g = new Game(1);
        pieces = [new Knight("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(6)
    })
    it("test bishop possible moves", () => {
        let g = new Game(1);
        let pieces = [new Bishop(WHITE, 1, 1, 1)]
        g.setPieces(pieces)
        expect(g.move(new Position(1, 1, 1), new Position(1, 1, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(1, 2, 2))).to.equal(true);
        g = new Game(1);
        pieces = [new Bishop("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(12)
        g = new Game(1);
        pieces = [new Bishop("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(12)
    })
    it("test unicorn possible moves", () => {
        let g = new Game(1);
        let pieces = [new Unicorn(WHITE, 1, 1, 1)]
        g.setPieces(pieces)
        expect(g.move(new Position(1, 1, 1), new Position(1, 1, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(2, 2, 2))).to.equal(true);
        g = new Game(1);
        pieces = [new Unicorn("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(4)
        g = new Game(1);
        pieces = [new Unicorn("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(4)
    })
    it("test rook movement", () => {
        let g = new Game(1);
        let pieces = [new Rook(WHITE, 1, 1, 1)]
        g.setPieces(pieces)
        expect(g.move(new Position(1, 1, 1), new Position(1, 2, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(1, 1, 4))).to.equal(true);
        g = new Game(1);
        pieces = [new Rook("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(12)
        g = new Game(1);
        pieces = [new Rook("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(12)
    })
    it("test queen movement", () => {
        let g = new Game(1);
        let pieces = [new Queen(WHITE, 1, 1, 1)]
        g.setPieces(pieces)
        expect(g.move(new Position(1, 1, 1), new Position(1, 3, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(1, 1, 4))).to.equal(true);
        g = new Game(1);
        pieces = [new Queen("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(28)
        g = new Game(1);
        pieces = [new Queen("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(28)
    })
    it("test king movement", () => {
        let g = new Game(1);
        let pieces = [new King(WHITE, 1, 1, 1)]
        g.setPieces(pieces)
        expect(g.move(new Position(1, 1, 1), new Position(1, 3, 2))).to.equal(false);
        expect(g.move(new Position(1, 1, 1), new Position(1, 1, 2))).to.equal(true);
        g = new Game(1);
        pieces = [new King("White", 1, 1, 1)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(1, 1, 1))).length).to.equal(7)
        g = new Game(1);
        pieces = [new King("White", 5, 5, 5)]
        g.setPieces(pieces)
        expect((g.getPossibleMovesForPieceAtSpace(new Position(5, 5, 5))).length).to.equal(7)
    })
    it("test get position from string", () => {
        const g = new Game(1);
        expect(g.isValidSpaceFromString("sfa")).to.equal(false);
        expect(g.isValidSpaceFromString("492")).to.equal(false);
        expect(g.isValidSpaceFromString("831")).to.equal(false);
        expect(g.isValidSpaceFromString("230")).to.equal(false);
        expect(g.isValidSpaceFromString("111")).to.equal(true);
    })
});



// describe.skip("failure tests", () => {
//     // this will fail
//     it("will fail", () => {
//         expect(true).to.equal(false)
//     })
// })