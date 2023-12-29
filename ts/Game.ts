import { Player } from './Players.js'
import { Board } from './Board.js'
export class Game {
    private players: Player[];
    private board: Board;
    constructor(player1: Player, player2: Player) {
        this.board = new Board;
    }
}