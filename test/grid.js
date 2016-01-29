import test from 'tape';
import Grid from '../src/Grid';
import Cell from '../src/Cell';

test('should be instanciable', t => {
  t.plan(1);

  const grid = new Grid();

  t.ok(grid instanceof Grid);
});

test('if dx and dy are provided, generate the cells', t => {
  t.plan(1);
  
  const grid = new Grid(10, 10);

  t.equal(grid._cells.length, 10 * 10);
});


test('should tell if a set of coordinates is inside the grid', t => {
  t.plan(5);

  const grid = new Grid(10, 10);

  t.ok(grid.contains(5, 5));
  t.notOk(grid.contains(15, 5));
  t.notOk(grid.contains(5, 15));
  t.notOk(grid.contains(-1, 5));
  t.notOk(grid.contains(5, -1));
});

test('it should be possible to get a cell by coordinates', t => {
  t.plan(3);

  const grid = new Grid(10, 10);

  const cell = grid.getCellAt(2, 5);

  t.ok(cell instanceof Cell);
  t.ok(cell.x, 2);
  t.ok(cell.y, 5);
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
    { x: x + 1, y: 6 + 1 }, // bottomRight
    { x: x, y: y + 1 }, // bottom
    { x: x - 1, y: y + 1 }, // bottomLeft
    { x: x - 1, y: y }, // left
    { x: x - 1, y: y - 1 } // topLeft
  ];

  for(let i = 0; i < neighbors.length; i++) {
    t.ok(neighbors[i] instanceof Cell);
    t.equal(neighbors[i].x, coordinates[i].x);
    t.equal(neighbors[i].y, coordinates[i].y);
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
  const neighbors = grid.getNeighborsAt(0, 0);

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
  t.equal(neighbors.length, 1);
});

