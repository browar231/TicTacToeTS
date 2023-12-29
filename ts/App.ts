import { Game } from './Game.js'
import { Player } from './Players.js';
export class App {
    private player1 = new Player;
    private player2 = new Player;
    private game = new Game(this.player1, this.player2);
    constructor(target: HTMLElement) {

    }
}