import { Game } from './Game.js'
import { Player, PlayerCPU } from './Players.js';
export class App {
    private player1 = new PlayerCPU('cpu #1');
    private player2 = new PlayerCPU('cpu #2');
    private game = new Game(this.player1, this.player2);
    constructor(target: HTMLElement) {
        this.turn();
    }
    turn() {
        const currentPlayer = this.game.returnCurrentPlayer();
        const board = this.game.returnBoard();
        currentPlayer.provideField(board).then(field => {
            this.game.move(currentPlayer, field);
            if (this.game.isGameWon()) {
                alert(`${this.game.returnCurrentPlayer().returnName()} won!`)
            }
            else { this.turn(); }
        });
    }
}