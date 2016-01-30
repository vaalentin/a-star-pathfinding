import test from 'tape';
import Cell from '../src/Cell';

test('Cell', ({ test }) => {
  test('should be instanciable', t => {
    t.plan(1);

    const cell = new Cell();

    t.ok(cell instanceof Cell);
  });

  test('should expose x and y attributes', t => {
    t.plan(2);

    const cell = new Cell(2, 3);

    t.equal(cell.x, 2);
    t.equal(cell.y, 3);
  });

  test('should expose a isWalkable attribute', t => {
    t.plan(2);

    const cell = new Cell(2, 3);

    t.equal(cell.isWalkable, true);

    cell.isWalkable = false;

    t.equal(cell.isWalkable, false);
  });

  test('should expose a isOpen and isClosed attributes', t => {
    t.plan(2);

    const cell = new Cell(2, 3);

    t.equal(cell.isOpen, false);
    t.equal(cell.isClosed, false);
  });

  test('should expose the F, G and H attributes', t => {
    t.plan(3);

    const cell = new Cell(2, 3);

    t.equal(cell.F, -1);
    t.equal(cell.G, -1);
    t.equal(cell.H, -1);
  });
});
