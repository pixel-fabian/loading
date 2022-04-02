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
    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 80, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '92px',
      })
      .setOrigin(0.5);
    this._createTextButton(screenCenterX, 200, '< play >', SCENES.GAME);
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
}
