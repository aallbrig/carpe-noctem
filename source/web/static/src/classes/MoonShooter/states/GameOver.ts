import { State } from 'phaser';

export class GameOver extends State {
    public create() {
        const style = {
          font: '65px Arial', fill: '#ff0000', align: 'center'
        };
        this.game.add.text(20, 20, 'Game Over', style);
        this.game.add.text(
            20,
            100,
            `Click or tap
to restart`,
            style
        );
    }
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
