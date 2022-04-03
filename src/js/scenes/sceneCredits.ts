import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Window from '../objects/window';

export default class SceneCredits extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.CREDITS,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.image(0, 0, TEXTURES.MENU_BG).setOrigin(0, 0).setScale(8);
    new Window(this, 'credits.txt', {}, SCENES.MENU);

    // add text
    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 200, 'A Game by: lupercalia & pixel-fabian', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '28px',
      })
      .setOrigin(0.5);
    this.add
      .text(screenCenterX, 250, 'Game engine: Phaser 3 by PhotonStorm', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '28px',
      })
      .setOrigin(0.5);
    this.add
      .text(screenCenterX, 300, 'Font: BitPotion by Joeb Rogers (CC-BY)', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '28px',
      })
      .setOrigin(0.5);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
