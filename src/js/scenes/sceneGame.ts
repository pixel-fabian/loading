import 'phaser';
import SCENES from '../constants/SceneKeys';
export default class SceneGame extends Phaser.Scene {
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
    const loadingBg = this.add.graphics({
      fillStyle: {
        color: 0x222222,
      },
    });
    loadingBg.fillRect(10, 490, 780, 100);
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xcccccc,
      },
    });
    loadingBar.fillRect(15, 495, 770 * 1, 90);
    const screenCenterX = this.scale.width / 2;
    const loadingText = this.add
      .text(screenCenterX, 530, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '92px',
      })
      .setOrigin(0.5);
    loadingText.flipX = true;
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
