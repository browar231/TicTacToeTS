import { Player } from './Players.js'
import { Board } from './Board.js'
import { TurnManager } from './TurnManager.js';
export class Game {
    private board: Board = new Board;
    private turns: TurnManager;
    constructor(player1: Player, player2: Player) {
        this.turns = new TurnManager([player1, player2]);
    }
    move(player: Player, field: number) {
        if (!this.board.takeField(field, player)) {
            return;
        }
        if (this.isGameWon()) {
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
    isGameWon() {
        return this.board.isGameWon();
    }
}