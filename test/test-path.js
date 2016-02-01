import test from 'tape';
import Grid from '../src/Grid';
import { findPath, buildPath } from '../src';

const grid = new Grid(100, 100);

test('path', ({ test }) => {
  test('given a grid and two points, should return a path', t => {
    t.plan(1);

    const path = findPath(grid, 0, 0, 5, 5);
    
    t.ok(Array.isArray(path), 'path is an array');
  });

  test('should build a path from a linked list of Cells', t => {
    t.plan(1);

    const cells = [];
    const coords = [];

    for(let i = 0; i < 10; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const parent = i > 0 ? cells[i - 1] : null;

      coords.push(y, x);
      
      cells.push({ x, y, parent });
    }

    const path = buildPath(cells[cells.length - 1]);

    t.deepEqual(path, coords);
  });
});
