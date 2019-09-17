import { Howl } from 'howler';

export default class SoundLoader {
	async loadSounds(sounds) {
		
		let howls = {};
		const imagespath = '../assets/audio/';

		const promises = sounds.map((soundData) => {
			return new Promise((res) => {
				
				const sound = new Howl({ src: [imagespath + soundData.name]});

				sound.once('load', function () {
					howls[soundData.name] = sound;
					res(sound);
				});

				sound.once('loaderror', () => console.warn(sound, 'Failed to load!'));

			});
		});

		await Promise.all(promises);
		return howls;
	}
}