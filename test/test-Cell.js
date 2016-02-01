import test from 'tape';
import { getRandomValueInRange } from 'math-utils';
import Cell from '../src/Cell';

test('Cell', ({ test }) => {
  test('should be instanciable', t => {
    t.plan(1);

    const cell = new Cell();

    t.ok(cell instanceof Cell, 'cell is instance of Cell');
  });

  test('should expose x and y attributes', t => {
    t.plan(2);

    const x = getRandomValueInRange(1, 100, true);
    const y = getRandomValueInRange(1, 100, true);

    const cell = new Cell(x, y);

    t.equal(cell.x, x, 'cell x is correct');
    t.equal(cell.y, y, 'cell y is correct');
  });

  test('should expose a isWalkable attribute', t => {
    t.plan(2);

    const cell = new Cell(2, 3);

    t.equal(cell.isWalkable, true, 'cell is walkable by default');

    cell.isWalkable = false;

    t.equal(cell.isWalkable, false, 'cell is no longer walkable');
  });

  test('should expose a parent attribute', t => {
    t.plan(1);

    const cell = new Cell();
    
    t.equal(cell.parent, null, 'cell parent is null');
  });

  test('should expose a isOpen and isClosed attributes', t => {
    t.plan(4);

    const cell = new Cell(2, 3);

    t.equal(cell.isOpen, false, 'cell is not open by default');
    t.equal(cell.isClosed, false, 'cell is not closed by default');

    cell.isOpen = true;
    cell.isClosed = true;

    t.equal(cell.isOpen, true, 'cell is now open');
    t.equal(cell.isClosed, true, 'cell is now closed');
  });

  test('should expose the F, G and H attributes', t => {
    t.plan(6);

    const cell = new Cell(2, 3);

    t.equal(cell.F, -1, 'F is -1 by default');
    t.equal(cell.G, -1, 'G is -1 by default');
    t.equal(cell.H, -1, 'H is -1 by default');

    cell.F = 1;
    cell.G = 2;
    cell.H = 3;

    t.equal(cell.F, 1, 'F value is correct');
    t.equal(cell.G, 2, 'G value is correct');
    t.equal(cell.H, 3, 'H value is correct');
  });

  test('should be able to reset', t => {
    t.plan(6);

    const cell = new Cell(2, 3);

    cell.isOpen = true;
    cell.isClosed = true;
    cell.F = 10;
    cell.G = 10;
    cell.H = 10;
    cell.parent = new Cell(12, 2);

    cell.reset();

    t.equal(cell.isOpen, false, 'cell is no longer open');
    t.equal(cell.isClosed, false, 'cell is no longer closed');
    t.equal(cell.F, -1, 'cell F is reset');
    t.equal(cell.G, -1, 'cell G is reset');
    t.equal(cell.H, -1, 'cell H is reset');
    t.equal(cell.parent, null, 'cell don\'t have a parent anymore');
  });
});
