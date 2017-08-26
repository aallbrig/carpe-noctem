import { Game, Sprite, Group, CursorKeys, Key, Keyboard, Rectangle } from 'phaser';
import Swipe from 'phaser-swipe';

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
    private swipe: Swipe;

    constructor(game: Game, x: number, y: number, bullets: Group) {  
        super(game, x, y, 'player', 0);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 35;
        this.body.drag.y = 35;
        this.body.collideWorldBounds = true;

        this.width = this.width / 1.25;
        this.height = this.height / 1.25;

        this.speed = 140;
        this.bulletGate = 0;
        this.shotInterval = 740;
        this.bullets = bullets;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.swipe = new (require('phaser-swipe'))(this.game);
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
        const { W, A, S, D } = Keyboard;
        const {
            DIRECTION_LEFT,
            DIRECTION_RIGHT,
            DIRECTION_UP,
            DIRECTION_DOWN,
            DIRECTION_DOWN_LEFT,
            DIRECTION_DOWN_RIGHT,
            DIRECTION_UP_LEFT,
            DIRECTION_UP_RIGHT
        } = this.swipe;
        const direction = this.swipe.check();
        if (
            this.cursors.up.isDown || this.game.input.keyboard.isDown(W)
            || (direction && direction.direction === DIRECTION_UP)
        ) {
            // Up ^
            this.body.velocity.y = -this.speed;
        } else if (
            this.cursors.down.isDown || this.game.input.keyboard.isDown(S)
            || (direction && direction.direction === DIRECTION_DOWN)
        ) {
            // Down v
            this.body.velocity.y = this.speed;
        }
        if (
            this.cursors.left.isDown || this.game.input.keyboard.isDown(A)
            || (direction && direction.direction === DIRECTION_LEFT)
        ) {
            // Left <
            this.body.velocity.x = -this.speed;
        } else if (
            this.cursors.right.isDown || this.game.input.keyboard.isDown(D)
            || (direction && direction.direction === DIRECTION_RIGHT)
        ) {
            // Right >
            this.body.velocity.x = this.speed;
        }
        if ((direction && direction.direction === DIRECTION_DOWN_LEFT)) {
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = this.speed;
        }
        if ((direction && direction.direction === DIRECTION_DOWN_RIGHT)) {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = this.speed;
        }
        if ((direction && direction.direction === DIRECTION_UP_LEFT)) {
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = -this.speed;
        }
        if ((direction && direction.direction === DIRECTION_UP_RIGHT)) {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = -this.speed;
        }
        if (
            (Rectangle.contains(this.body, this.game.input.x, this.game.input.y)
            && (this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown))
            || this.fireButton.isDown
        ) {
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
