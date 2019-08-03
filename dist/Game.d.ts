import { Piece, Position } from "./Piece";
export declare class Game {
    private moveHistory;
    private board;
    private gameID;
    private moveCount;
    private minNumberOfPiecesBeforeDraw;
    private white;
    private black;
    constructor(gameID: number);
    setPieces(pieces: Piece[]): void;
    getBoardStateStringArray(): String[];
    printBoardStateToConsole(): void;
    getWhoseTurnItIs(): string;
    getCheck(): boolean;
    getCheckMate(): boolean;
    getStaleMate(): boolean;
    getInsufficientMaterial(): boolean;
    getMoveHistory(): Position[];
    getPieces(): Piece[];
    getMoveCount(): number;
    move(a: Position, b: Position): boolean;
    getPossibleMovesForPieceAtSpace(a: Position): Position[];
    pieceAtPositionCanMove(a: Position): boolean;
    private getCopyOfPieces;
    gameIsDrawn(): boolean;
    getPositionFromString(a: string): Position;
    getPiecesTaken(): Piece[];
    loadGame(): void;
    saveGame(): void;
    goBackOneMove(): void;
    goForwardOneMove(): void;
    validSpace(a: Position): boolean;
    isValidSpaceFromString(str: string): boolean;
}
