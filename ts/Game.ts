import { Player } from './Players.js'
import { Board } from './Board.js'
export class Game {
    private players: Player[];
    private board: Board = new Board;
    private currentPlayerIndex: number = 0;
    constructor(player1: Player, player2: Player) {
        this.players = [player1, player2];
    }
    async move(player: Player, field: number) {
        if (!this.board.takeField(field, player)) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        this.switchToNextPlayer();
        return this.returnCurrentPlayer();
    }
    returnCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }
    returnBoard() {
        return this.board;
    }
    private switchToNextPlayer() {
        this.currentPlayerIndex += 1;
        this.currentPlayerIndex %= 2;
    }
    isGameWon() {
        return this.board.isGameWon();
    }
}