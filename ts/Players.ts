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
    constructor(name: string) {
        super(name);
    }
    provideField(board: Board): number {
        return Math.floor(Math.random() * 9);
}
}