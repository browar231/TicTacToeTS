import { Board } from './Board.js'
export abstract class Player {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract provideField(board: Board): number;
    returnName() {
        return this.name;
    }
}
}