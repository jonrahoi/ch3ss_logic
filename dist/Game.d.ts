import { Piece, Position } from "./Piece";
export declare class Game {
    private moveHistory;
    private board;
    private moveCount;
    private minNumberOfPiecesBeforeDraw;
    private numberPlayers;
    private boardStateMoveCount;
    private gameID;
    constructor(id: number);
    setPieces(pieces: Piece[]): void;
    getBoardStateStringArray(): String[];
    printBoardStateToConsole(): void;
    getWhoseTurnItIs(): string;
    getCheck(): boolean;
    getCheckMate(): boolean;
    getStaleMate(): boolean;
    private insufficientMaterial;
    getMoveHistory(): Position[];
    getGameID(): number;
    getPieces(): Piece[];
    getMoveCount(): number;
    move(a: Position, b: Position): boolean;
    getPossibleMovesForPieceAtSpace(a: Position): Position[];
    private getCopyOfPieces;
    gameIsDrawn(): boolean;
    getPositionFromString(a: string): Position;
    validSpace(a: Position): boolean;
    isValidSpaceFromString(inputString: string): boolean;
    getPiecesTaken(): Piece[];
    loadGameFromFile(): void;
    setBoardToAfterAllMoves(): void;
    saveGameToFile(): void;
    takeBackLastMove(): void;
    setBoardStateBackOneMoveButNotATakeback(): void;
    displayForwardOneMove(): void;
}
