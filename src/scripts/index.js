import App from './App';


const start = async () => {
  const game = new App();
  document.body.appendChild(game.view);
  document.body.style.background = 'black';
  document.body.style.display = 'flex';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  
  game.init();
  await game.preload();
  game.createField();

};


start();