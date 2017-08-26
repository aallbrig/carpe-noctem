import { State, Sprite } from 'phaser';

export class Preload extends State {
    private loadingBar: Sprite;
    private ready: boolean = false;

    public preload() {
        this.load.image('loading_bg', 'assets/moonShooter/loading_bg.jpg');
        this.load.image('player', 'assets/moonShooter/player.png');
        this.load.image('enemy', 'assets/moonShooter/enemy.png');
        this.load.image('hexagon', 'assets/moonShooter/hexagon_particle.png');
        this.load.image('bullet', 'assets/moonShooter/bullet.png');
        this.load.image('power_up', 'assets/moonShooter/power_up_standup.png');
        this.load.image('enemy_bullet', 'assets/moonShooter/enemy_bullet.png');
        this.load.image('bg', 'assets/moonShooter/bg.png');
        this.load.image('health_bar', 'assets/moonShooter/health_bar.png');
        this.load.image('health_holder', 'assets/moonShooter/health_holder.png');
        this.load.image('circle', 'assets/moonShooter/circle.png');
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
