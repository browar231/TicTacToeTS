import { Player } from './Players.js'
import { Board } from './Board.js'
export class Game {
    private players: Player[];
    private board: Board = new Board;
    private currentPlayerIndex: number = 0;
    constructor(player1: Player, player2: Player) {
        this.players = [player1, player2];

    }
    async play() {
        while (true) {
            const fieldInput = await this.returnCurrentPlayer().provideField(this.board);
            if (!this.board.takeField(fieldInput, this.returnCurrentPlayer())) {
                continue;
            }
            if (this.isGameWon()) {
                break;
            }
            this.switchToNextPlayer();
        }
        return this.returnCurrentPlayer();
    }
    returnCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }
    private switchToNextPlayer() {
        this.currentPlayerIndex += 1;
        this.currentPlayerIndex %= 2;
    }
    isGameWon() {
        return this.board.isGameWon();
    }
}