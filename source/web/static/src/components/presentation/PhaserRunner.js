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
        },
        create: () => {
          sprite = game.add.sprite(48, 48, 'mech');
          sprite.animations.add('walk');
          sprite.animations.play('walk', 48, true);
          game.add.tween(sprite)
            .to({ x: game.width }, Math.random() * 5000, Phaser.Easing.Linear.None, true);
          player = game.add.sprite(150, 150, 'mech');
          player.animations.add('walk');
          player.animations.play('walk', 48, true);
        },
        update:  () => {
        }
      }
    );
  }
  render () {
    return (<div ref='canvas'></div>);
  }
}

module.exports = PhaserRunner;
