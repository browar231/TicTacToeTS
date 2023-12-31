import { Player } from './Players.js'
import { Board } from './Board.js'
export class Game {
    private players: Player[];
    private board: Board = new Board;
    private currentPlayerIndex: number = 0;
    constructor(player1: Player, player2: Player) {
        this.players = [player1, player2]
        this.board = new Board;
    }
    isGameWon() {
        return this.board.isGameWon();
    }
}