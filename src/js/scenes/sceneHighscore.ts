import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import Window from '../objects/window';
import SaveGame from '../objects/saveGame';

export default class SceneHighscore extends Phaser.Scene {
  private saveGame: SaveGame;

  constructor() {
    super({
      key: SCENES.HIGHSCORE,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {
    this.saveGame = new SaveGame();
  }

  preload(): void {}

  create(): void {
    this.add.image(0, 0, TEXTURES.MENU_BG).setOrigin(0, 0).setScale(8);
    new Window(this, 'Highscore.txt', {}, SCENES.MENU);

    const screenCenterX = this.scale.width / 2;
    this.add
      .text(screenCenterX, 180, 'Top 5', {
        fontFamily: 'BitPotion',
        color: '#000',
        fontSize: '58px',
      })
      .setOrigin(0.5);
    const aHighscores = this.saveGame.getItems();
    let y = 250;
    aHighscores.forEach((score) => {
      // add text
      this.add
        .text(screenCenterX, y, `${score}`, {
          fontFamily: 'BitPotion',
          color: '#000',
          fontSize: '34px',
        })
        .setOrigin(0.5);
      y += 30;
    });

    // add gnome
    this.add.sprite(630, 460, TEXTURES.GNOME_MAGE, 4).setScale(3);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
