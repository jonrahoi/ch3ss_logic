// game contains a board (with pieces)
import Board from "./Board"
import { Piece, Position } from "./Piece"
import { getBoardStateStringArraySliceByZ } from "./DisplayBoard2D"
import { RAUMSCHACH, RA_SIZE_BOARD_X, RA_SIZE_BOARD_Y, RA_SIZE_BOARD_Z, RA_BOARD_MIN, WHITE, BLACK } from "./constants"

/**
 * Class to be instantiated by user interface for two player game of 3D chess
 */
export class Game {
    private moveHistory: Position[];
    private board: Board; // every game has a board which has pieces and determines if pieces can move to other parts of the board
    private moveCount: number; // how many moves have been executed, same as moveHistory.length/2
    private minNumberOfPiecesBeforeDraw: number; // less than 5 pieces causes draw
    private numberPlayers: number; // set to whatever the right number is for the rule set
    private boardStateMoveCount: number; // pieces are in position after this many moves (can recreate board after differnet numbers of moves)
    private gameID: number = 0; // unique id for game
    /**
     * constructor for class
     * @param gameID unique game ID
     */
    constructor(id: number) {
        this.gameID = id;
        this.board = new Board(RAUMSCHACH);
        this.moveHistory = []; // move history arrray of positions
        this.moveCount = 0; // how many moves have been executed
        this.numberPlayers = 2; // Raumscach is 2 player
        this.minNumberOfPiecesBeforeDraw = 5; // a guess at what the minimum is
        this.boardStateMoveCount = 0;
    }
    /**
     * Sets pieces for board, used for testing
     * @param pieces array of Piece objects
     */
    public setPieces(pieces: Piece[]) {
       this.board.setPieces(pieces);
    }
    /**
     * Returns an array of strings where each line is a row
     */
    public getBoardStateStringArray(): String[] {
        return getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(),
            this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
    }
    /**
     * Prints board state to console
     */
    public printBoardStateToConsole() {
        const arr = getBoardStateStringArraySliceByZ(this.board.getCopyOfPieces(), this.board.getSizeOfBoardX(),
            this.board.getSizeOfBoardY(), this.board.getSizeOfBoardZ(), this.board.getBoardCoordinateMinimum());
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
    }
    /**
     * Returns a string for whose turn it is
     */
    public getWhoseTurnItIs(): string {
        if (this.moveCount % this.numberPlayers == 0) {
            return WHITE;
        }
        return BLACK;
    }
    /**
     * Checks if the king is in check based on whose turn it is.
     * Game.ts keeps track of incrementing the movecount
     * In game.ts move method uses this method to make sure that a player doesn't move into check
     * Once game.ts determines that a player didn't move into check, it increments the move count and
     * then checks if the move created a check for the other player using this method
     */
    public getCheck(): boolean {
        const playerMoving = this.getWhoseTurnItIs();
        return this.board.kingInCheck(playerMoving);
    }
    /**
     * Determines if checkmate occurs by seeing if the player is in check and there are no legal moves
     * this.getPossibleMovesForPieceAtSpace does not return moves that don't interfere with a check or checkmate
     */
    public getCheckMate(): boolean {
        if (!this.getCheck()) {
            return false;
        }
        const pieces = this.board.getCopyOfPieces();
        for (let i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Determines if there is a stalemate, the player's king isn't in check but the player's pieces have no legal moves
     */
    public getStaleMate(): boolean {
        if (this.insufficientMaterial()) {
            return true;
        }
        if (this.getCheck()) {
            return false;
        }
        const pieces = this.board.getCopyOfPieces();
        for (let i = 0; i < pieces.length; i++) {
            if (this.getPossibleMovesForPieceAtSpace(pieces[i].getPosition()).length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * checks if there aren't enough pieces to create a check and thus it is a stalemate
     * this is just a baseline and needs research for what is the minimum material needed for checkmate
     */
    private insufficientMaterial(): boolean {
        if (this.board.getCopyOfPieces().length < this.minNumberOfPiecesBeforeDraw) {
            return true;
        }
        return false;
    }
    /**
     * Returns the move history array, first player space a index 0, first player space b index 1,
     * second player space a index 2, second player space a index 3
     * use index % 0, % 1, % 2, % 3, to find the spaces for each player's movement
     */
    public getMoveHistory(): Position[] {
        const moves: Position[] = [];
        for (let i = 0; i < this.moveHistory.length; i++) {
            moves.push(this.moveHistory[i]);
        }
        return moves;
    }
    public getGameID() {
        return this.gameID;
    }
    public getPieces(): Piece[] {
        return this.board.getCopyOfPieces();
    }
    public getMoveCount(): number {
        return this.moveCount;
    }
    public move(a: Position, b: Position): boolean {

        if (this.boardStateMoveCount < this.moveCount) {
            this.setBoardToAfterAllMoves();
        }
        if (!this.validSpace(a) || !this.validSpace(b)) { return false; }
        // console.log("inside Game.move, both valid spaces");
        const copyOfBoardState: Piece[] = this.board.getCopyOfPieces();

        const playerMoving = this.getWhoseTurnItIs();
        if (!this.board.executeMove(playerMoving, a, b)) {
            // console.log("inside Game.move, board execute move return false");
            return false;
        }
        if (this.board.kingInCheck(playerMoving)) {
            this.board.setPieces(copyOfBoardState);
            // console.log("move not executed, king still in check")
            return false;
        }
        // console.log("game.move: successfully moved piece from: " + a.getPostionString() + " to " + b.getPostionString())
        this.moveCount++;
        this.boardStateMoveCount = this.moveCount;
        this.moveHistory.push(a);
        this.moveHistory.push(b);
        return true;
    }
    /**
     * Gets all possible moves for a piece given the current state of the game.
     * This method accounts for whose turn it is as well as if a player's king is in check
     * @param a
     */
    public getPossibleMovesForPieceAtSpace(a: Position): Position[] {
        const possibleMoves: Position[] = [];
        // console.log("getting possible moves for piece at: " + a.getPostionString());
        if (!this.board.pieceLocatedAtBool(a)) {
            // console.log("inside game.possibleMoves, no piece located there")
            return possibleMoves;
        }
        const copyOfBoardState: Piece[] = this.board.getCopyOfPieces();
        const playerMoving = this.getWhoseTurnItIs();
        for (let x = 1; x <= this.board.getSizeOfBoardX(); x++) {
            for (let y = 1; y <= this.board.getSizeOfBoardY(); y++) {
                for (let z = 1; z <= this.board.getSizeOfBoardZ(); z++) {
                    // create a position with the three iterators
                    const b: Position = new Position(x, y, z);
                    this.board.setPieces(this.getCopyOfPieces(copyOfBoardState));
                    // if (this.board.executeMove(playerMoving, a, b) && !this.board.kingInCheck(playerMoving)) {
                    //     possibleMoves.push(b);
                    // }
                    if (!this.board.executeMove(playerMoving, a, b)) {
                        // console.log("inside game.getPossibleMoves, piece could not move to: " + b.getPostionString())
                        continue;
                    }
                    if (!this.board.kingInCheck(playerMoving)) {
                        // console.log("inside game.getPossibleMoves, piece could not move to: " + b.getPostionString() + " because king in check")
                        possibleMoves.push(b);
                    }
                    this.board.setPieces(copyOfBoardState);
                }
            }
        }
        this.board.setPieces(copyOfBoardState);
        return possibleMoves;
    }
    /**
     * Returns a copy of the pieces on the board
     * @param pieces
     */
    private getCopyOfPieces(pieces: Piece[]): Piece[] {
        const copy: Piece[] = [];
        for (let i = 0; i < pieces.length; i++) {
            copy.push(pieces[i].makeCopy());
        }
        return copy;
    }
    /**
     * Determines if game is a draw based on stalemate
     */
    public gameIsDrawn(): boolean {
        return this.getStaleMate();
    }
    /**
     * Creates a position from a VALID string
     * @param a
     */
    public getPositionFromString(a: string): Position {
        if (this.isValidSpaceFromString(a)) {
            return new Position(+a.charAt(0), +a.charAt(1), +a.charAt(2));
        }
    }
    /**
     * Determines if a position is on the board
     * @param a
     */
    public validSpace(a: Position): boolean {
        return this.board.spaceOnBoard(a);
    }
    /**
     * Returns boolean for if a string can be converted to a valid space
     * @param inputString
     */
    public isValidSpaceFromString(inputString: string): boolean {
        if (inputString.length != 3) {
            return false
        }
        if (inputString.charAt(0) < RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(0) > RA_SIZE_BOARD_X.toLocaleString().charAt(0)) {
            return false;
        }
        if (inputString.charAt(1) < RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(1) > RA_SIZE_BOARD_Y.toLocaleString().charAt(0)) {
            return false;
        }
        if (inputString.charAt(2) < RA_BOARD_MIN.toLocaleString().charAt(0) || inputString.charAt(2) > RA_SIZE_BOARD_Z.toLocaleString().charAt(0)) {
            return false;
        }
        return true;
    }
    /**
     * Returns a copy of an array of piece ojects that represent the pieces taken off the board
     */
    public getPiecesTaken(): Piece[] {
        return this.board.getCopyOfPiecesTaken();
    }
    /**
     * Loads a game saved in JSON file
     */
    public loadGameFromFile(fileName: string) {
        // go through moves array and move the board each space
        // const readlineSync = require("readline-sync");
        // const homie = JSON.parse(fs.readFileSync("./game1.json").toString())
        const fs = require("fs");
        const rawData = fs.readFileSync(fileName);
        const moves: string[] = JSON.parse(rawData);
        this.moveHistory = [];
        for (let i = 0; i < moves.length; i++) {
            this.moveHistory.push(this.getPositionFromString(moves[i]));
        }
        this.moveCount = 0; // two spaces per move, not a magic number
        this.setBoardToAfterAllMoves();
    }
    /**
     * Sets board state to be after all moves
     */
    public setBoardToAfterAllMoves() {
        this.board.resetPiecesToStartingPositions();
        this.moveCount = 0;
        for (let i = 0; i < this.moveHistory.length; i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
            this.moveCount++;
        }
        this.boardStateMoveCount = this.moveCount;
    }
    /**
     * Saves game to JSON file
     */
    public saveGameToFile(fileName: string) {
        const fs = require("fs");
        // create an array of strings for each move
        const moveStrings: string[] = [];
        for (let i = 0; i < this.moveHistory.length; i++) {
            moveStrings.push(this.moveHistory[i].getPostionString());
        }
        fs.writeFileSync(fileName, JSON.stringify(moveStrings))
    }
    /**
     * takes back the last move
     */
    public takeBackLastMove() {
        // JSON.stringify(this.moveHistory);
        // this.moveHistory = JSON.parse("moveHistory");
        if (this.moveCount == 0) {
            return;
        }
        this.moveHistory.pop();
        this.moveHistory.pop();
        this.setBoardToAfterAllMoves();
    }
    /**
     * Method to move the board state back one move but does not delete the move from the move history
     */
    public setBoardStateBackOneMoveButNotATakeback() {
        if (this.moveCount == 0) {
            return;
        }
        this.board.resetPiecesToStartingPositions();
        const displayMoves = this.boardStateMoveCount - this.numberPlayers;
        for (let i = 0; i < this.moveHistory.length - (this.numberPlayers * displayMoves); i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
        }
        this.boardStateMoveCount--;
    }
    /**
     * Changes the board state to be one move ahead if possible
     */
    public displayForwardOneMove() {
        if (this.boardStateMoveCount == this.moveCount) {
            return; // game already caught up
        }
        this.board.resetPiecesToStartingPositions();
        const displayMoves = this.boardStateMoveCount + this.numberPlayers;
        for (let i = 0; i < this.moveHistory.length - (this.numberPlayers * displayMoves); i += this.numberPlayers) {
            this.move(this.moveHistory[i], this.moveHistory[i + 1]);
        }
        this.boardStateMoveCount++;
    }
}