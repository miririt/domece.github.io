
import GameManager from './game_manager.js';

export default class ImageManager {
  static _cachedTextures = {};

  static loadTexture(src) {
    if(this._cachedTextures[src]) {
      return this._cachedTextures[src];
    }

    return (this._cachedTextures[src] = PIXI.Texture.from(src));
  }

  static getSprite(src) {
    return new PIXI.Sprite(this._cachedTextures[src]);
  }

  static getTilingSprite(src, width, height) {
    if(!width) width = GameManager.app.screen.width;
    if(!height) height = GameManager.app.screen.height;
    return new PIXI.TilingSprite(this._cachedTextures[src], width, height);
  }
};