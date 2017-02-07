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
    let moveSprite;
    let playerCollisionGroup;
    let spriteCollisionGroup;
    const game = new Phaser.Game(
      width,
      height,
      Phaser.AUTO,
      findDOMNode(canvas),
      {
        preload: () => {
          // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          // game.scale.pageAlignHorizontally = true;
          // game.scale.pageAlignVertically = true;
          game.stage.backgroundColor = '#eee';
          game.load.spritesheet('mech', 'assets/MechSheet-Raw.png', 48, 48, 12);
          game.load.image('sandrock', 'assets/sandrock.png');
          game.load.image('deathscythe', 'assets/deathscythe.png');
        },
        create: () => {
          game.world.setBounds(0, 0, 1920, 1920);
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.setImpactEvents(true);
          playerCollisionGroup = game.physics.p2.createCollisionGroup();
          spriteCollisionGroup = game.physics.p2.createCollisionGroup();
          game.physics.p2.updateBoundsCollisionGroup();

          sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'deathscythe');
          game.physics.p2.enable(sprite);
          sprite.height = 200;
          sprite.width = 200;
          sprite.body.setCollisionGroup(spriteCollisionGroup);
          // moveSprite = () => game.add.tween(sprite)
          //   .to({
          //     x: game.world.centerX/*game.world.bounds.width * Math.random()*/,
          //     y: game.world.centerY/*game.world.bounds.height * Math.random()*/
          //   }, 10000, Phaser.Easing.Linear.None, true);
          // moveSprite();
          player = game.add.sprite(game.world.centerX + 200, game.world.centerY, 'sandrock');
          player.height = 400;
          player.width = 400;
          sprite.scale.set(0.2);
          game.physics.p2.enable(player);
          player.body.setCollisionGroup(playerCollisionGroup);
          player.body.collides([playerCollisionGroup, spriteCollisionGroup]);
          console.log(playerCollisionGroup);
          // playerCollisionGroup.collides(spriteCollisionGroup, () => {
          //   console.log('collision!');
          //   // moveSprite();
          //   game.camera.shake(0.05, 500);
          // }, this);
          game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
          cursors = game.input.keyboard.createCursorKeys();
        },
        update: () => {
          const {W, A, S, D} = Phaser.Keyboard;
          game.debug.cameraInfo(game.camera, 32, 32);
          game.debug.spriteCoords(player, 32, 500);

          player.body.setZeroVelocity();
          if (cursors.up.isDown || game.input.keyboard.isDown(W)) {
            player.body.moveUp(300);
          } else if (cursors.down.isDown || game.input.keyboard.isDown(S)) {
            player.body.moveDown(300);
          }
          if (cursors.left.isDown || game.input.keyboard.isDown(A)) {
            player.body.moveLeft(300);
          } else if (cursors.right.isDown || game.input.keyboard.isDown(D)) {
            player.body.moveRight(300);
          }

          // If player is colliding with sprite
          game.physics.arcade.collide(playerCollisionGroup, spriteCollisionGroup, () => {
            console.log('Is colliding');
            game.camera.shake(0.05, 500);
            moveSprite();
          }, null, this);
          game.physics.arcade.collide(sprite, player, () => {
            console.log('asklfjasj colliding');
            game.camera.shake(0.05, 500);
            moveSprite();
          });
        }
      }
    );
  }
  render () {
    return (<div ref='canvas'></div>);
  }
}

module.exports = PhaserRunner;
