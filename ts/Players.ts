import { Board } from './Board.js'
type CPUStrategy = (board: Board, player: Player) => number;
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
            setTimeout(() => {
                resolve(this.strategy(board, this));
            }, 1000)
        });
    }
}

export const StrategyRandom: CPUStrategy = (board) => {
    const freeFields = board.returnFreeFields();
    const randomField = Math.floor(Math.random() * freeFields.length);
    return freeFields[randomField];
}
export const StrategyDontMissWinningMove: CPUStrategy = (board, player) => {
    const freeFields = board.returnFreeFields();
    const bestMove = freeFields.find((field) => {
        const clonedBoard: Board = board.clone();
        clonedBoard.takeField(field, player);
        return clonedBoard.isGameWon()
    });
    return bestMove || StrategyRandom(board, player);
}