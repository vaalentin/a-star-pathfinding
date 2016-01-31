import test from 'tape';
import Grid from '../src/Grid';
import { findPath } from '../src';

const grid = new Grid(100, 100);

test('path', ({ test }) => {
  test('given a grid and two points, should return a path', t => {
    const path = findPath(grid, 0, 0, 5, 5);
    t.ok(Array.isArray(path), 'path is an array');
  });
});
