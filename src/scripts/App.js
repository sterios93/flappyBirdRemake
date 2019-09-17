import * as PIXI from 'pixi.js';
import Loader from './ImageLoader';
import manifest from '../assets-manifest';
import SoundLoader from './SoundsLoader';

export default class App extends PIXI.Application {
	constructor() {
		super();
	}

	init() {
		this.imagesLoader = new Loader();
		this.soundsLoader = new SoundLoader();
	}

	async preload() {
		this.images = await this.imagesLoader.loadAssets(manifest.images);
		this.sounds = await this.soundsLoader.loadSounds(manifest.sounds);

		console.error(this.images);
		console.error(this.sounds);

	}
}