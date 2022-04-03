export default class Button extends Phaser.GameObjects.Sprite {
  private text: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    scale?: number,
    text?: string,
    callback?: Function,
    callbackParam?,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);

    if (scale) {
      this.setScale(scale);
    }
    if (text) {
      this.addText(text);
    }
    if (callback && callbackParam) {
      this.addInteraction(callback, callbackParam);
    }
  }

  addText(text: string) {
    this.text = this.scene.add
      .text(this.x, this.y + 32, text, {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '32px',
      })
      .setOrigin(0.5);
  }

  addInteraction(callback, callbackParam) {
    this.setInteractive({ useHandCursor: true });
    this.on('pointerover', () => {
      this.scene.tweens.add({
        targets: this,
        angle: this.angle + 5,
        duration: 300,
        ease: 'Bounce.easeInOut',
        yoyo: true,
      });
    });
    this.on('pointerout', () => {});
    this.on('pointerdown', () => {
      callback(callbackParam);
    });
  }
}
