import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
const loader = new PIXI.Loader();

document.body.appendChild(app.view);

loader.add('base', 'assets/sprites/base.png').load((loader, resources) => {
    console.error(loader);
    console.error(resources);
    // This creates a texture from a 'base.png' image
    const base = new PIXI.Sprite(resources.base.texture);

    // Setup the position of the bunny
    base.x = app.renderer.width / 2;
    base.y = app.renderer.height / 2;

    // Add the bunny to the scene we are building
    app.stage.addChild(base);

    // Listen for frame updates
    app.ticker.add(() => {});
});
