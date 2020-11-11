
import Background from './background.js';

export default class Scene {
  constructor() {
    this._container = new PIXI.Container();
    this.BG = new Background(this._container);
  }
};