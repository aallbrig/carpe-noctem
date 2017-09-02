import { State } from 'phaser';

export class GameOver extends State {
    public update() {
        if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
            || this.game.input.pointer1.isDown
            || this.game.input.mousePointer.isDown
        ) {
            this.game.state.start('game');
        }
    }
}

export default GameOver;
