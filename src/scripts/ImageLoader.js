import * as Pixi from 'pixi.js';
import config from './utils/config';

export default class ImageLoader extends Pixi.Loader {
	constructor(baseUrl = config.imagesBasePath) {
		super(baseUrl);
	}

	loadAssets(assets) {
			assets.forEach(element => {
				this.add(element.name, element.fullName);
			});

			this.onError.add((e) => console.error('error', e));

			return new Promise((resolve) => {
				this.load((loader, resources) => {
					resolve(resources);
				});
			});
	}
}