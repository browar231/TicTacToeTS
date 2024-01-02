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
    private returnFreeFields(board: Board) {
        let freeFields: number[] = [];
        board.returnFields().forEach((value, index) => {
            if (value === null) {
                freeFields.push(index);
            }
        })
        return freeFields;
    }
    provideField(board: Board): Promise<number> {
        return new Promise((resolve, reject) => {
            const freeFields = this.returnFreeFields(board);
            const randomField = Math.floor(Math.random() * freeFields.length);
            setTimeout(() => {
                resolve(freeFields[randomField])
            }, 1000);
        });
    }
}