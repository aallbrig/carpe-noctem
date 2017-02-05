import React from 'react'
import { findDOMNode } from 'react-dom'

class PhaserRunner extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const { game: { width, height } } = this.props;
    const { canvas } = this.refs;
    let sprite;
    let player;
    const game = new Phaser.Game(
      width,
      height,
      Phaser.AUTO,
      findDOMNode(canvas),
      {
        preload: () => {
          game.load.spritesheet('mech', 'assets/MechSheet-Raw.png', 48, 48, 12);
          game.load.image('sandrock', 'assets/sandrock.png');
          game.load.image('deathscythe', 'assets/deathscythe.png');
        },
        create: () => {
          sprite = game.add.sprite(48, 48, 'deathscythe');
          sprite.height = 100;
          sprite.width = 100;
          // sprite.animations.add('walk');
          // sprite.animations.play('walk', 48, true);
          game.add.tween(sprite)
            .to({ x: game.width }, Math.random() * 5000, Phaser.Easing.Linear.None, true);
          player = game.add.sprite(100, 250, 'sandrock');
          player.height = 100;
          player.width = 100;
          game.camera.follow(player);
          // player.animations.add('walk');
          // player.animations.play('walk', 48, true);
        },
        update: () => {
          game.debug.cameraInfo(game.camera, 32, 32);
          const {W, A, S, D} = Phaser.Keyboard;
          if (game.input.keyboard.isDown(W)) {
            player.y += -10;
          } else if (game.input.keyboard.isDown(A)) {
            player.x += -10;
          } else if (game.input.keyboard.isDown(S)) {
            player.y += 10;
          } else if (game.input.keyboard.isDown(D)) {
            player.x += 10;
          }
        }
      }
    );
  }
  render () {
    return (<div ref='canvas'></div>);
  }
}

module.exports = PhaserRunner;
