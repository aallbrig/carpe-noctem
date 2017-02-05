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
    let cursors;
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
          game.world.setBounds(0, 0, 1920, 1920);
          game.physics.startSystem(Phaser.Physics.P2JS);

          sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'deathscythe');
          sprite.height = 100;
          sprite.width = 100;

          game.add.tween(sprite)
            .to({ x: game.width }, Math.random() * 5000, Phaser.Easing.Linear.None, true);
          player = game.add.sprite(game.world.centerX, game.world.centerY, 'sandrock');
          player.height = 100;
          player.width = 100;

          game.physics.p2.enable(player);
          game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
          cursors = game.input.keyboard.createCursorKeys();
        },
        update: () => {
          game.debug.cameraInfo(game.camera, 32, 32);
          game.debug.spriteCoords(player, 32, 500);
          player.body.setZeroVelocity();
          const {W, A, S, D} = Phaser.Keyboard;

          if (cursors.up.isDown || game.input.keyboard.isDown(W)) {
              player.body.moveUp(300);
          } else if (cursors.down.isDown || game.input.keyboard.isDown(S)) {
              player.body.moveDown(300);
          }
          if (cursors.left.isDown || game.input.keyboard.isDown(A)) {
              player.body.velocity.x = -300;
          } else if (cursors.right.isDown || game.input.keyboard.isDown(D)) {
              player.body.moveRight(300);
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
