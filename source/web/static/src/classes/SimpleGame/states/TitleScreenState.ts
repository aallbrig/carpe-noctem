import { Game, State, Sprite, Text } from 'phaser';

export class TitleScreenState extends State {
  game: Game;
  textSprite: Text;
  constructor() {
    super();
  }
  create() {
    const text = 'Click/tap to begin';
    const style = {
      font: "65px Arial", fill: "#ff0000", align: "center"
    };
    this.textSprite = this.game.add.text(20, 20, text, style);
    this.input.onTap.addOnce(this.titleClicked, this);
  }
  render() {
    this.game.debug.text("(Carpe Noctem Video Game Debugger)", 20, 120);
  }
  titleClicked() {
    this.game.state.start('GameRunningState');
  }
}

export default TitleScreenState;