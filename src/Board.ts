import { Knight } from "./Knight"
import { King } from "./King"
import { Bishop } from "./Bishop"
import { Rook } from "./Rook"
import { Unicorn } from "./Unicorn"
import { Pawn } from "./Pawn"
import { Queen } from "./Queen"
import { Piece, Position, Color } from "./Piece"

// game contains a board (with pieces)
// game contains history of moves

export default class Board {

    private pieces = Board.setupBoard()
    private moves = 0;
    private piecesTaken: Piece[] = [];

    private static setupBoard() {

        return [
            // Level E Black
            // King Ec5; Rook Ea5, Ee5; Knight Eb5, Ed5; Pawn Ea4, Eb4, Ec4; Ed4; Ee4
            new King("Black", 3, 5, 5),
            new Rook("Black", 1, 5, 5),
            new Rook("Black", 5, 5, 5),
            new Knight("Black", 2, 5, 5),
            new Knight("Black", 4, 5, 5),
            new Pawn("Black", 1, 4, 5),
            new Pawn("Black", 2, 4, 5),
            new Pawn("Black", 3, 4, 5),
            new Pawn("Black", 4, 4, 5),
            new Pawn("Black", 5, 4, 5),

            // Level D Black
            // Queen Dc5; Bishop Da5, Dd5; Unicorn Db5, De5; Pawn Da4, Db4, Dc4; Dd4; De4
            new Queen("Black", 3, 5, 4),
            new Bishop("Black", 1, 5, 4),
            new Bishop("Black", 4, 5, 4),
            new Unicorn("Black", 2, 5, 4),
            new Unicorn("Black", 5, 5, 4),
            new Pawn("Black", 1, 4, 4),
            new Pawn("Black", 2, 4, 4),
            new Pawn("Black", 3, 4, 4),
            new Pawn("Black", 4, 4, 4),
            new Pawn("Black", 5, 4, 4),

            // // Level C Empty at beginning

            // // Level B White
            // // Queen Bc1; Bishop Ba1, Bd1; Unicorn Bb1, Be1; Pawn Ba2, Bb2, Bc2; Bd2; Be2
            new Queen("White", 3, 1, 2),
            new Bishop("White", 1, 1, 2),
            new Bishop("White", 4, 1, 2),
            new Unicorn("White", 2, 1, 2),
            new Unicorn("White", 5, 1, 2),
            new Pawn("White", 1, 2, 2),
            new Pawn("White", 2, 2, 2),
            new Pawn("White", 3, 2, 2),
            new Pawn("White", 4, 2, 2),
            new Pawn("White", 5, 2, 2),

            // // Level A White
            // // King Ac1; Rook Aa1, Ae1; Knight Ab1, Ad1; Pawn Aa2, Ab2, Ac2; Ad2; Ae2
            new King("White", 3, 1, 1),
            new Rook("White", 1, 1, 1),
            new Rook("White", 5, 1, 1),
            new Knight("White", 2, 1, 1),
            new Knight("White", 4, 1, 1),
            new Pawn("White", 1, 2, 1),
            new Pawn("White", 2, 2, 1),
            new Pawn("White", 3, 2, 1),
            new Pawn("White", 4, 2, 1),
            new Pawn("White", 5, 2, 1),
        ]
    }

    executeMove(a: Position, b: Position): boolean {
        // are A and B on the Board?
        // currently checked in TwoPlayerGame space entry validation
        // if (!this.spaceOnBoard(a) || !this.spaceOnBoard(b)) {
        //     return false;
        // }
        // get piece at position a
        console.log("inside board.executeMove");
        let movePiece;
        let pieceFound = false;
        for (let i = 0; i < this.pieces.length && !pieceFound; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                pieceFound = true;
                movePiece = this.pieces[i];
            }
        }
        // no piece at posA return false
        if (!pieceFound) {
            return false;
        }
        // is it the right color for whose turn it is
        if (!this.movePieceIsRightColor(movePiece)) {
            return false;
        }
        // is move legal, can this piece move to that square? (including all movement rules i.e. shape, jumping, etc)
        if (!this.moveIsLegal(movePiece, b)) {
            return false;
        }
        console.log("inside board.executeMove, right color, move legal")
        const whoseTurn = movePiece.getColor();
        // // get current location of king
        // const whoseTurnKingPosition = this.getLocationOfKingGivenColor(whoseTurn);
        // console.log("current team's king position: " + whoseTurnKingPosition.getPostionString());
        // is the King in check?, if your king is in check then you have to move the king
        // if (this.playersKingInCheckAtSpace(whoseTurn, whoseTurnKingPosition) && this.getLocationOfKingGivenColor(whoseTurn) != a) {
        //     return false;
        // }

        // Queening of pawn
        if (movePiece instanceof Pawn) {
            if (movePiece.isWhite() && movePiece.getPosition().getY() == 5 && movePiece.getPosition().getZ() >= 4) {
                this.deletePieceAtPosition(a);
                const newQueen = new Queen(whoseTurn, a.getX(), a.getY(), a.getZ());
                this.pieces.push(newQueen);
            }
            else if (!movePiece.isWhite() && movePiece.getPosition().getY() == 1 && movePiece.getPosition().getZ() <= 2) {
                this.deletePieceAtPosition(a);
                const newQueen = new Queen(whoseTurn, a.getX(), a.getY(), a.getZ());
                this.pieces.push(newQueen);
            }
        }
        // is King moving into check?
        if (movePiece instanceof King && this.playersKingInCheckAtSpace(whoseTurn, b)) {
            console.log("inside board.execute players king in check returning move not executed")
            return false;
        }
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
            console.log("inside board.executeMove deleting piece at " + b.getPostionString());
        }
        // // move piece
        movePiece.moveTo(b);
        return true; // move executed successfully

        // castling, en passant not available in RUAMSCHACH
    }

    // TODO debug
    moveIsLegal(movePiece: Piece, b: Position): boolean {
        // check if piece at b and if same color

        // console.log("1: checking for piece located at: " + movePiece.getPostionString());
        // console.log("2: checking for move to: " + b.getPostionString());
        // console.log("piece located at b: " + this.pieceLocatedAtBool(b));
        // if (this.pieceLocatedAtBool(b)) {
        //     console.log("piece same color: " + this.getPieceLocatedAt(b).sameColor(movePiece));
        // }
        if (this.pieceLocatedAtBool(b) && this.getPieceLocatedAt(b).sameColor(movePiece)) {
            return false;
        }
        // check if move shape correct
        if (!movePiece.canMoveTo(b)) {
            return false;
        }
        // if a knight no need to check if pawn or piece in way
        if (movePiece instanceof Knight) {
            return true;
        }
        // if pawn moving in right direction
        if (movePiece instanceof Pawn) {
            if (!this.pawnMoveDirectionCorrect(movePiece.getColor(), movePiece.getPosition(), b)) {
                return false;
            }
            // if pawn and moving right direction and correct shape no need to check piece in way (only one space)
            return true
        }
        // console.log("2:    inside moveIsLegal in board.ts: checking for piece located at: " + movePiece.getPostionString());
        if (this.pieceInWay(movePiece.getPosition(), b)) {
            return false;
        }
        return true;
    }

    executeMoveNoLegalCheck(a: Position, b: Position) {
        // TODO incorporate Queening
        // is there a piece at space B?, delete piece if there
        if (this.pieceLocatedAtBool(b)) {
            this.deletePieceAtPosition(b);
        }
        // move piece
        this.getPieceLocatedAt(a).moveTo(b);
    }

    // kingCanMove(): boolean {

    //     // get whose turn it is
    //     const whoseTurn = this.getStringWhoseTurn();
    //     // return kingCantMove
    //     if (this.getAllPossibleMoves(this.getLocationOfKingGivenColor(whoseTurn)).length == 0) {
    //         return false;
    //     }
    //     return true;
    // }


    kingInCheckFromPosition(pos: Position): boolean {
        // find opposite color
        let color: Color = "Black";
        if (!this.pieceLocatedAtBool(pos)) {
            return false;
        }
        const piece = this.getPieceLocatedAt(pos);
        if (piece.getColor().localeCompare("Black") == 0) {
            color = "White";
        }
        if (this.moveIsLegal(piece, this.getLocationOfKingGivenColor(color))) {
            return true;
        }
        return false;
    }

    gameIsDrawn(): boolean {
        const whoseTurn = this.getWhoseTurn();

        // TODO are we incrementing the move count properly?
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare(whoseTurn) == 0) {
                if (this.getAllPossibleMovesPiece(this.pieces[i]).length > 0) {
                    return false;
                }
            }
        }
        return true;
    }

    incrementMoveCount() {
        this.moves++;
    }
    movePieceIsRightColor(piece: Piece): boolean {
        if (piece.getColor().localeCompare("Black") == 0 && this.getWhoseTurn().localeCompare("Black") == 0) {
            return false;
        }
        return true;
    }
    getWhoseTurn(): string {
        let whoseTurn = "White";
        if (this.moves % 2 == 1) {
            whoseTurn = "Black";
        }
        return whoseTurn;
    }

    getPlayerOpponentColor(): string {
        let opponent = "White";
        if (this.moves % 2 == 0) {
            opponent = "Black";
        }
        return opponent;
    }

    // getWhitePieceLocations(): string[] {
    //     const locations: string[] = [];
    //     for (let i = 0; i < this.pieces.length; i++) {
    //         if (!this.pieces[i].getColor().localeCompare("White")) {
    //             locations.push(this.pieces[i].getPostionString() + this.pieces[i].getName());
    //         }
    //     }
    //     return locations;
    // }

    getWhitePieces(): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare("White") == 0) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    }

    getBlackPieces(): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].getColor().localeCompare("Black") == 0) {
                pieces.push(this.pieces[i]);
            }
        }
        return pieces;
    }

    getWhitePiecesTaken(): Piece[] {
        const piecesTakenArray: Piece[] = [];
        for (let i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].getColor().localeCompare("White") == 0)) {
                piecesTakenArray.push(this.pieces[i]);
            }
        }
        return piecesTakenArray;
    }

    getBlackPiecesTaken(): Piece[] {
        const piecesTakenArray: Piece[] = [];
        for (let i = 0; i < this.piecesTaken.length; i++) {
            if (!(this.pieces[i].getColor().localeCompare("Black") == 0)) {
                piecesTakenArray.push(this.pieces[i]);
            }
        }
        return piecesTakenArray;
    }

    pawnMoveDirectionCorrect(colorOfPawn: string, a: Position, b: Position): boolean {
        // if white needs to move up(dz is positive) or across (dy is positive)
        // if black needs to move down(dz is negative) or across (dy is positive)
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        if (colorOfPawn.localeCompare("White") == 0 && dy >= 0 && dz >= 0) {
            return true;
        }
        if (colorOfPawn.localeCompare("Black") == 0 && dy <= 0 && dz <= 0) {
            return true;
        }
        return false;
    }

    deletePieceAtPosition(b: Position) {
        let newPieces: Piece[] = [];
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(b)) {
                this.piecesTaken.push(this.pieces[i]);
            }
            else {
                newPieces.push(this.pieces[i]);
            }
        }
        this.pieces = newPieces;
    }

    playersKingInCheckAtSpace(whoseTurn: string, positionKing: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            // if opposing team, can move to where the King is, and isn't blocked
            if (!(this.pieces[i].getColor().localeCompare("whoseTurn") == 0) &&
            this.pieces[i].canMoveTo(positionKing) &&
            !this.pieceInWay(this.pieces[i].getPosition(), positionKing)) {
                return true;
            }
        }
        return false;
    }

    getLocationOfKingGivenColor(color: string): Position {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i] instanceof King && this.pieces[i].getColor().localeCompare(color) == 0) {
                return this.pieces[i].getPosition();
            }
        }
    }

    pieceLocatedAtBool(a: Position): boolean {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return true;
            }
        }
        return false;
    }

    getPieceLocatedAt(a: Position): Piece {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isAtPosition(a)) {
                return this.pieces[i];
            }
        }
    }

    spaceOnBoard(a: Position): boolean {
        if (a.getX() < 1 || a.getX() > 5) {
            return false;
        }
        if (a.getY() < 1 || a.getY() > 5) {
            return false;
        }
        if (a.getZ() < 1 || a.getZ() > 5) {
            return false;
        }
        return true;
    }
    pieceInWay(a: Position, b: Position): boolean {
        // let x = a.getX;
        // iterate through all the places between position a and position b
        const dx = this.getSlope(a.getX(), b.getX());
        const dy = this.getSlope(a.getY(), b.getY());
        const dz = this.getSlope(a.getZ(), b.getZ());
        let c = new Position(a.getX(), a.getY(), a.getZ());
        c.setX(c.getX() + dx);
        c.setY(c.getY() + dy);
        c.setZ(c.getZ() + dz);
        while (c != b && this.spaceOnBoard(c)) {
            if (this.pieceLocatedAtBool(c)) {
                return true;
            }
            c.setX(c.getX() + dx);
            c.setY(c.getY() + dy);
            c.setZ(c.getZ() + dz);
        }
        return false;
    }

    getSlope(a: number, b: number): number {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    }

    // TODO debug
    getAllPossibleMovesPiece(pieceToMove: Piece): Position[] {
        const possibleMoves: Position[] = [];
        // iterate through all spaces on board
        for (let x = 1; x < 6; x++) {
            for (let y = 1; y < 6; y++) {
                for (let z = 1; z < 6; z++) {
                    const piece = pieceToMove;
                    // create a position with the three iterators
                    // console.log("iterators: " + x + " " + y + " " + z);
                    // console.log("piece location: " + piece.getPostionString());
                    const space: Position = new Position(x, y, z);
                    const pieceToSend = piece;
                    if (this.moveIsLegal(pieceToSend, space)) {
                        possibleMoves.push(space);
                    }
                    // console.log("after testing if move legal: " + piece.getPostionString());
                }
            }
        }
        // console.log("inside board.ts after getAllPossibleMovesPiece, position: " + pieceToMove.getPostionString());
        return possibleMoves;
    }

    getAllPossibleMovesPosition(a: Position): Position[] {
        const possibleMoves: Position[] = [];
        if (!this.pieceLocatedAtBool(a)) {
            return possibleMoves;
        }
        const movePiece = this.getPieceLocatedAt(a);
        // iterate through all spaces on board
        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                for (let k = 1; k < 6; k++) {
                    // create a position with the three iterators
                    const space: Position = new Position(i, j, k);
                    if (this.moveIsLegal(movePiece, space)) {
                        possibleMoves.push(space);
                    }
                }
            }
        }
        return possibleMoves;
    }

    playerCheckmated(a: Position): boolean {
        // get location of king
        const kingColor = this.getPieceLocatedAt(a).getOppositeColor();
        const locationKing = this.getLocationOfKingGivenColor(kingColor);
        if (this.getAllPossibleMovesPosition(locationKing).length < 1) {
            return true;
        }
        return false;
    }
}