import { Player } from "./Players.js";
export class TurnManager {
    private players;
    private playersCount;
    private currentPlayerIndex = 0;
    constructor(players: Player[]) {
        this.players = players;
        this.playersCount = players.length;
    }
    switchToNextPlayer() {
        this.currentPlayerIndex = this.returnNextPlayerIndex();
    }
    returnCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    returnNextPlayer() {
        return this.players[this.returnNextPlayerIndex()];
    }
    private returnNextPlayerIndex() {
        let nextPlayerIndex = this.currentPlayerIndex;
        nextPlayerIndex += 1;
        nextPlayerIndex %= this.playersCount;
        return nextPlayerIndex;
    }
}