import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';

export default class SceneMenu extends Phaser.Scene {
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
    this.add.image(0, 0, TEXTURES.MENU_BG).setOrigin(0, 0).setScale(8);
    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 120, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '92px',
      })
      .setOrigin(0.5);
    this._createButton(220, 220, TEXTURES.ICON_EXE, 'game.exe', SCENES.GAME);
    this._createButton(300, 230, TEXTURES.ICON_FILE, 'game.bin');
    this._createButton(500, 230, TEXTURES.ICON_TXT, 'highscore.txt');

    this._createButton(200, 350, TEXTURES.ICON_DIR, 'GameJam');

    this._createButton(600, 420, TEXTURES.ICON_TRASH, 'Trash');
    this._createButton(400, 420, TEXTURES.ICON_TXT, 'credits.txt');
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
    const button = this.add.sprite(nX, nY, sTextureKey, 0).setOrigin(0.5);
    button.setScale(4);

    if (sStartScene) {
      button.setInteractive({ useHandCursor: true });

      button.on('pointerover', () => {
        this.tweens.add({
          targets: button,
          angle: button.angle + 5,
          duration: 300,
          ease: 'Power2',
          yoyo: true,
        });
      });
      button.on('pointerout', () => {});
      button.on('pointerdown', () => {
        this.scene.start(sStartScene);
      });
    }

    this.add
      .text(nX, nY + 32, sText, {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '32px',
      })
      .setOrigin(0.5);

    return button;
  }
}
