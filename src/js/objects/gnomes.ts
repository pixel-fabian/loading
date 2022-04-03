import TEXTURES from '../constants/TextureKeys';
import ANIMATIONS from '../constants/AnimationKeys';

export default class Gnomes extends Phaser.Physics.Arcade.Group {
  private velocity = 100;
  private texture = TEXTURES.GNOME_MAGE;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
    scene.add.existing(this);
  }

  spawn() {
    const gnome: Phaser.Physics.Arcade.Sprite = this.create(
      -20,
      this._getRandomY(),
      this.texture,
    );
    gnome.setScale(2);
    gnome.flipX = true;
    gnome.body.setSize(12, 16);
    gnome.setVelocityX(
      Phaser.Math.Between(this.velocity - 20, this.velocity + 20),
    );
    gnome.play(ANIMATIONS.GNOME_WALK);
  }

  reachedGoal() {
    let collision = false;
    this.getChildren().forEach((gnome: Phaser.Physics.Arcade.Sprite) => {
      if (gnome.active && gnome.x > this.scene.scale.width) {
        gnome.destroy();
        collision = true;
      }
    });

    return collision;
  }

  _getRandomY() {
    return Phaser.Math.Between(20, this.scene.scale.height - 20);
  }
}
