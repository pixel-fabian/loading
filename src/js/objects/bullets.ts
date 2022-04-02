import TEXTURES from '../constants/TextureKeys';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  private velocity: 20;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      key: TEXTURES.BULLET,
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y) {
    // Get the first available sprite in the group
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y);
    }
  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, TEXTURES.BULLET);
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(-300);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.x <= -32) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
