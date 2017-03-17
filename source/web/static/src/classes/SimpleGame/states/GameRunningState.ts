import { State, Sprite } from "phaser";

export class GameRunningState extends State {
  titleScreenImage: Sprite;
  constructor() {
    super();
  }
  preload() {
    this.load.image('title', 'assets/debug-grid-1920x1920.png');
  }
  create() {
    this.titleScreenImage = this.add.sprite(0, 0, 'title');
  }
  render() {
    this.game.debug.text("(Carpe Noctem::GameRunningState Debugger)", 20, 20);
  }
}

export default GameRunningState;
