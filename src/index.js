import BinaryHeap from '@vaalentin/binary-heap';

/**
 * http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
 * Heuristic for grids
 * 4 directions: manhattan
 * 8 directions: diagonal
 */

/**
 * @function manhattan
 * @param {float} startX
 * @param {float} startY
 * @param {float} endX
 * @param {float} endY
 * @returns {float}
 */
export function manhattan(startX, startY, endX, endY) {
  const dx = Math.abs(startX - endX);
  const dy = Math.abs(startY - endY);
  return dx + dy;
}

/**
 * @function octile
 * @param {float} startX
 * @param {float} startY
 * @param {float} endX
 * @param {float} endY
 * @returns {float}
 */
export function octile(startX, startY, endX, endY) {
  const F = Math.SQRT2 - 1;
  const dx = Math.abs(startX - endX);
  const dy = Math.abs(startY - endY);
  return dx < dy ? F * dx + dy : F * dy + dx;
}

/**
 * @function buildPath
 * @param {Cell} cell
 * @returns {uint[]}
 */
export function buildPath(cell) {
  const path = [cell.x, cell.y];

  while(cell.parent) {
    cell = cell.parent;
    path.push(cell.x, cell.y);
  }

  return path.reverse();
}

/**
 * @function findPath
 * @param {Grid} grid
 * @param {uint} startX
 * @param {uint} startY
 * @param {uint} endX
 * @param {uint} endY
 * @param {boolean} [diagonal = false]
 */
export function findPath(grid, startX, startY, endX, endY, diagonal = false) {
  const heuristic = diagonal ? octile : manhattan;
  const openCells = new BinaryHeap((a, b) => a.F - b.F);

  const startCell = grid.getCellAt(startX, startY);
  const endCell = grid.getCellAt(endX, endY);

  startCell.G = 0;
  startCell.F = 0;

  openCells.push(startCell);
  startCell.isOpen = true;

  while(!openCells.isEmpty()) {
    const cell = openCells.pop();

    if(cell === endCell) {
      return buildPath(endCell);
    }

    cell.isClosed = true;

    for(let neighbor of grid.getNeighborsAt(cell.x, cell.y)) {
      if(neighbor.isClosed) {
        continue;
      }

      let distance;

      if(neighbor.x - cell.x === 0 || neighbor.y - cell.y === 0) {
        // horizontal/vertical
        distance = 1;
      } else {
        // diagonal
        distance = Math.SQRT2;
      }

      const neighborG = cell.G + distance;

      if(neighbor.isOpen || neighbor.G === -1 || neighborG < neighbor.G) {
        neighbor.G = neighborG;
        neighbor.H = heuristic(neighbor.x, neighbor.y, endCell.x, endCell.y);
        neighbor.F = neighbor.G + neighbor.H;
        neighbor.parent = cell;

        if(!neighbor.isOpen) {
          openCells.push(neighbor);
          neighbor.isOpen = true;
        } else {
          openCells.update(neighbor);
        }
      }
    }
  }

  return [];
}
