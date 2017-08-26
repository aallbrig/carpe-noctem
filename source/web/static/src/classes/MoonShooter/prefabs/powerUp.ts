import { Game, Sprite } from 'phaser';

export default class PowerUp extends Sprite {
    constructor(game: Game, x: number, y: number) {  
        super(game, x, y, 'power_up', 0);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.velocity.x = -125;
    }
}
