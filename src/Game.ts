// game contains a board (with pieces)
// game writes to JSON file for history of moves

export class Game {

    moves: number = 0;
    board: Board = new Board();

    // TODO play, etc

    // TODO check whose turn it is

    // Create a new game
    newGame() {
        this.board = new Board();
    }

    // TODO
    move(a: string, b: string): boolean {
        return true;
    }

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

