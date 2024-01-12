import { Player } from "./Players.js"
/**
 * Class for managing board, allows for taking place on it, and checking if move is available
 */
export class Board {
    private fields: (Player | null)[] = [null, null, null, null, null, null, null, null, null];
    private freeFieldsCount = 9;
    constructor(fields?: (Player | null)[], freeFieldsCount?: number) {
        if (fields) {
            this.fields = fields;
        }
        if (freeFieldsCount) {
            this.freeFieldsCount = freeFieldsCount;
        }
    }
    returnFields() {
        return this.fields;
    }
    returnFreeFields() {
        let freeFields: number[] = [];
        this.fields.forEach((value, index) => {
            if (value === null) {
                freeFields.push(index);
            }
        })
        return freeFields;
    }
    clone() {
        let clone = new Board(Array.from(this.fields), this.freeFieldsCount);
        return clone;
    }
    takeField(field: number, player: Player) {
        if (!this.isInputValid(field)) {
            return false;
        }
        if (this.isBoardFull()) {
            return false;
        }
        if (!this.isFieldFree(field)) {
            return false;
        }
        this.fields[field] = player;
        this.freeFieldsCount--;
        return true;
    }
    isInputValid(field: number) {
        if (field < 0) {
            return false;
        }
        if (field > 8) {
            return false;
        }
        return true;
    }
    isFieldFree(field: number) {
        return this.fields[field] === null;
    }
    isBoardFull() {
        return this.freeFieldsCount === 0;
    }
}