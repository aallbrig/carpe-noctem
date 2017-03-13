import { Game, IGameConfig, Text } from 'phaser';

export class SimpleGame {
  game: Game;
  textSprite: Text;
  updateCounter: number;
  constructor(canvas:Element, height:number, width:number) {
    // TODO: Refactor to use IGameConfig instead of "normal" config
    // this.game = new Game(gameConfig as IGameConfig);
    this.game = new Game(
      height,
      width,
      Phaser.AUTO,
      canvas,
      {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
      }
    );
  }
  preload() {
    console.log('on preload');
  }
  create() {
    console.log('on create');
    this.updateCounter = 0;
    const text = 'Carpe Noctem Game';
    const style = {
      font: "65px Arial", fill: "#ff0000", align: "center"
    }
    this.textSprite = this.game.add.text(20, 20, text, style);
  }
  update() {
    console.log('on update');
    this.textSprite.text = (this.updateCounter++).toString();
  }
  render() {
    this.game.debug.text("(Carpe Noctem Video Game Debugger)", 20, 120);
  }
}

export default SimpleGame;
