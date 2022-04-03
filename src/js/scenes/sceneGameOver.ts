import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Window from '../objects/window';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.GAMEOVER,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.image(0, 0, TEXTURES.MENU_BG).setOrigin(0, 0).setScale(8);
    new Window(this, 'Awesome game', {}, SCENES.MENU);
    // add text
    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 200, 'Loading complete', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '48px',
      })
      .setOrigin(0.5);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
