import { Game, State, Sprite, Text } from 'phaser';

export class TitleScreenState extends State {
  public game: Game;
  private textSprite: Text;
  constructor() {
    super();
  }
  public create() {
    const text = 'Click/tap to begin';
    const style = {
      font: '65px Arial', fill: '#ff0000', align: 'center'
    };
    this.textSprite = this.game.add.text(20, 20, text, style);
    this.input.onTap.addOnce(this.titleClicked, this);
  }
  public render() {
    this.game.debug.text('(Carpe Noctem::TitleScreenState Debugger)', 20, 120);
  }
  private titleClicked() {
    this.game.state.start('GameRunningState');
  }
}

export default TitleScreenState;