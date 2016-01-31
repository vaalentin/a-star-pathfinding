import GameLoop from '@vaalentin/game-loop';
import Grid from '../src/Grid';
import { findPath } from '../src/';

let canvas;
let ctx;

let grid;

const loop = new GameLoop(10);

loop.addEventListener('init', () => {
  canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);

  ctx = canvas.getContext('2d');

  grid = new Grid(10, 10);

  for(let x = 0; x < 10; x++) {
    for(let y = 0; y < 10; y++) {
      grid.cells[x][y].isWalkable = Math.random() < 0.2 ? false : true;
    }
  }

  findPath(grid, 0, 0, 9, 9);
});

loop.addEventListener('update', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let x = 0; x < grid.dx; x++) {
    for(let y = 0; y < grid.dy; y++) {
      const cell = grid.cells[x][y];

      const ax = x * (canvas.width / grid.dx);
      const ay = y * (canvas.height / grid.dy);
      const w = canvas.width / grid.dx;
      const h = canvas.height / grid.dy;

      let color;

      if(!cell.isWalkable) {
        color = 'black';
      } else if(cell.isClosed) {
        color = 'red';
      } else if(cell.isOpen) {
        color = 'green';
      } else {
        color = 'white';
      }

      ctx.beginPath();
      ctx.rect(ax, ay, w, h);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      
      ctx.textBaseLine = 'bottom';
      ctx.fillStyle = 'black';
      ctx.fillText('h: ' + cell.H, ax + 5, ay + 10);
      ctx.fillText('f: ' + cell.F, ax + 5, ay + 22);
      ctx.fillText('g: ' + cell.G, ax + 5, ay + 34);
    }
  }
});

loop.start();
