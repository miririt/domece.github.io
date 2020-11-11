
import GameManager from './game_manager.js';

export default class SceneManager {
  static _sceneStack = [];
  static _currentScene = null;
  static _currentTickers = [];

  static _updateStage() {
    const newScene = this._sceneStack[this._sceneStack.length - 1];
    
    // update container object
    GameManager.app.stage.removeChild(this._currentScene._container);
    GameManager.app.stage.addChild(newScene._container);

    // update tickers
    this._currentTickers.forEach(ticker => {
      GameManager.app.ticker.remove(ticker);
    });

    this._currentTickers = [
      newScene.BG.ticker
    ];

    this._currentTickers.forEach(ticker => {
      GameManager.app.ticker.add(ticker);
    });
  }

  static pushScene(targetScene) {
    // check if target scene is already exists
    if(this._sceneStack.includes(targetScene))
      return false;
    
    // or push target scene into stack.
    this._currentScene = targetScene;
    this._sceneStack.push(targetScene);
    this._updateStage();
    return true;
  }

  static popScene() {
    // pops scene stack and returns it.
    const targetScene = _this._sceneStack.pop();
    this._updateStage();

    return targetScene;
  }

  static setScene(targetScene) {
    // clear all scenes in stack and shows target scene.
    this._currentScene = targetScene;
    this._sceneStack = [targetScene];
    this._updateStage();

    return true;
  }
};