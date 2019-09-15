import App from './App';

const game = new App();
document.body.appendChild(game.view);

game.init();
game.preload();