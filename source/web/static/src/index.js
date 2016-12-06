const app = (() => {
  const canvasId = 'game-canvas';
  const canvasW = 800;
  const canvasH = 600;
  let sprite;
  const game = new Phaser.Game(1080, 1080, Phaser.AUTO,
    canvasId,
    {
      preload: () => {
        game.load.spritesheet('mech', 'assets/MechSheet-Raw.png', 48, 48, 12);
      },
      create: () => {
        sprite = game.add.sprite(48, 48, 'mech');
        sprite.animations.add('walk');
        sprite.animations.play('walk', 48, true);
        game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
      },
      update:  () => {
      }
    }
  );
})();
