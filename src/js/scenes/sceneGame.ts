import 'phaser';
import SCENES from '../constants/SceneKeys';
import LoadingBar from '../objects/loadingBar';
import Parcels from '../objects/parcels';

export default class SceneGame extends Phaser.Scene {
  private loadingBar: LoadingBar;
  private parcels: Parcels;

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
    this.parcels = new Parcels(this.physics.world, this);
    this.parcels.spawn();
  }

  update(): void {
    //this.loadingBar.addProgress(0.01);
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
