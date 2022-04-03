import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Button from '../objects/button';

export default class SceneMenu extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private titleText;
  private buttonGame;
  private buttonGameBin;
  private buttonHighscore;
  private buttonGameJam;
  private buttonTrash;
  private buttonCredits;

  constructor() {
    super({
      key: SCENES.MENU,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    const screenCenterX = this.scale.width / 2;
    const screenCenterY = this.scale.height / 2;
    this.background = this.add
      .image(screenCenterX, screenCenterY, TEXTURES.MENU_BG)
      .setOrigin(0.5)
      .setScale(8);

    this.titleText = this.add
      .text(screenCenterX, 120, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '92px',
      })
      .setOrigin(0.5);

    this.buttonGame = this._createButton(
      220,
      220,
      TEXTURES.ICON_EXE,
      'game.exe',
      SCENES.GAME,
    );
    this.buttonGameBin = this._createButton(
      300,
      230,
      TEXTURES.ICON_FILE,
      'game.bin',
    );
    this.buttonHighscore = this._createButton(
      500,
      230,
      TEXTURES.ICON_TXT,
      'highscore.txt',
      SCENES.HIGHSCORE,
    );
    this.buttonGameJam = this._createButton(
      200,
      350,
      TEXTURES.ICON_DIR,
      'GameJam',
    );
    this.buttonTrash = this._createButton(
      600,
      420,
      TEXTURES.ICON_TRASH,
      'Trash',
    );
    this.buttonCredits = this._createButton(
      400,
      420,
      TEXTURES.ICON_TXT,
      'credits.txt',
      SCENES.CREDITS,
    );
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createTextButton(
    nX: number,
    nY: number,
    sText: string,
    sStartScene: SCENES,
  ) {
    const text = this.add
      .text(nX, nY, sText, {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '42px',
      })
      .setOrigin(0.5);
    text.setInteractive({ useHandCursor: true });
    text.on('pointerover', () => {
      text.setColor('#eee');
    });
    text.on('pointerout', () => {
      text.setColor('#fff');
    });
    text.on('pointerdown', () => {
      this.scene.start(sStartScene, {});
    });
  }

  _createButton(
    nX: number,
    nY: number,
    sTextureKey: TEXTURES,
    sText: string,
    sStartScene?: SCENES,
  ) {
    const button = new Button(this, nX, nY, sTextureKey, sText, 0).setOrigin(
      0.5,
    );
    button.setScale(4);

    if (sStartScene) {
      button.setInteractive({ useHandCursor: true });

      button.on('pointerover', () => {
        this.tweens.add({
          targets: button,
          angle: button.angle + 5,
          duration: 300,
          ease: 'Bounce.easeInOut',
          yoyo: true,
        });
      });
      button.on('pointerout', () => {});
      button.on('pointerdown', () => {
        this._startScene(sStartScene);
      });
    }

    return button;
  }

  _startScene(sStartScene) {
    if (sStartScene == SCENES.GAME) {
      // buttons
      const buttons = [
        this.buttonGame,
        this.buttonGameBin,
        this.buttonHighscore,
        this.buttonGameJam,
        this.buttonTrash,
        this.buttonCredits,
      ];
      buttons.forEach((button) => {
        button.setVisible(false);
        button.text.setVisible(false);
      });
      // Loading Text
      this.tweens.add({
        targets: this.titleText,
        scaleX: 0,
        duration: 600,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.titleText.flipX = true;
          this.tweens.add({
            targets: this.titleText,
            scaleX: 1,
            duration: 600,
            ease: 'Sine.easeInOut',
          });
        },
      });
      // Background
      this.tweens.add({
        targets: this.background,
        scaleX: 0,
        duration: 600,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.background.flipX = true;
          this.cameras.main.zoomTo(1.3, 600, 'Sine.easeOut');
          this.tweens.add({
            targets: this.background,
            scaleX: 8,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
              this.scene.start(sStartScene);
            },
          });
        },
      });
    } else {
      this.scene.start(sStartScene);
    }
  }
}
