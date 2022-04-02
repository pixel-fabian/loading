import TEXTURES from '../constants/TextureKeys';

export default class Parcels extends Phaser.Physics.Arcade.Group {
  private velocity: 20;
  private textures?: Array<string>;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
    scene.add.existing(this);
  }

  spawn() {
    const parcel: Phaser.Physics.Arcade.Sprite = this.create(
      100,
      400,
      TEXTURES.PARCEL,
    );
    parcel.setCollideWorldBounds(true);
    parcel.setScale(3);
    parcel.setVelocityX(50);
  }
}
