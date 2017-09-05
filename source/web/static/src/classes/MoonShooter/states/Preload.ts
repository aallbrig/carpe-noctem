import { State, Sprite } from 'phaser';

export class Preload extends State {
    private loadingBar: Sprite;
    private ready: boolean = false;

    public preload() {
        this.load.image('loading_bg', require('../assets/loading_bg.jpg'));
        this.load.image('player', require('../assets/player.png'));
        this.load.image('enemy', require('../assets/enemy.png'));
        this.load.image('hexagon', require('../assets/hexagon_particle.png'));
        this.load.image('bullet', require('../assets/bullet.png'));
        this.load.image('moon', require('../assets/moon.png'));
        this.load.image('power_up', require('../assets/power_up_standup.png'));
        this.load.image('enemy_bullet', require('../assets/enemy_bullet.png'));
        this.load.image('bg', require('../assets/bg.png'));
        this.load.image('health_bar', require('../assets/health_bar.png'));
        this.load.image('health_holder', require('../assets/health_holder.png'));
        this.load.image('circle', require('../assets/circle.png'));
    }

    public create() {
        this.add.sprite(0, 0, 'loading_bg');
        this.loadingBar = this.add.sprite(
            this.game.width / 2,
            this.game.height / 2,
            'preloader'
        );
        this.loadingBar.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.loadingBar);        
        this.load.start();
    }

    public update() {
        if (this.ready) {
            this.game.state.start('game');
        }
    }

    private onLoadComplete() {
        this.ready = true;
    }
}

export default Preload;
