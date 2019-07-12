import Board from "./Board";
import { Position } from "./Piece";
export declare class Game {
    moveCount: number;
    moveHistory: string[];
    board: Board;
    newGame(): void;
    getPositionOfWhitePiecesArray(): string[];
    getPositionOfBlackPiecesArray(): string[];
    move(a: string, b: string): boolean;
    gameIsDrawn(): boolean;
    getPositionFromString(a: string): Position;
    getWhitePieceLocations(): string[];
    getBlackPieceLocations(): string[];
    playerInCheck(): boolean;
    playerCheckmated(): boolean;
    getWhoseTurnItIs(): string;
    getPossibleMovesForPieceAtSpace(a: string): string[];
    getWhitePiecesTaken(): string[];
    getBlackPiecesTaken(): string[];
    loadGame(): void;
    saveGame(): void;
    goBackOneMove(): void;
    goForwardOneMove(): void;
    validSpaceFromString(str: string): boolean;
}
