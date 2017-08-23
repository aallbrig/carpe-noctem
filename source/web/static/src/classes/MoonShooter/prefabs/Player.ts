import { Game, Sprite, Group, CursorKeys, Key } from 'phaser';

type FirePosition = {
    x: number,
    y: number
};

export default class Player extends Sprite {
    private speed: number;
    private bulletGate: number;
    private shotInterval: number;
    private bullets: Group;
    private cursors: CursorKeys;
    private fireButton: Key;
    private fireposition: FirePosition;

    constructor(game: Game, x: number, y: number, bullets: Group) {  
        super(game, x, y, 'player', 0);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35;
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        this.speed = 100;
        this.bulletGate = 0;
        this.shotInterval = 500;
        this.bullets = bullets;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

        this.health = 10;
        this.maxHealth = 10;
        this.fireposition = {
            x: 108,
            y: 4
        };
    }

    public update() {
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.speed;
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.speed;
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.speed;
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.speed;
        }

        if (this.fireButton.isDown) {
            this.fire();
        }
    }

    private fire() {

        if (this.game.time.now > this.bulletGate) {
            let bullet = this.bullets.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bullets.create(
                    this.x + this.fireposition.x,
                    this.y + this.fireposition.y,
                    'bullet'
                );
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 250;
            }

            this.bulletGate = this.game.time.now + this.shotInterval;   
        }
    }
}
