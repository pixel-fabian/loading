import 'phaser';
import SCENES from '../constants/SceneKeys';
import LoadingBar from '../objects/loadingBar';

export default class SceneGame extends Phaser.Scene {
  private loadingBar: LoadingBar;

  constructor() {
    super({
      key: SCENES.GAME,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.loadingBar = new LoadingBar(this);
  }

  update(): void {
    this.loadingBar.addProgress(0.01);
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
