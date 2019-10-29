import * as PIXI from 'pixi.js';
import config from './utils/config';

export default class Pipe extends PIXI.Sprite {
  constructor(texture, flip = false) {
    super(texture);
    this.flipped = flip;
    this._init();
    const birdInitPos = config.canvasWidth / 3;
    const birdWitdh = 34;
    this.scorePos = birdInitPos - (this.getBounds().width + (birdWitdh / 2));
  }

  _init() {
    this.flipped && this._flip();
    this._setX();
  }

  _flip() {
    this.anchor.set(0, 1);
    this.scale.y = -1;
  }

  _setX() {
    this.x = config.canvasWidth;
  }

  move() {
    this.x = this.x - config.pipeSpeed;
    if (this.x < 0 - this.getBounds().width) {
      return this.destroy();
    }
    if (this.x < config.canvasWidth / 2) {
      this.emit('pipe-out', this);
    }
    if (this.x < this.scorePos) {
      this.emit('score');
    }
  }

  setY(y) {
    this.y = y;
  }
}