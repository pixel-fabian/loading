export default class Window {
  private scene: Phaser.Scene;
  private window: Phaser.GameObjects.Graphics;
  private windowBar: Phaser.GameObjects.Graphics;
  private windowText: Phaser.GameObjects.Text;
  private windowX: Phaser.GameObjects.Text;

  private windowOptions = {
    alpha: 0.5,
    flipX: false,
    x: 100,
    y: 100,
    width: 580,
    height: 400,
  };

  constructor(scene, text, windowOptions = {}, sceneOnClose) {
    this.scene = scene;
    this.windowOptions = Object.assign(this.windowOptions, windowOptions);

    this._createWindow(text, sceneOnClose);
  }

  _createWindow(text, sceneOnClose) {
    this.window = this.scene.add.graphics({
      fillStyle: {
        color: 0xdddddd,
      },
    });
    this.window.fillRect(
      this.windowOptions.x,
      this.windowOptions.y,
      this.windowOptions.width,
      this.windowOptions.height,
    );
    this.window.setAlpha(this.windowOptions.alpha);
    this.window
      .lineStyle(3, 0x222222, 1)
      .strokeRect(
        this.windowOptions.x,
        this.windowOptions.y,
        this.windowOptions.width,
        this.windowOptions.height,
      );

    this.windowBar = this.scene.add.graphics({
      fillStyle: {
        color: 0x000000,
      },
    });
    this.windowBar.fillRect(
      this.windowOptions.x,
      this.windowOptions.y,
      this.windowOptions.width,
      30,
    );
    this.windowBar.setAlpha(this.windowOptions.alpha);

    this.windowText = this.scene.add
      .text(this.windowOptions.x + 5, this.windowOptions.y, text, {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '24px',
      })
      .setOrigin(0, 0);
    this.windowText.flipX = this.windowOptions.flipX;

    this.windowX = this.scene.add
      .text(
        this.windowOptions.x + this.windowOptions.width - 5,
        this.windowOptions.y,
        'X',
        {
          fontFamily: 'BitPotion',
          color: '#000',
          fontSize: '24px',
        },
      )
      .setOrigin(1, 0);

    if (sceneOnClose) {
      this.windowX.setInteractive({ useHandCursor: true });
      this.windowX.on('pointerdown', () => {
        this.scene.scene.start(sceneOnClose, {});
      });
    }
  }
}
