import { Game } from 'phaser';
import { Boot, Preload, GameOver, StartScreen, Game as GameState } from './states';

export class MoonShooter {
  public game: Game;
  constructor(canvas: Element, height: number | string, width: number | string) {
    this.game = new Game(
      width,
      height,
      Phaser.AUTO,
      canvas
    );
    this.game.state.add('boot', Boot);
    this.game.state.add('preload', Preload);
    this.game.state.add('game', GameState);
    this.game.state.add('gameOver', GameOver);
    this.game.state.add('starting-screen', StartScreen);
    this.game.state.start('boot');
  }
}

export default MoonShooter;
