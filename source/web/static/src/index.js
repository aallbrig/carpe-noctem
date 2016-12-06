const app = (() => {
  const canvasId = 'game-canvas';
  const canvasW = 800;
  const canvasH = 600;
  let sprite;
  const game = new Phaser.Game(
    canvasW,
    canvasH,
    Phaser.AUTO,
    canvasId,
    {
      preload: () => {
        game.load.spritesheet('mech', 'assets/MechSheet-Raw.png', 48, 48, 12);
        console.log('on preload');
        document.write('O n P h a s e r P r e l o a d C o m p l e t e . . .');
      },
      create: () => {
        sprite = game.add.sprite(40, 100, 'mech');
        sprite.animations.add('walk');
        sprite.animations.play('walk', 50, true);
        game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);

        console.log('on create');
        document.write("O n P h a s e r C r e a t e C o m p l e t e . . .");
        document.write("O n P h a s e r U p d a t e I n i t i a l i z i n g... Done.  Check Console.");
      },
      update:  () => {
        if (sprite.x >= 300) {
          sprite.scale.x += 0.01;
          sprite.scale.y += 0.01;
        }
        console.log('On Phaser update');
      }
    }
  );
})();
