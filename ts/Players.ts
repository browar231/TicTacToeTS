import { Board } from './Board.js'
export abstract class Player {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract provideField(board: Board): Promise<number>;
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
    provideField(board: Board): Promise<number> {
        return new Promise((resolve, reject) => {
            this.strategy.provideField(board)
            setTimeout(() => {
                resolve(this.strategy(board));
            }, 1000)
        });
    }
}
type CPUStrategy = (board: Board) => number;

export const StrategyRandom: CPUStrategy = (board) => {
    const freeFields = board.returnFreeFields();
    const randomField = Math.floor(Math.random() * freeFields.length);
    return freeFields[randomField];
}
