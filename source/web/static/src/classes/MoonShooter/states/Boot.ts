import { State } from 'phaser';

export class Boot extends State {
    public preload() {
        this.load.image('preloader', 'assets/moonShooter/loading_bar.png');
    }
    public create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }
}

export default Boot;
