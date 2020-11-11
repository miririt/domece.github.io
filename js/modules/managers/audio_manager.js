
HTMLAudioElement.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
};

HTMLAudioElement.prototype.replay = function() {
  this.stop();
  this.play();
};

export default class AudioManager {
  static _cachedIdx = {};
  static _cachedAudio = [];

  static load(src) {
    if(this._cachedIdx[src]) {
      return this._cachedAudio[this._cachedIdx[src]];
    }

    const audioObj = new Audio(src);
    const idx = this._cachedAudio.length;

    this._cachedIdx[src] = idx;
    this._cachedAudio.push(audioObj);

    return audioObj;
  }
};

AudioManager.BGM = class {
  static _bgmList = [];
  static _currentIdx = [];
  static _shuffle = false;

  static load(srcList, options = { startsWith: 0, shuffle: false }) {
    this.stop();

    this._bgmList = srcList ? srcList.map(bgmSrc => AudioManager.load(bgmSrc)) : this._bgmList;
    this._currentIdx = options.startsWith;
    this._shuffle = options.shuffle;
    
    this.play();
  }

  static _getCurrent() {
    return this._bgmList[this._currentIdx];
  }

  static go(newIdx) {
    this.stop();
    this._currentIdx = newIdx;
    this.play();
  }

  static next(step = 1) {
    if(this._currentIdx + step > this._bgmList.length && this._shuffle) {
      // shuffles bgm list
      for(let i = this._bgmList.length; i > 0; i--) {
        const swapWith = Math.floor(Math.random() * (i + 1));
        [this._bgmList[i], this._bgmList[j]] = [this._bgmList[j], this._bgmList[i]];
      }
    }
    this.go((this._currentIdx + step) % this._bgmList.length);
  }
  
  static play() {
    if(!this._getCurrent()) return new Promise(function(resolve, reject) { reject('BGM is not loaded'); });
    this._getCurrent().onended = (function() {
        this.next();
    }).bind(this);
    return this._getCurrent()?.play();
  }
  
  static pause() {
    this._getCurrent()?.pause();
  }
  
  static stop() {
    this._getCurrent()?.stop();
  }
};

AudioManager.SFX = class {
  static _sfxList = {};
  static play(src) {
    if(this._sfxList[src]) {
      this._sfxList[src].replay();
    } else {
      const sfxAudio = AudioManager.load(src);
      sfxAudio.onended = (function() {
        delete _sfxList[src];
      }).bind(this);
      sfxAudio.play();
    }
  }
};