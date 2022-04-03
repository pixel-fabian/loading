export default class Button extends Phaser.GameObjects.Sprite {
  public text: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    text?: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);

    if (text) {
      this.addText(text);
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
}
