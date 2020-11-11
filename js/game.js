
import AudioManager from './modules/managers/audio_manager.js';
import GameManager from './modules/managers/game_manager.js';
import SceneManager from './modules/managers/scene_manager.js';

import Scene from './modules/classes/scene.js';

function init() {
  GameManager.init(window);

  const introScene = new Scene();
  
  introScene.BG.load([
    { 'src': 'img/Layer_0010_1.png', 'scrollSpeed': 0.1 },
    { 'src': 'img/Layer_0009_2.png', 'scrollSpeed': 0.2 },
    { 'src': 'img/Layer_0008_3.png', 'scrollSpeed': 0.3 },
    { 'src': 'img/Layer_0007_Lights.png', 'scrollSpeed': 0.4 },
    { 'src': 'img/Layer_0006_4.png', 'scrollSpeed': 0.5 },
    { 'src': 'img/Layer_0005_5.png', 'scrollSpeed': 0.6 },
    { 'src': 'img/Layer_0004_Lights.png', 'scrollSpeed': 0.7 },
    { 'src': 'img/Layer_0003_6.png', 'scrollSpeed': 0.8 },
    { 'src': 'img/Layer_0002_7.png', 'scrollSpeed': 0.9 },
    { 'src': 'img/Layer_0001_8.png', 'scrollSpeed': 0.10 },
    { 'src': 'img/Layer_0000_9.png', 'scrollSpeed': 0.11 }
  ]);

  SceneManager.pushScene(introScene);
}

setTimeout(function() {
  AudioManager.BGM.load(['sarabande.mp3']);
}, 5000);

window.addEventListener('load', init);