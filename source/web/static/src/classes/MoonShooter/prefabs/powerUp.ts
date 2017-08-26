import { Game, Sprite, Rectangle } from 'phaser';

export default class Player extends Sprite {
    //declare variables

    constructor(game: Game, x: number, y: number, bullets: Group) {  
        //set up sprite character and functions
        super(game, x, y, 'player', 0);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 0;
        this.body.drag.y = 0;
        this.body.collideWorldBounds = true;

        this.width = this.width / 1.5;
        this.height = this.height / 1.5;

        this.speed = 100;
        this.bulletGate = 0;
        this.shotInterval = 500;
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
}
