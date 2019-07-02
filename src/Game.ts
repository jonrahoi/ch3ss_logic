// game contains a board (with pieces)
// game writes to JSON file for history of moves

class Game {

    moves = 0;
    board = new Board();

    //TODO play, etc

    // TODO check whose turn it is

    // Create a new game
    newGame() {
        this.board = new Board();
    }

    // TODO
    move(spaceA: string, spaceB: string): boolean {
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

