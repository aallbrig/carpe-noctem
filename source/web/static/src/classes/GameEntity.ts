export interface Image {
  name: string,
  value: string
}
export interface SpriteSheet {
  name: string,
  value: string
}
export interface GameEntityInterface {
  name: string,
  image?: Image,
  spritesheet?: SpriteSheet,
  game: Phaser.Game,
  update(): void
};

export class GameEntity implements GameEntityInterface {
  public name = 'GameEntity';
  public image = {
    name: 'Placeholder Image',
    value: '' // TODO: Find placeholder asset
  };
  public spritesheet = {
    name: 'Placeholder SpriteSheet',
    value: '' // TODO: Find placeholder asset...?
  };
  public game: Phaser.Game;
  constructor(game:Phaser.Game, asset:Image | SpriteSheet) {
    this.game = game;
    // "case class" approximation
    if (<Image>asset) {
      this.image = asset;
    } else if (<SpriteSheet>asset) {
      this.spritesheet = asset;
    }
  }
  public update():void {
    console.log('update!');
  }
};

export default GameEntity;
