import TEXTURES from '../constants/TextureKeys';

export default class Parcels extends Phaser.Physics.Arcade.Group {
  private velocity = 100;
  private textures = [
    TEXTURES.PARCEL,
    TEXTURES.PARCEL_AGGRO,
    TEXTURES.PARCEL_DANGER,
    TEXTURES.PARCEL_SPECIAL,
  ];

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
    scene.add.existing(this);
  }

  spawn() {
    const texture = this.textures[Phaser.Math.Between(0, 3)];
    const parcel: Phaser.Physics.Arcade.Sprite = this.create(
      -20,
      this._getRandomY(),
      texture,
    );
    parcel.setScale(3);
    switch (texture) {
      case TEXTURES.PARCEL:
      case TEXTURES.PARCEL_SPECIAL:
        parcel.body.setSize(10, 10);
        break;
      case TEXTURES.PARCEL_AGGRO:
      case TEXTURES.PARCEL_DANGER:
        parcel.body.setSize(8, 8);
        break;
    }

    parcel.setVelocityX(
      Phaser.Math.Between(this.velocity - 20, this.velocity + 20),
    );
  }

  reachedGoal() {
    let collision = false;
    this.getChildren().forEach((parcel: Phaser.Physics.Arcade.Sprite) => {
      if (parcel.active && parcel.x > this.scene.scale.width) {
        parcel.destroy();
        collision = true;
      }
    });

    return collision;
  }

  _getRandomY() {
    return Phaser.Math.Between(20, this.scene.scale.height - 20);
  }
}
