import { Game, IGameConfig, Text, State, Sprite } from 'phaser';
import { GameRunningState, TitleScreenState } from '.';
import { Store } from 'redux';

export class SimpleGame {
  public game: Game;
  private store: Store<{}>;
  constructor(canvas:Element, height:number, width:number) {
    // TODO: Refactor to use IGameConfig instead of "normal" config
    // this.game = new Game(gameConfig as IGameConfig);
    this.game = new Game(
      width,
      height,
      Phaser.AUTO,
      canvas
    );
    this.game.state.add('GameRunningState', GameRunningState);
    this.game.state.add('TitleScreenState', TitleScreenState);
    this.game.state.start('TitleScreenState', true, true);
  }
}

export default SimpleGame;
