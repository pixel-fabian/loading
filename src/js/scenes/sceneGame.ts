import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import ANIMATIONS from '../constants/AnimationKeys';
import AUDIO from '../constants/AudioKeys';
import LoadingBar from '../objects/loadingBar';
import Parcels from '../objects/parcels';
import Parcel from '../objects/parcel';
import Player from '../objects/player';
import Gnomes from '../objects/gnomes';
import Bullets from '../objects/bullets';
import SaveGame from '../objects/saveGame';

export default class SceneGame extends Phaser.Scene {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyE: Phaser.Input.Keyboard.Key;
  private keyQ: Phaser.Input.Keyboard.Key;
  private keyCursors;
  private background: Phaser.GameObjects.Image;
  private loadingBar: LoadingBar;
  private parcels: Parcels;
  private player: Player;
  private gnomes: Gnomes;
  private bullets: Bullets;
  private soundExplode?: Phaser.Sound.BaseSound;
  private soundsParcel?;
  public soundShoot?: Phaser.Sound.BaseSound;
  private soundGunEmpty?: Phaser.Sound.BaseSound;
  private soundGnomeMageHit?: Phaser.Sound.BaseSound;
  private score;
  private scoreText: Phaser.GameObjects.Text;
  private spawnParcelTimer: Phaser.Time.TimerEvent;
  private spawnGnomeTimer: Phaser.Time.TimerEvent;
  private music_loop;
  private saveGame: SaveGame;

  constructor() {
    super({
      key: SCENES.GAME,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {
    this.saveGame = new SaveGame();
  }

  preload(): void {}

  create(): void {
    // reset data
    this.score = 0;
    const camera = this.cameras.add(0, 0, 800, 600);
    // background
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
    // music
    const music_intro = this.sound.add(AUDIO.MUSIC_INTRO);
    this.music_loop = this.sound.add(AUDIO.MUSIC_LOOP, { loop: true });
    music_intro.play();
    music_intro.on('complete', () => {
      this.music_loop.play();
    });

    this._createControls();
    this._createAnimations();
    this.loadingBar = new LoadingBar(this);
    this.parcels = new Parcels(this.physics.world, this);
    this.parcels.spawn();
    this.gnomes = new Gnomes(this.physics.world, this);

    this.player = new Player(this, 700, 100, TEXTURES.PLAYER, 8);
    this.player.setScale(3);
    this.player.play(ANIMATIONS.PLAYER_WALK);

    this.bullets = new Bullets(this);

    this._addSpawnParcelTimer(1000);
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        // reduce spawn delay over time
        const delay =
          this.spawnParcelTimer.delay +
          0.1 * (100 - this.spawnParcelTimer.delay);
        this._addSpawnParcelTimer(delay);
      },
      loop: true,
    });
    this._addSpawnGnomeTimer(3000);

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
    this.soundGunEmpty = this.sound.add(AUDIO.GUN_EMPTY);
    this.soundGnomeMageHit = this.sound.add(AUDIO.GNOME_MAGE_HIT);

    // text
    this.scoreText = this.add.text(400, 43, `${this.score}`, {
      fontFamily: 'BitPotion',
      fontSize: '35px',
      color: '0x222222',
    });
  }

  update(): void {
    this._movePlayer();

    if (
      Phaser.Input.Keyboard.JustDown(this.keyE) ||
      Phaser.Input.Keyboard.JustDown(this.keyQ)
    ) {
      const shootLeft = this.player.flipX ? false : true;

      if (
        this.bullets.fireBullet(this.player.x, this.player.y + 10, shootLeft)
      ) {
        this.soundShoot.play();
        this.player.x = shootLeft ? this.player.x + 5 : this.player.x - 5;
      } else {
        this.soundGunEmpty.play();
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
    // game over
    if (this.loadingBar.checkFull()) {
      this._gameOver();
    }
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _addSpawnParcelTimer(delay) {
    if (this.spawnParcelTimer) {
      this.spawnParcelTimer.destroy();
    }
    this.spawnParcelTimer = this.time.addEvent({
      delay: delay,
      callback: () => {
        this.parcels.spawn();
      },
      loop: true,
    });
  }

  _addSpawnGnomeTimer(delay) {
    if (this.spawnGnomeTimer) {
      this.spawnGnomeTimer.destroy();
    }
    this.spawnGnomeTimer = this.time.addEvent({
      delay: delay,
      callback: () => {
        this.gnomes.spawn();
      },
      loop: true,
    });
  }

  _addCollider() {
    this.physics.add.collider(
      this.bullets,
      this.parcels,
      this._onCollisionBulletParcel,
      null,
      this,
    );
    this.physics.add.collider(
      this.parcels,
      this.parcels,
      this._onCollisionParcelParcel,
      null,
      this,
    );
    this.physics.add.collider(
      this.bullets,
      this.gnomes,
      this._onCollisionBulletGnome,
      null,
      this,
    );
  }

  _onCollisionBulletParcel(
    bullet: Phaser.Physics.Arcade.Sprite,
    parcel: Parcel,
  ) {
    if (bullet.active && parcel.active) {
      this.soundExplode.play();
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.body.enable = false;

      this._parcelExplode(parcel);
      this._updateScore(50);
    }
  }

  _onCollisionParcelParcel(parcel1: Parcel, parcel2: Parcel) {
    if (parcel1.active && parcel2.active) {
      if (parcel2.anims.isPlaying == false && parcel1.anims.isPlaying == true) {
        this.soundExplode.play();
        this._parcelExplode(parcel2);
        this._updateScore(50);
      } else if (
        parcel1.anims.isPlaying == false &&
        parcel2.anims.isPlaying == true
      ) {
        this.soundExplode.play();
        this._parcelExplode(parcel1);
        this._updateScore(50);
      }
    }
  }

  _onCollisionBulletGnome(
    bullet: Phaser.Physics.Arcade.Sprite,
    gnome: Phaser.Physics.Arcade.Sprite,
  ) {
    if (bullet.active && gnome.active) {
      this.soundGnomeMageHit.play();
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.body.enable = false;

      this.loadingBar.addProgress(0.05);
      this._updateScore(-100);

      gnome.setVelocity(0);
      gnome.play(ANIMATIONS.GNOME_DIE);
      gnome.on('animationcomplete', () => {
        gnome.destroy();
      });
    }
  }

  _parcelExplode(parcel: Parcel) {
    parcel.exploding = true;
    switch (parcel.texture.key) {
      case TEXTURES.PARCEL:
        parcel.play(ANIMATIONS.PARCEL_EXPLODE);
        break;
      case TEXTURES.PARCEL_SPECIAL:
        parcel.play(ANIMATIONS.PARCEL_SPECIAL_EXPLODE);
        break;
      case TEXTURES.PARCEL_AGGRO:
        parcel.play(ANIMATIONS.PARCEL_AGGRO_EXPLODE);
        break;
      case TEXTURES.PARCEL_DANGER:
        parcel.play(ANIMATIONS.PARCEL_DANGER_EXPLODE);
        break;
    }
    parcel.on('animationcomplete', () => {
      parcel.destroy();
    });
  }

  _createAnimations() {
    this.anims.create({
      key: ANIMATIONS.PLAYER_WALK,
      frames: this.anims.generateFrameNumbers(TEXTURES.PLAYER, {
        start: 8,
        end: 9,
      }),
      frameRate: 5,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.GNOME_WALK,
      frames: this.anims.generateFrameNumbers(TEXTURES.GNOME_MAGE, {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.GNOME_DIE,
      frames: this.anims.generateFrameNumbers(TEXTURES.GNOME_MAGE, {
        start: 3,
        end: 11,
      }),
      frameRate: 8,
      repeat: 0, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.PARCEL_EXPLODE,
      frames: this.anims.generateFrameNumbers(TEXTURES.PARCEL, {
        start: 1,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.PARCEL_AGGRO_EXPLODE,
      frames: this.anims.generateFrameNumbers(TEXTURES.PARCEL_AGGRO, {
        start: 1,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.PARCEL_DANGER_EXPLODE,
      frames: this.anims.generateFrameNumbers(TEXTURES.PARCEL_DANGER, {
        start: 1,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0, // -1: infinity
    });
    this.anims.create({
      key: ANIMATIONS.PARCEL_SPECIAL_EXPLODE,
      frames: this.anims.generateFrameNumbers(TEXTURES.PARCEL_SPECIAL, {
        start: 1,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0, // -1: infinity
    });
  }

  _createControls() {
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyCursors = this.input.keyboard.createCursorKeys();
  }

  _movePlayer() {
    this.player.setVelocity(0);

    // player movement as vector to ensure same speed diagonally
    const playerDirection = new Phaser.Math.Vector2(0, 0);
    if (this.keyA.isDown || this.keyCursors.left.isDown) {
      playerDirection.x -= 1;
      this.player.flipX = false;
    } else if (this.keyD.isDown || this.keyCursors.right.isDown) {
      playerDirection.x += 1;
      this.player.flipX = true;
    }
    if (this.keyW.isDown || this.keyCursors.up.isDown) {
      playerDirection.y -= 1;
    } else if (this.keyS.isDown || this.keyCursors.down.isDown) {
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

  _gameOver() {
    this.scene.pause();
    this.music_loop.stop();
    this.saveGame.addItem(this.score);
    this.scene.start(SCENES.GAMEOVER, { score: this.score });
  }
}
