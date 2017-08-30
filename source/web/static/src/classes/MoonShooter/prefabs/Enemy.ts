import { Game, Group, Timer } from 'phaser';
export default class Enemy extends Phaser.Sprite {
    private bounceTick: number;
    private bulletLayer: Group;
    private willFire: boolean;
    public fireTimer: Timer;

    constructor(game: Game, x: number, y: number, bulletLayer: Group) {  
        super(game, x, y, 'enemy');

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.width = this.width / 1.25;
        this.height = this.height / 1.25;
        this.body.velocity.x = -125;
        this.bounceTick = Math.random() * 2;
        this.bulletLayer = bulletLayer;

        this.outOfBoundsKill = true;

        this.willFire = Phaser.Utils.chanceRoll(50);

        if (this.willFire) {
            this.fireTimer = this.game.time.create(false);
            this.fireTimer.add(3500, this.fireShot, this);
            this.fireTimer.start();
        }
    }

    public update() {
        this.bounceTick += .02;
        this.y += Math.sin(this.bounceTick) * 1;
    }

    private fireShot() {
        const bullet = this.bulletLayer.create(this.x, this.y, 'enemy_bullet');
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.x = -150;
    }
}
