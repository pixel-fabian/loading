export default class LoadingBar {
  private progress = 0;
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;
  private window: Phaser.GameObjects.Graphics;
  private windowBar: Phaser.GameObjects.Graphics;
  private windowText: Phaser.GameObjects.Text;
  private windowX: Phaser.GameObjects.Text;
  private loadingBarBg: Phaser.GameObjects.Graphics;
  private loadingBarFg: Phaser.GameObjects.Graphics;
  private targetWidth = -710;
  private width = 0;

  constructor(scene) {
    this.scene = scene;
    this._createWindow();
    this._createLoadingBar();
  }

  addProgress(percent: number) {
    this.progress = this.progress + percent;
    this.width = this.targetWidth * this.progress;
    this.loadingBarFg.clear();
    this.loadingBarFg.fillRect(745, 280, this.width, 90);
    this.loadingBarFg.setAlpha(0.2);
  }

  checkFull() {
    let full = false;
    if (this.width === this.targetWidth) {
      full = true;
    }
    return full;
  }

  _createWindow() {
    this.window = this.scene.add.graphics({
      fillStyle: {
        color: 0xdddddd,
      },
    });
    this.window.fillRect(10, 50, 780, 500);
    this.window.setAlpha(0.2);
    this.window.lineStyle(3, 0x222222, 1).strokeRect(10, 50, 780, 500);

    this.windowBar = this.scene.add.graphics({
      fillStyle: {
        color: 0x000000,
      },
    });
    this.windowBar.fillRect(10, 50, 780, 30);
    this.windowBar.setAlpha(0.2);

    this.windowText = this.scene.add
      .text(725, 60, 'Awesome game', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '24px',
      })
      .setOrigin(0.5)
      .setAlpha(0.2);
    this.windowText.flipX = true;

    this.windowX = this.scene.add
      .text(20, 60, 'X', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '24px',
      })
      .setOrigin(0.5)
      .setAlpha(0.2);
  }

  _createLoadingBar() {
    this.loadingBarBg = this.scene.add.graphics({
      fillStyle: {
        color: 0xbbbbbb,
      },
    });
    this.loadingBarBg.fillRect(30, 275, 720, 100);
    this.loadingBarBg.setAlpha(0.2);

    this.loadingBarFg = this.scene.add.graphics({
      fillStyle: {
        color: 0xee5533,
      },
    });
    this.loadingBarFg.setAlpha(0.2);

    const screenCenterX = this.scene.scale.width / 2;
    this.text = this.scene.add
      .text(screenCenterX, 315, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '92px',
      })
      .setOrigin(0.5);
    this.text.flipX = true;
  }
}
