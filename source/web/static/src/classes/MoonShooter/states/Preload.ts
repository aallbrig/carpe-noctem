import { State, Sprite } from 'phaser';

const ASSET_PREFIX = 'assets/moonShooter';

export class Preload extends State {
    private loadingBar: Sprite;
    private ready: boolean = false;

    public preload() {
        this.load.image('loading_bg', `${ASSET_PREFIX}/loading_bg.jpg`);
        this.load.image('player', `${ASSET_PREFIX}/player.png`);
        this.load.image('enemy', `${ASSET_PREFIX}/enemy.png`);
        this.load.image('hexagon', `${ASSET_PREFIX}/hexagon_particle.png`);
        this.load.image('bullet', `${ASSET_PREFIX}/bullet.png`);
        this.load.image('moon', `${ASSET_PREFIX}/moon.png`);
        this.load.image('power_up', `${ASSET_PREFIX}/power_up_standup.png`);
        this.load.image('enemy_bullet', `${ASSET_PREFIX}/enemy_bullet.png`);
        this.load.image('bg', `${ASSET_PREFIX}/bg.png`);
        this.load.image('health_bar', `${ASSET_PREFIX}/health_bar.png`);
        this.load.image('health_holder', `${ASSET_PREFIX}/health_holder.png`);
        this.load.image('circle', `${ASSET_PREFIX}/circle.png`);
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
