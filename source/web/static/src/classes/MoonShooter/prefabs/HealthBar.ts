import { Game, Tween, Group, Sprite } from 'phaser';

type AssetName = string;
export default class HealthBar extends Group {
    private holder: Sprite;
    private bar: Sprite;
    private tween: Tween;
    constructor(game: Game, x: number, y: number, barGraphic: AssetName, holderGraphic: AssetName) {
        super(game);
        this.x = x;
        this.y = y;
        this.bar = this.create(0, 0, barGraphic);
        this.holder = this.create(0, 0, holderGraphic);
    }

    public setValue(value: number) {
        if (this.tween) this.tween.stop();
        this.tween = this.game.add.tween(this.bar.scale);
        this.tween.to({ x: value }, 350);
        this.tween.start();
    }
}
