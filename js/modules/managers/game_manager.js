export default class GameManager {
  static app = null;

  static init(gameWindow) {
    this.app = new PIXI.Application({ backgroundColor: 0xffffff, resizeTo: gameWindow });
    this.app.stage.interactive = true;

    gameWindow.document.body.appendChild(this.app.view);
  }
};