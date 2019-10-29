import * as PIXI from 'pixi.js';
import Pipe from './Pipe';
import config from './utils/config';

export default class PipesController extends PIXI.Container {
  constructor(pipeTexture) {
    super();
    this.pipeTexture = pipeTexture;
    this.pipesAhead = [];
  }

  spawnPipes() {
    const pipeTop = new Pipe(this.pipeTexture, true);
    const pipeBottom = new Pipe(this.pipeTexture);
    pipeTop.once('pipe-out', () => {
      this.spawnPipes();
    });

    pipeTop.once('score', () => {
      const index = this.pipesAhead.indexOf(pipeTop);
      this.pipesAhead.splice(index, 1);
      this.emit('score');
    });

    pipeBottom.once('score', () => {
      const index = this.pipesAhead.indexOf(pipeBottom);
      this.pipesAhead.splice(index, 1);
    });


    const pipeHeight = pipeTop.getBounds().height;
    const minY = -pipeHeight / 2;
    const randomY = (Math.floor(Math.random() * minY) - 1) - 112; // This is the base height , move it to config
    const pipeDownY = Math.abs(randomY + pipeHeight) + config.pipeGap;

    pipeTop.setY(randomY);
    pipeBottom.setY(pipeDownY);

    this.addChild(pipeBottom, pipeTop);
    this.pipesAhead.push(pipeBottom, pipeTop);
  }

  movePipes() {
    this.children.forEach(pipe => pipe.move());
  }

}