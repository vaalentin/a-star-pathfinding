import Cell from './Cell';

const TOP = 1 << 0;
const RIGHT = 1 << 1;
const BOTTOM = 1 << 2;
const LEFT = 1 << 3;

const TOP_RIGHT = TOP | RIGHT;
const BOTTOM_RIGHT = BOTTOM | RIGHT;
const BOTTOM_LEFT = BOTTOM | LEFT;
const TOP_LEFT = TOP | LEFT;

/**
 * @class Grid
 */
export default class Grid {
  /**
   * @constructs Grid
   * @param {uint} [dx = 0]
   * @param {uint} [dy = 0]
   */
  constructor(dx = 0, dy = 0) {
    this.dx = dx;
    this.dy = dy;

    this.cells = this.getCells(dx, dy);
  }

  /**
   * @method getCells
   * @private
   * @param {uint} dx
   * @param {uint} dy
   * @returns {Cell[][]}
   */
  getCells(dx, dy) {
    const cells = new Array(dx);

    for(let x = 0; x < dx; x++) {
      cells[x] = new Array(dy);

      for(let y = 0; y < dy; y++) {
        cells[x][y] = new Cell(x, y);
      }
    }

    return cells;
  }

  /**
   * @method contains
   * @public
   * @param {uint} x
   * @param {uint} y
   */
  contains(x, y) {
    return x >= 0 && x < this.dx && y >= 0 && y < this.dy;
  }

  /**
   * @method getCellAt
   * @public
   * @param {uint} x
   * @param {uint} y
   * @returns {Cell}
   */
  getCellAt(x, y) {
    return this.cells[x][y];
  }

  /**
   * @method getNeighborsAt
   * @public
   * @param {uint} x
   * @param {uint} y
   * @returns {Cell[]}
   */
  getNeighborsAt(x, y) {
    const neighbors = [];

    let flag = 0;

    // ↑
    if(this.contains(x, y - 1)) {
      const cell = this.getCellAt(x, y - 1);

      if(cell.isWalkable) {
        flag |= TOP;
        neighbors.push(cell);
      }
    }

    // →
    if(this.contains(x + 1, y)) {
      const cell = this.getCellAt(x + 1, y);

      if(cell.isWalkable) {
        flag |= RIGHT;
        neighbors.push(cell);
      }
    }

    // ↓
    if(this.contains(x, y + 1)) {
      const cell = this.getCellAt(x, y + 1);

      if(cell.isWalkable) {
        flag |= BOTTOM;
        neighbors.push(cell);
      }
    }
    
    // ←
    if(this.contains(x - 1, y)) {
      const cell = this.getCellAt(x - 1, y);

      if(cell.isWalkable) {
        flag |= LEFT;
        neighbors.push(cell);
      }
    }
    
    // ↗
    if(this.contains(x + 1, y - 1)) {
      const cell = this.getCellAt(x + 1, y - 1);

      if(cell.isWalkable && (flag & TOP_RIGHT) === TOP_RIGHT) {
        neighbors.push(cell);
      }
    }

    // ↘
    if(this.contains(x + 1, y + 1)) {
      const cell = this.getCellAt(x + 1, y + 1);

      if(cell.isWalkable && (flag & BOTTOM_RIGHT) === BOTTOM_RIGHT) {
        neighbors.push(cell);
      }
    }
    
    // ↙
    if(this.contains(x - 1, y + 1)) {
      const cell = this.getCellAt(x - 1, y + 1);

      if(cell.isWalkable && (flag & BOTTOM_LEFT) === BOTTOM_LEFT) {
        neighbors.push(cell);
      }
    }
    
    // ↖
    if(this.contains(x - 1, y - 1)) {
      const cell = this.getCellAt(x - 1, y - 1);

      if(cell.isWalkable && (flag & TOP_LEFT) === TOP_LEFT) {
        neighbors.push(cell);
      }
    }
    
    return neighbors;
  }

  /**
   * @method dispose
   * @public
   */
  dispose() {
    for(let cell of this.cells) {
      cell.dispose();
    }

    this.cells = null;
  }
}
