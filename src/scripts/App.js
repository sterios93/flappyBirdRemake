import * as PIXI from 'pixi.js';
import Loader from './ImageLoader';
import manifest from '../assets-manifest';
import SoundLoader from './SoundsLoader';
import PipesController from './PipesController';
import Bird from './Bird.js';
import ScoreBoard from './ScoreBoard';
import config from './utils/config';

export default class App extends PIXI.Application {
	constructor() {
		super({ width:config.canvasWidth, height:config.canvasHeight });
	}

	init() {
		this.imagesLoader = new Loader();
		this.soundsLoader = new SoundLoader();
	}

	async preload() {
		this.images = await this.imagesLoader.loadAssets(manifest.images);
		this.sounds = await this.soundsLoader.loadSounds(manifest.sounds);
	}

	createField() {
		this._createBackground();
		this._initPipes();
		this._createGround();
		this._createBird();
		this._createScoreBoard();
		this.ticker.add(() => {
			this.bird.applyGravity();
			this.pipesController.movePipes();
			this._collisionDetection();
		});
	}

	_initPipes() {
		const pipeTexture = this.images.pipeGreen.texture;
		this.pipesController = new PipesController(pipeTexture);
		this.pipesController.on('score', () => this.counter.updateScore());
		this.stage.addChild(this.pipesController);
		this.pipesController.spawnPipes();
	}

	_createGround() {
		const texture = this.images.base.texture;
		this.base = new PIXI.Sprite(texture);
		const canvasHeight = this.view.offsetHeight;
		const baseHeight = this.base.getBounds().height;
		this.base.y = canvasHeight - baseHeight;
		this.stage.addChild(this.base);
	}

	_createBackground() {
		const texture = this.images.backgroundDay.texture;
		const bg = new PIXI.Sprite(texture);
		this.stage.addChild(bg);
	}

	_createBird() {
		const birdTextures = Object.keys(this.images).reduce((result, current) => {
			const isBirdTexture = this.images[current].name.includes('bird');
			if (isBirdTexture) {
				const texture = this.images[current];
				result[texture.name] = texture;
				} 

				return result;
		}, []);

		this.bird = new Bird(birdTextures, 'blue');
		this.stage.addChild(this.bird.anim);
	}

	_createScoreBoard() {
		this.counter = new ScoreBoard();
		this.stage.addChild(this.counter);
	}

	_collisionDetection() {
		const birdPos = this.bird.anim.getBounds();
		const groundPos = this.base.getBounds();
		const hitBase = birdPos.bottom > groundPos.top;
		if (hitBase) return this.ticker.stop();

		this.pipesController.pipesAhead.forEach((pipe) => {
			const { bottom, left, top } = pipe.getBounds();
			const hitPipeLeft = birdPos.right > left;

			if (pipe.flipped) {
				const hitPipeBottom = birdPos.y < bottom;
				const hitPipe = hitPipeLeft && hitPipeBottom; 
				if (hitPipe) 	this.ticker.stop();
			} else {
				const hitPipeTop = birdPos.y + (birdPos.width / 2) >= top;
				const hitPipe = hitPipeLeft && hitPipeTop;
				if (hitPipe) this.ticker.stop();
			}

		});
	}
}