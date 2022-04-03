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

    this.kil;
  }

  fireBullet(x: number, y: number) {
    let fired = false;
    // Get the first available sprite in the group
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y);
      fired = true;
    }
    return fired;
  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURES.BULLET);
  }

  fire(x: number, y: number) {
    this.body.reset(x, y);
    this.body.enable = true;
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
