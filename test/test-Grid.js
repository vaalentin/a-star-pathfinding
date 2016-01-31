import test from 'tape';
import { getRandomValueInRange } from 'math-utils';
import Grid from '../src/Grid';
import Cell from '../src/Cell';

test('Grid', ({ test }) => {
  test('should be instanciable', t => {
    t.plan(1);

    const grid = new Grid();

    t.ok(grid instanceof Grid, 'grid is instance of Grid');
  });

  test('if dx and dy are provided, generate the cells', t => {
    const dx = 10;
    const dy = 10;
    
    const grid = new Grid(dx, dy);

    t.equal(grid.cells.length, dx, grid.cells.length + ' columns');
    
    for(let i = 0; i < grid.cells.length; i++) {
      const row = grid.cells[i];
      t.equal(row.length, dy, row.length + ' rows for column ' + i);
    }

    t.end();
  });


  test('should tell if a set of coordinates is inside the grid', t => {
    const sampleSize = 10;
    const dx = 10;
    const dy = 10;

    const grid = new Grid(dx, dy);

    for(let i = 0; i < sampleSize; i++) {
      const x = getRandomValueInRange(-5, 15, true);
      const y = getRandomValueInRange(-5, 15, true);

      if(x >= 0 && x < dx && y >= 0 && y < dy) {
        t.ok(grid.contains(x, y), '(' + x + ' ,' + y + ') is inside');
      } else {
        t.notOk(grid.contains(x, y), '(' + x + ' ,' + y + ') is outside');
      }
    }

    t.end();
  });

  test('it should be possible to get a cell by coordinates', t => {
    t.plan(3);

    const grid = new Grid(10, 10);

    const cell = grid.getCellAt(2, 5);

    t.ok(cell instanceof Cell, 'cell is instanceof Cell');
    t.equal(cell.x, 2, 'cell x is correct');
    t.equal(cell.y, 5, 'cell y is correct');
  });

  test('should returns neighbors from a set of coordinates', t => {
    const grid = new Grid(10, 10);

    const x = 5;
    const y = 5;

    // [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft]
    const neighbors = grid.getNeighborsAt(x, y);

    t.ok(Array.isArray(neighbors));

    // we have 8 neighbors since we are in the middle of the grid and all cells are walkable
    t.equal(neighbors.length, 8); 

    const coordinates = [
      { x: x, y: y - 1 }, // top
      { x: x + 1, y: y - 1 }, // topRight
      { x: x + 1, y: y }, // right
      { x: x + 1, y: y + 1 }, // bottomRight
      { x: x, y: y + 1 }, // bottom
      { x: x - 1, y: y + 1 }, // bottomLeft
      { x: x - 1, y: y }, // left
      { x: x - 1, y: y - 1 } // topLeft
    ];

    for(let i = 0; i < neighbors.length; i++) {
      t.ok(neighbors[i] instanceof Cell, 'neighbor is instance of Cell');
      t.equal(neighbors[i].x, coordinates[i].x, 'neighbor x coordinate is correct');
      t.equal(neighbors[i].y, coordinates[i].y, 'neighbor y coordinate is correct');
    }

    t.end();
  });

  test('should ignore non walkable and offgrid neighbors', t => {
    t.plan(2);

    const grid = new Grid(10, 10);

    /**
     * x: cell
     * 1: walkable neighbors
     * 0: non walkable neighbors
     */
    let neighbors = grid.getNeighborsAt(0, 0);

    /**
     * x 1
     * 1 1
     */
    t.equal(neighbors.length, 3);

    grid.getCellAt(1, 0).isWalkable = false;
    grid.getCellAt(0, 1).isWalkable = false;

    /**
     * x 0
     * 0 1
     */
    neighbors = grid.getNeighborsAt(0, 0);

    t.equal(neighbors.length, 1);
  });
});
