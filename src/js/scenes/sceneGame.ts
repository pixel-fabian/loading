import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';
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
  private background: Phaser.GameObjects.Image;
  private loadingBar: LoadingBar;
  private parcels: Parcels;
  private player: Player;
  private bullets: Bullets;
  private soundExplode?: Phaser.Sound.BaseSound;
  private soundsParcel?;
  public soundShoot?: Phaser.Sound.BaseSound;
  private score = 0;
  private scoreText: Phaser.GameObjects.Text;

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
    camera.setBackgroundColor('rgba(103, 130, 126, 1)');
    this.background = this.add
      .image(0, 0, TEXTURES.HUMAN)
      .setOrigin(0, 0)
      .setScale(8)
      .setAlpha(0.2);
    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this._humanWink();
      },
      loop: true,
    });
    this._createControls();
    this.loadingBar = new LoadingBar(this);
    this.parcels = new Parcels(this.physics.world, this);
    this.parcels.spawn();

    this.player = new Player(this, 700, 100, TEXTURES.PLAYER, 8);
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

    // sound
    this.soundExplode = this.sound.add(AUDIO.EXPLODE);
    this.soundsParcel = [
      this.sound.add(AUDIO.PARCEL_1),
      this.sound.add(AUDIO.PARCEL_2),
      this.sound.add(AUDIO.PARCEL_3),
      this.sound.add(AUDIO.PARCEL_4),
    ];
    this.soundShoot = this.sound.add(AUDIO.SHOOT);

    // text
    this.scoreText = this.add.text(400, 42, `${this.score}`, {
      fontFamily: 'BitPotion',
      fontSize: '35px',
      color: '0x222222',
    });
  }

  update(): void {
    this._movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (this.bullets.fireBullet(this.player.x, this.player.y + 10)) {
        this.soundShoot.play();
        this.player.x = this.player.x + 5;
      }
    }
    if (this.parcels.reachedGoal()) {
      this.loadingBar.addProgress(0.01);
      this.soundsParcel[
        Phaser.Math.Between(0, this.soundsParcel.length - 1)
      ].play();
    }
    // update score
    this._updateScore(1);
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
      this.soundExplode.play();
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.body.enable = false;

      parcel.destroy();
      this._updateScore(50);
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
    playerDirection.setLength(200);
    this.player.setVelocity(playerDirection.x, playerDirection.y);
  }

  _humanWink() {
    this.background.setTexture(TEXTURES.HUMAN_WINK);
    this.time.addEvent({
      delay: 200,
      callback: () => {
        this.background.setTexture(TEXTURES.HUMAN);
      },
      loop: false,
    });
  }

  _updateScore(amount: number) {
    this.score = this.score + amount;
    this.scoreText.setText(`${this.score}`);
  }
}
