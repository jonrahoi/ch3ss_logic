// game contains a board (with pieces)
import Board from "./Board"
// game writes to JSON file for history of moves

export class Game {
    // id?
    // name?
    moves: number = 0;
    board: Board = new Board();

    // TODO play, etc

    // TODO check whose turn it is

    // is player now in check?
        // if in check are they checkmated?
    // is there a draw? (player can't move)

    // Create a new game
    newGame() {
        this.board = new Board();
    }

    // TODO
    move(a: string, b: string): boolean {
        // TODO parse strings here or in Board
        let posA: Position;
        let posB: Position;
        const moveExecuted = this.board.executeMove(posA, posB);
        if (moveExecuted == true) {
            this.moves++;
        }
        return moveExecuted;
    }

    // playerInCheck(): boolean {
    //     return this.board.isKingInCheckNow();
    // }

    // playerCheckmated(): boolean {
    //     return this.board.isKingCheckMated();
    // }

    // TODO
    loadGame(arrayFromMoves: [], arrayToMoves: []) {
        // go through array and move the board each space
    }

    saveGame() {
    }

    goBackOneMove() {
    }

    goForwardOneMove() {
    }
}

