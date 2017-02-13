import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DemoLevel from './components/containers/DemoLevel';
// import SimpleGame from './classes/SimpleGame';

ReactDOM.render(
  <DemoLevel />,
  document.getElementById('app')
);
//
// class SimpleGame {
//   game: Phaser.Game;
//   constructor() {
//     this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { create: this.create });
//   }
//   create() {
//     const text = "Hello World!";
//     const style = { font: "65px Arial", fill: "#ff0000", align: "center" };
//     this.game.add.text(0, 0, text, style);
//   }
// }
//
// (window as any).onload = () => {
//     const game = new SimpleGame();
// };
