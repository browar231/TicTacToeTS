import { Game } from './Game.js'
import { Player, PlayerCPU, PlayerHuman, StrategyRandom, StrategyDontMissWinningMove } from './Players.js';
export class App {
    private player1;
    private player2;
    private game;
    private fields: HTMLElement[] = [];
    private target: HTMLElement;
    private textElement: HTMLElement;
    constructor(target: HTMLElement) {
        this.target = target;
        for (let i = 0; i < 9; i++) {
            const field = document.createElement('div');
            field.classList.add('field');
            field.dataset.fieldId = `${i}`;
            this.target.appendChild(field);
            this.fields.push(field);
        }
        this.textElement = document.createElement('div');
        this.textElement.id = "text";
        this.target.appendChild(this.textElement);
        this.player1 = new PlayerCPU('cpu #1', StrategyDontMissWinningMove);
        this.player2 = new PlayerHuman('cpu #2', this.returnPromiseResolvableOnUserClick.bind(this));
        this.game = new Game(this.player1, this.player2);
        this.turn();
    }
    returnPromiseResolvableOnUserClick(): Promise<number> {
        return new Promise((resolve) => {
            this.target.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (!target.classList.contains('field')) {
                    return false;
                }
                if (target.dataset.fieldId === undefined) {
                    return false;
                }
                resolve(~~target.dataset.fieldId!);
            })
        })
    }
    turn() {
        const currentPlayer = this.game.returnCurrentPlayer();
        const board = this.game.returnBoard();
        this.textElement.innerText = currentPlayer.returnName();
        currentPlayer.provideField(board).then(field => {
            this.game.move(currentPlayer, field);
            board.returnFields().forEach((field, index) => {
                if (field === this.player1) {
                    this.fields[index].style.backgroundColor = '#f00';
                }
                if (field === this.player2) {
                    this.fields[index].style.backgroundColor = '#00f';
                }
            });
            if (this.game.isGameWon()) {
                this.textElement.innerText = `${this.game.returnCurrentPlayer().returnName()} won!`;
                return true;
            }
            if (this.game.isGameInProgress()) {
                this.turn();
            } else {
                this.textElement.innerText = 'draw';

            }
        });
    }
}