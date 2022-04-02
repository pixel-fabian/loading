export default class LoadingBar {
  private progress = 0;
  private scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Graphics;
  private foreground: Phaser.GameObjects.Graphics;

  constructor(scene) {
    this.scene = scene;
    this.background = this.scene.add.graphics({
      fillStyle: {
        color: 0x222222,
      },
    });
    this.background.fillRect(10, 490, 780, 100);
    this.foreground = this.scene.add.graphics({
      fillStyle: {
        color: 0xcccccc,
      },
    });
    const screenCenterX = this.scene.scale.width / 2;
    this.text = this.scene.add
      .text(screenCenterX, 530, 'Loading...', {
        fontFamily: 'BitPotion',
        color: '#fff',
        fontSize: '92px',
      })
      .setOrigin(0.5);
    this.text.flipX = true;
  }

  addProgress(percent: number) {
    this.progress = this.progress + percent;
    this.foreground.fillRect(785, 495, -770 * this.progress, 90);
  }
}
