import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import LoadingBar from '../objects/loadingBar';
import Parcels from '../objects/parcels';
import Player from '../objects/player';
import Bullets from '../objects/bullets';

export default class SceneGame extends Phaser.Scene {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyE: Phaser.Input.Keyboard.Key;
  private keyQ: Phaser.Input.Keyboard.Key;
  private loadingBar: LoadingBar;
  private parcels: Parcels;
  private player: Player;
  private bullets: Bullets;

  constructor() {
    super({
      key: SCENES.GAME,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    const camera = this.cameras.add(0, 0, 800, 600);
    camera.setBackgroundColor('rgba(163, 208, 202, 1)');
    this._createControls();
    this.loadingBar = new LoadingBar(this);
    this.parcels = new Parcels(this.physics.world, this);
    this.parcels.spawn();

    this.player = new Player(this, 700, 100, TEXTURES.PLAYER, 0);
    this.player.setScale(3);
    //this.player.play(TEXTURES.PLAYER);

    this.bullets = new Bullets(this);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.parcels.spawn();
      },
      loop: true,
    });
    this._addCollider();
  }

  update(): void {
    this._movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      this.bullets.fireBullet(this.player.x, this.player.y);
    }
    if (this.parcels.reachedGoal()) {
      this.loadingBar.addProgress(0.01);
    }
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _addCollider() {
    this.physics.add.collider(
      this.bullets,
      this.parcels,
      this._onCollisionBulletParcel,
      null,
      this,
    );
  }

  _onCollisionBulletParcel(
    bullet: Phaser.Physics.Arcade.Sprite,
    parcel: Phaser.Physics.Arcade.Sprite,
  ) {
    if (bullet.active && parcel.active) {
      bullet.setActive(false);
      bullet.setVisible(false);
      parcel.destroy();
    }
  }

  _createControls() {
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
  }

  _movePlayer() {
    this.player.setVelocity(0);

    // player movement as vector to ensure same speed diagonally
    const playerDirection = new Phaser.Math.Vector2(0, 0);
    if (this.keyA.isDown) {
      playerDirection.x -= 1;
      this.player.flipX = false;
    } else if (this.keyD.isDown) {
      playerDirection.x += 1;
      this.player.flipX = true;
    }
    if (this.keyW.isDown) {
      playerDirection.y -= 1;
    } else if (this.keyS.isDown) {
      playerDirection.y += 1;
    }
    playerDirection.setLength(100);
    this.player.setVelocity(playerDirection.x, playerDirection.y);
  }
}
