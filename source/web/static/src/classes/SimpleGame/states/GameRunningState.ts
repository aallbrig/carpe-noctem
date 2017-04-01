import {
  State, Sprite, Physics, Game,
  Camera, CursorKeys, Keyboard
} from 'phaser';

const moveSprite = (game:Game, sprite:Sprite) => game.add.tween(sprite)
  .to({
    x: game.world.bounds.width * Math.random(),
    y: game.world.bounds.height * Math.random()
  }, 2000, Phaser.Easing.Linear.None, true);

export class GameRunningState extends State {
  private titleScreenImage: Sprite;
  private player: Sprite;
  private enemy: Sprite;
  private playerCollisionGroup: Physics.P2.CollisionGroup;
  private enemyCollisionGroup: Physics.P2.CollisionGroup;
  private cursors: CursorKeys;
  constructor() {
    super();
  }
  public preload() {
    this.load.image('backgroundImage', 'assets/debug-grid-1920x1920.png');
    this.game.load.image('sandrock', 'assets/EW-Sandrock-Bazooka-Up.png');
    this.game.load.image('deathscythe', 'assets/deathscythe-2.png');
  }
  public create() {
    this.titleScreenImage = this.add.sprite(0, 0, 'backgroundImage');
    this.game.world.setBounds(0, 0, 1920, 1920);
    this.game.physics.startSystem(Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.gravity.y = 1000;
    this.game.physics.p2.restitution = 0.8;

    this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    this.enemy = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'deathscythe'
    );
    this.game.physics.p2.enable(this.enemy);
    this.enemy.height = 150;
    this.enemy.width = 150;
    this.enemy.body.setRectangle(100, 100);
    this.enemy.body.setCollisionGroup(this.enemyCollisionGroup);
    this.enemy.body.collides([
      this.enemyCollisionGroup,
      this.playerCollisionGroup
    ]);
    moveSprite(this.game, this.enemy);

    this.player = this.game.add.sprite(
      this.game.world.centerX + 200,
      this.game.world.centerY,
      'sandrock'
    );
    this.player.height = 200;
    this.player.width = 100;
    this.game.physics.p2.enable(this.player);
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(this.enemyCollisionGroup, function collisionFn() {
      this.game.camera.shake(0.05, 500);
      moveSprite(this.game, this.enemy);
    }, this);

    this.game.camera.follow(
      this.player,
      Camera.FOLLOW_LOCKON,
      0.1,
      0.1
    );
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.touch.enabled = true;
  }
  public render() {
    this.game.debug.text('(Carpe Noctem::GameRunningState Debugger)', 10, 10);
  }
  public update() {
    const {W, A, S, D} = Keyboard;
    this.game.debug.cameraInfo(this.game.camera, 10, 32);
    this.game.debug.spriteCoords(this.player, 10, 128);
    this.game.debug.spriteCoords(this.enemy, 10, 192);

    this.player.body.setZeroVelocity();
    if (this.cursors.up.isDown || this.game.input.keyboard.isDown(W)) {
      this.player.body.moveUp(300);
    } else if (this.cursors.down.isDown || this.game.input.keyboard.isDown(S)) {
      this.player.body.moveDown(300);
    }
    if (this.cursors.left.isDown || this.game.input.keyboard.isDown(A)) {
      this.player.body.moveLeft(300);
    } else if (this.cursors.right.isDown || this.game.input.keyboard.isDown(D)) {
      this.player.body.moveRight(300);
    }
  }
}

export default GameRunningState;
