import { Board } from './Board.js'
import { Game } from './Game.js';
type CPUStrategy = (game: Game, player: Player) => number;
export abstract class Player {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract provideField(game: Game): Promise<number>;
    returnName() {
        return this.name;
    }
}
export class PlayerCPU extends Player {
    private strategy: CPUStrategy;
    constructor(name: string, strategy: CPUStrategy) {
        super(name);
        this.strategy = strategy;
    }
    provideField(game: Game): Promise<number> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.strategy(game, this));
            }, 1000)
        });
    }
}
export class PlayerHuman extends Player {
    private externalInputProvider;
    constructor(name: string, externalInputProvider: () => Promise<number>) {
        super(name);
        this.externalInputProvider = externalInputProvider;
    }
    async provideField(game: Game): Promise<number> {
        return await this.externalInputProvider();
    }
}

export const StrategyRandom: CPUStrategy = (game) => {
    const freeFields = game.returnBoard().returnFreeFields();
    const randomField = Math.floor(Math.random() * freeFields.length);
    return freeFields[randomField];
}
export const StrategyDontMissWinningMove: CPUStrategy = (game, player) => {
    const freeFields = game.returnBoard().returnFreeFields();
    const bestMove = freeFields.find((field) => {
        const clonedGame: Game = game.clone();
        clonedGame.move(player, field);
        return clonedGame.isWon()
    });
    return bestMove || StrategyRandom(game, player);
}