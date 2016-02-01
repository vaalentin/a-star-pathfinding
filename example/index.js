import GameLoop from '@vaalentin/game-loop';
import Grid from '../src/Grid';
import { findPath } from '../src/';

let canvas;
let ctx;

let grid;

let mx;
let my;

let path = [];

let isMouseDown;

const loop = new GameLoop(10);

loop.addEventListener('init', () => {
  canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);

  ctx = canvas.getContext('2d');

  grid = new Grid(10, 10);

  canvas.addEventListener('mousemove', ({ offsetX: x, offsetY: y }) => {
    mx = x / canvas.width;
    my = y / canvas.height;
  });

  canvas.addEventListener('mousedown', () => isMouseDown = true);
  canvas.addEventListener('mouseup', () => isMouseDown = false);
});

loop.addEventListener('update', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let x = 0; x < grid.dx; x++) {
    for(let y = 0; y < grid.dy; y++) {
      const cell = grid.cells[x][y];

      if(mx > (x/grid.dx) && mx < ((x+1)/grid.dx) && my > (y/grid.dy) && my < ((y+1)/grid.dy)) {
        if(isMouseDown) {
          cell.isWalkable = !cell.isWalkable;
          isMouseDown = false;
        }

        path = findPath(grid, 0, 0, cell.x, cell.y);
        
        for(let xx = 0; xx < grid.dx; xx++) {
          for(let yy = 0; yy < grid.dy; yy++) {
            grid.cells[xx][yy].reset();
          }
        }
      }
    }
  }

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


  // draw path
  for(let i = 0; i < path.length; i += 2) {
    const x = path[i];
    const y = path[i + 1];
    const ax = x * (canvas.width / grid.dx);
    const ay = y * (canvas.height / grid.dy);
    const w = canvas.width / grid.dx;
    const h = canvas.height / grid.dy;
  }

});

loop.start();
