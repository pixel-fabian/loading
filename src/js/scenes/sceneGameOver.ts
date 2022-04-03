import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Window from '../objects/window';

export default class SceneGameOver extends Phaser.Scene {
  private startButton;
  private score = 0;

  constructor() {
    super({
      key: SCENES.GAMEOVER,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(data): void {
    if (data.score) {
      this.score = data.score;
    }
  }

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
        fontSize: '36px',
      })
      .setOrigin(0.5);
    this.add
      .text(screenCenterX, 250, `${this.score}`, {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '36px',
      })
      .setOrigin(0.5);

    this.startButton = this.add
      .text(screenCenterX, 350, '< start game >', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '64px',
      })
      .setOrigin(0.5);
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on('pointerdown', () => {
      this.scene.start(SCENES.GAME, {});
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
