import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';

export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.LOAD,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {
    // add text
    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 225, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '28px',
      })
      .setOrigin(0.5);
    // create loading bar
    const loadingBar = this._createLoadingBar();
    this.load.on('progress', (nPercentage) => {
      loadingBar.fillRect(255, 255, 290 * nPercentage, 20);
    });

    // load all textures
    this.load.image(TEXTURES.HUMAN, 'assets/sprites/human.png');
    this.load.image(TEXTURES.HUMAN_WINK, 'assets/sprites/human_wink.png');
    this.load.image(TEXTURES.HUMAN_SMILE, 'assets/sprites/human_smile.png');
    this.load.image(
      TEXTURES.HUMAN_SMILE_WINK,
      'assets/sprites/human_smile_wink.png',
    );
    this.load.image(TEXTURES.MENU_BG, 'assets/sprites/menu.png');

    this.load.spritesheet(
      TEXTURES.GNOME_MAGE,
      'assets/sprites/gnome_mage.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(TEXTURES.ICON_DIR, 'assets/sprites/icon_dir.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(TEXTURES.ICON_EXE, 'assets/sprites/icon_exe.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(TEXTURES.ICON_FILE, 'assets/sprites/icon_file.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(
      TEXTURES.ICON_TRASH,
      'assets/sprites/icon_trash.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(TEXTURES.ICON_TXT, 'assets/sprites/icon_txt.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet(TEXTURES.BULLET, 'assets/sprites/bullet.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(TEXTURES.PARCEL, 'assets/sprites/parcel_normal.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(
      TEXTURES.PARCEL_AGGRO,
      'assets/sprites/parcel_aggro.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(
      TEXTURES.PARCEL_DANGER,
      'assets/sprites/parcel_danger.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(
      TEXTURES.PARCEL_SPECIAL,
      'assets/sprites/parcel_special.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    this.load.spritesheet(TEXTURES.PLAYER, 'assets/sprites/gnome.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    // load audio
    this.load.audio(AUDIO.GNOME_MAGE_HIT, ['assets/sounds/gnome_mage_hit.wav']);
    this.load.audio(AUDIO.GUN_EMPTY, ['assets/sounds/gun_empty.wav']);
    this.load.audio(AUDIO.EXPLODE, ['assets/sounds/parcel_explode.wav']);
    this.load.audio(AUDIO.PARCEL_1, ['assets/sounds/parcel1.wav']);
    this.load.audio(AUDIO.PARCEL_2, ['assets/sounds/parcel2.wav']);
    this.load.audio(AUDIO.PARCEL_3, ['assets/sounds/parcel3.wav']);
    this.load.audio(AUDIO.PARCEL_4, ['assets/sounds/parcel4.wav']);
    this.load.audio(AUDIO.SHOOT, ['assets/sounds/bass_shot.wav']);
    this.load.audio(AUDIO.MUSIC_INTRO, ['assets/sounds/loading_intro.mp3']);
    this.load.audio(AUDIO.MUSIC_LOOP, ['assets/sounds/loading_loop.mp3']);
  }

  create(): void {
    this.scene.start(SCENES.MENU);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createLoadingBar() {
    const loadingBg = this.add.graphics({
      fillStyle: {
        color: 0x222222,
      },
    });
    loadingBg.fillRect(250, 250, 300, 30);
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xcccccc,
      },
    });
    return loadingBar;
  }
}
