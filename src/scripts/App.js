import * as PIXI from 'pixi.js';
import Loader from './ImageLoader';
import manifest from '../assets-manifest';

export default class App extends PIXI.Application {
	constructor() {
		super();
	}

	init() {
		this.imagesLoader = new Loader();
	}

	async preload() {
		await this.imagesLoader.loadAssets(manifest.images);
	}
}