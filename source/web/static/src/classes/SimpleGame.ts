import { Game, IGameConfig } from 'phaser';

export class SimpleGame {
  game: Game;
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
        update: this.update
      }
    );
  }
  preload() {
    console.log('on preload');
  }
  create() {
    console.log('on create');
    const text = 'Carpe Noctem Game';
    const style = {
      font: "65px Arial", fill: "#ff0000", align: "center"
    }
    this.game.add.text(0, 0, text, style);
  }
  update() {
    console.log('on update');
  }
}

export default SimpleGame;
