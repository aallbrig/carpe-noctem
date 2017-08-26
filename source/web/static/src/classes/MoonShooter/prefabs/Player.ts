import {
    Game, Sprite, CursorKeys, Key, Keyboard, Rectangle,
    Weapon, Physics
} from 'phaser';
import Swipe from 'phaser-swipe';

export default class Player extends Sprite {
    public weapon: Weapon;
    private speed: number;
    private cursors: CursorKeys;
    private fireButton: Key;
    private swipe: Swipe;

    constructor(game: Game, x: number, y: number) {  
        super(game, x, y, 'player', 0);
        
        this.game.physics.enable(this, Physics.ARCADE);
        
        this.weapon = game.add.weapon(30, 'bullet');
        this.weapon.bulletKillType = Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletAngleVariance = 6;
        this.weapon.fireRate = 600;
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
        this.weapon.trackSprite(this, 100, 16);

        this.body.drag.x = 35;
        this.body.drag.y = 35;

        this.body.collideWorldBounds = true;

        this.width = this.width / 1.5;
        this.height = this.height / 1.5;

        this.speed = 100;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.swipe = new (require('phaser-swipe'))(this.game);
        this.fireButton = this.game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );

        this.health = 10;
        this.maxHealth = 10;
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
            this.body.velocity.y = -this.speed * 1.5;
        } else if (
            this.cursors.down.isDown || this.game.input.keyboard.isDown(S)
            || (direction && direction.direction === DIRECTION_DOWN)
        ) {
            // Down v
            this.body.velocity.y = this.speed * 2;
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
            this.weapon.fire();
        }
    }
}
