import { State } from 'phaser';

export class Boot extends State {
    preload() {
        this.load.image('preloader', 'assets/moonShooter/loading_bar.png');
    }
    create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }
}

export default Boot;