import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Window from '../objects/window';

export default class SceneHighscore extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.HIGHSCORE,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.image(0, 0, TEXTURES.MENU_BG).setOrigin(0, 0).setScale(8);
    new Window(this, 'Highscore.txt', {}, SCENES.MENU);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
