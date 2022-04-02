import TEXTURES from '../constants/TextureKeys';

export default class Parcels extends Phaser.Physics.Arcade.Group {
  private velocity = 50;
  private textures?: Array<string>;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
    scene.add.existing(this);
  }

  spawn() {
    const parcel: Phaser.Physics.Arcade.Sprite = this.create(
      -20,
      this.getRandomY(),
      TEXTURES.PARCEL,
    );
    parcel.setScale(3);
    parcel.setVelocityX(this.velocity);
  }

  getRandomY() {
    return Phaser.Math.Between(0, this.scene.scale.height);
  }
}
