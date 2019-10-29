import * as PIXI from 'pixi.js';
import config from './utils/config';

export default class Bird {
  constructor(birdTextures, color) {
		this.birdTextures = birdTextures;
		this.color = color;
		this._createFlyAnim();
		this._attachListeners();
		this.downPressY = 20; // Todo move to config
		this.upPressY = 20;
		this.gravity = 0.5;
  }

  _createFlyAnim() {
		const down = this.birdTextures[`${this.color}birdDownflap`].texture;
		const mid = this.birdTextures[`${this.color}birdMidflap`].texture;
		const up = this.birdTextures[`${this.color}birdUpflap`].texture;
		const animTextures = [down, mid, up];
		this.anim = new PIXI.AnimatedSprite(animTextures);
		this.anim.animationSpeed = 0.1;
		this.anim.anchor.set(0.5, 0.5);
		this.anim.play();
		this.anim.x = config.canvasWidth / 3;
	}

	applyGravity () {
		this.anim.y += this.gravity;
	}

	_keyHandler({keyCode = 0}) {
		switch (keyCode) {
			case  40:
				this._onDownArrow();
				break;
			case 38: // Move this to config
				this._onUpArrow();
				break;
			default:
				break;
		}
	}

	_onDownArrow() {
		this.anim.y += this.downPressY;
	}
	
	_onUpArrow() {
		this.anim.y -= this.upPressY;
	}

	_attachListeners() {
		this.keyListener = window.addEventListener('keydown', this._keyHandler.bind(this));
	}

	_destroy() {
		window.removeEventListener('keydown', this.keyListener);
	}

}