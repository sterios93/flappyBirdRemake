import * as Pixi from 'pixi.js';

export default class ScoreBoard extends Pixi.Container {
  constructor() {
    super();
    this.score = 0;
    this._init();
  }

  _init() {
    this.scoreText = new Pixi.Text(this.score , { font: "35px Arial", align: "left" });
    this.addChild(this.scoreText);
  }

  updateScore() {
    this.score += 1;
    this.scoreText.text = this.score;
  }

  reset() {
    this.score = 0;
    this.scoreText.text = this.score;
  }
}