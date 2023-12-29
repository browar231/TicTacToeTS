import { Player } from "./Players"
/**
 * Class for managing board, allows for taking place on it, and checking if move is available
 */
export class Board {
    private fields: (Player | null)[] = [null, null, null, null, null, null, null, null, null];
    private freeFieldsCount = 9;
    takeField(field: number, player: Player) {
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
    isFieldFree(field: number) {
        return this.fields[field] === null;
    }
    isBoardFull() {
        return this.freeFieldsCount === 0;
    }
    isGameWon() {
        return this.checkCols() || this.checkRows() || this.checkDiags();
    }
    private checkCols() {
        if (this.fields[0] === this.fields[3] && this.fields[3] === this.fields[6]) {
            return true;
        }
        if (this.fields[1] === this.fields[4] && this.fields[4] === this.fields[7]) {
            return true;
        }
        if (this.fields[2] === this.fields[5] && this.fields[5] === this.fields[8]) {
            return true;
        }
        return false;
    }
    private checkRows() {
        if (this.fields[0] === this.fields[1] && this.fields[1] === this.fields[2]) {
            return true;
        }
        if (this.fields[3] === this.fields[4] && this.fields[4] === this.fields[5]) {
            return true;
        }
        if (this.fields[6] === this.fields[7] && this.fields[7] === this.fields[8]) {
            return true;
        }
        return false;
    }
    private checkDiags() {
        if (this.fields[0] === this.fields[4] && this.fields[4] === this.fields[8]) {
            return true;
        }
        if (this.fields[2] === this.fields[4] && this.fields[4] === this.fields[6]) {
            return true;
        }
        return false;
    }
}