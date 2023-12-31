import { Player } from './Players.js'
import { Board } from './Board.js'
export class Game {
    private players: Player[];
    private board: Board = new Board;
    private currentPlayerIndex: number = 0;
    constructor(player1: Player, player2: Player) {
    returnCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }
    switchToNextPlayer() {
        this.currentPlayerIndex += 1;
        this.currentPlayerIndex %= 2;
    }
    isGameWon() {
        return this.board.isGameWon();
    }
}