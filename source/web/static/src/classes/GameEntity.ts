interface Image {
  name: string,
  value: string
}
interface SpriteSheet {
  name: string,
  value: string
}
interface GameEntityInterface {
  name: string,
  image?: Image,
  spritesheet?: SpriteSheet,
  game: Phaser.Game,
  update(): void
};

class GameEntity implements GameEntityInterface {
  name = "GameEntity";
  image = {
    name: "Placeholder Image",
    value: "" // TODO: Find placeholder asset
  };
  spritesheet = {
    name: "Placeholder Image",
    value: "" // TODO: Find placeholder asset...?
  };
  game: Phaser.Game;
  constructor(game:Phaser.Game, asset: Image | SpriteSheet) {
    this.game = game;
    if(<Image>asset) {
      this.image = asset;
    } else if (<SpriteSheet>asset) {
      this.spritesheet = asset;
    }
  }
  update():void {
    console.log('update!');
  }
};

export default GameEntity;
