// game contains a board (with pieces)
import Board from "./Board"
// game writes to JSON file for history of moves

export class TwoPlayerGame {
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
        // can parse strings here or in Board
        if (!this.validSpaceFromString(a) && !this.validSpaceFromString(b)) {
            return false;
        }
        let posA: Position;
        posA.setX(+a.charAt(0));
        posA.setY(+a.charAt(1));
        posA.setZ(+a.charAt(2));
        let posB: Position;
        posB.setX(+a.charAt(0));
        posB.setY(+a.charAt(1));
        posB.setZ(+a.charAt(2));
        const moveExecuted = this.board.executeMove(posA, posB);
        if (moveExecuted) {
            this.board.incrementMoveCount;
            this.moves++;
        }
        return moveExecuted;
    }

    playerInCheck(): boolean {
        return this.board.isKingInCheckNow();
    }

    playerCheckmated(): boolean {
        return this.board.isKingCheckMated();
    }

    getWhoseTurnItIs(): string {
        if (this.moves % 2 == 0) {
            return "White";
        }
        return "Black";
    }

    getPossibleMovesForPieceAtSpace(a: string): string[] {
        let possibleMoves: string[];
        if (!this.validSpaceFromString(a)) {
            return possibleMoves;
        }
        let posA: Position;
        posA.setX(+a.charAt(0));
        posA.setY(+a.charAt(1));
        posA.setZ(+a.charAt(2));
        if (!this.board.pieceLocatedAt(posA)) {
            return possibleMoves;
        }
        possibleMoves = this.board.getAllPossibleMoves(posA);
        return possibleMoves;
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

    // validates proper space
    validSpaceFromString(str: string): boolean {
        if (str.length != 3) {
            return false
        }
        for (let i = 0; i < 3; i++) {
            if (str.charAt(i) < "1" || str.charAt(i) > "5") {
                return false;
            }
        }
        return true;
    }
}
