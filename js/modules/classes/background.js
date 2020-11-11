
import GameManager from '../managers/game_manager.js';
import ImageManager from '../managers/image_manager.js';

export default class Background {
  constructor(stage) {
    this._bgList = [];
    this._stage = stage;

    this.ticker = this.ticker.bind(this);
  }
  
  load(bgList) {
    this._bgList = bgList.map(bg => {
      ImageManager.loadTexture(bg.src);

      const bgSprite = bg.scrollSpeed ? ImageManager.getTilingSprite(bg.src) : ImageManager.getSprite(bg.src);

      bgSprite.anchor.set(0.5);
      bgSprite.x = GameManager.app.screen.width / 2;
      bgSprite.y = GameManager.app.screen.height / 2;

      return {
        'src': bg.src,
        'sprite': bgSprite,
        'scrollSpeed': bg.scrollSpeed || 0
      };
    });

    this._bgList.forEach(bg => {
      this._stage.addChild(bg.sprite);
    });
  }

  ticker(delta) {
    this._bgList.forEach(bg => {
      if(bg.scrollSpeed)
        bg.sprite.tilePosition.x += bg.scrollSpeed;
    });
  };
};