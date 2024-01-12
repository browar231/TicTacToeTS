import { Player } from './Players.js'
import { Board } from './Board.js'
import { TurnManager } from './TurnManager.js';
export class Game {
    private board: Board = new Board;
    private turns: TurnManager;
    private player1;
    private player2;
    constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
        this.turns = new TurnManager([this.player1, this.player2]);
    }
    clone() {
        const clonedGame = new Game(this.player1, this.player2);
        clonedGame.board = this.board.clone();
        clonedGame.turns = this.turns.clone();
        return clonedGame;
    }
    move(player: Player, field: number) {
        if (!this.board.takeField(field, player)) {
            return;
        }
        if (this.isWon()) {
            return;
        }
        this.turns.switchToNextPlayer();
        return this.returnCurrentPlayer();
    }
    returnCurrentPlayer(): Player {
        return this.turns.returnCurrentPlayer();
    }
    returnBoard() {
        return this.board;
    }
    isInProgress() {
        if (this.isWon()) {
            return false;
        }
        if (this.board.isBoardFull()) {
            return false;
        }
        return true;
    }
    isWon() {
        return this.checkCols() || this.checkRows() || this.checkDiags();
    }
    private checkCols() {
        const fields = this.board.returnFields();
        if (fields[0] !== null && fields[0] === fields[3] && fields[3] === fields[6]) {
            return true;
        }
        if (fields[1] !== null && fields[1] === fields[4] && fields[4] === fields[7]) {
            return true;
        }
        if (fields[2] !== null && fields[2] === fields[5] && fields[5] === fields[8]) {
            return true;
        }
        return false;
    }
    private checkRows() {
        const fields = this.board.returnFields();
        if (fields[0] !== null && fields[0] === fields[1] && fields[1] === fields[2]) {
            return true;
        }
        if (fields[3] !== null && fields[3] === fields[4] && fields[4] === fields[5]) {
            return true;
        }
        if (fields[6] !== null && fields[6] === fields[7] && fields[7] === fields[8]) {
            return true;
        }
        return false;
    }
    private checkDiags() {
        const fields = this.board.returnFields();
        if (fields[0] !== null && fields[0] === fields[4] && fields[4] === fields[8]) {
            return true;
        }
        if (fields[2] !== null && fields[2] === fields[4] && fields[4] === fields[6]) {
            return true;
        }
        return false;
    }
}