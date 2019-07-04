import Board from "./Board";
export declare class Game {
    moves: number;
    board: Board;
    newGame(): void;
    move(a: string, b: string): boolean;
    loadGame(arrayFromMoves: [], arrayToMoves: []): void;
    saveGame(): void;
    goBackOneMove(): void;
    goForwardOneMove(): void;
}
