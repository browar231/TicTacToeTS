import { Game } from './Game.js'
import { Player, PlayerCPU } from './Players.js';
export class App {
    private player1 = new PlayerCPU('cpu #1');
    private player2 = new PlayerCPU('cpu #2');
    private game = new Game(this.player1, this.player2);
    constructor(target: HTMLElement) {
        while (!this.game.isGameWon()) {

        }
    }
}