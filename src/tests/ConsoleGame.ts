import { Game } from "../Game"
import { Piece, Position, Color } from "../Piece"

let game = new Game();

// let blackPieces = game.getBlackPieces();
// let whitePieces = game.getWhitePieces();

// displayPieces("black pieces: ", blackPieces);
// displayPieces("white pieces: ", blackPieces);
let quit = false;
while (quit == false) {
    dispalyBoardState(game.getWhitePieces(), game.getBlackPieces(), "board state:");
    quit = true;
}


function displayPieces(message: string, pieces: Piece[]) {
    for (let i = 0; i < pieces.length; i++) {
        console.log(game.getBlackPieces());
    }
}

function dispalyBoardState( hitePieces: Piece[], blackPieces: Piece[], message: string) {
    console.log("here is the board presently:");
    
    var boardArray = new Array();
    boardArray[0] = new Array();
    boardArray[0][0] = new Array();
    console.log(boardArray[0][0][0]);
}


function movePieces(message: string) {
    game.move
}


// validates proper space
function validSpaceFromString(str: string): boolean {
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




