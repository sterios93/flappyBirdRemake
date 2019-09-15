import * as Pixi from 'pixi.js';

export default class ImageLoader extends Pixi.Loader {
	constructor() {
		super();
	}

	loadAssets(assets) {
		return new Promise((resolve) => {
			this.add(assets);
			this.load((loader, resources) => {
				resolve(resources);
			});
		});
	}
}