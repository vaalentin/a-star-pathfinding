import Cell from './Cell';

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
    this._dx = dx;
    this._dy = dy;

    this._cells = this.getCells(dx, dy);
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
    return x >= 0 && x < this._dx && y >= 0 && y < this._dy;
  }

  /**
   * @method getCellAt
   * @public
   * @param {uint} x
   * @param {uint} y
   * @returns {Cell}
   */
  getCellAt(x, y) {
    return this._cells[x][y];
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

    // ↑
    if(this.contains(x, y - 1)) {
      const cell = this.getCellAt(x, y - 1);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }

    // ↗
    if(this.contains(x + 1, y - 1)) {
      const cell = this.getCellAt(x + 1, y - 1);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }

    // →
    if(this.contains(x + 1, y)) {
      const cell = this.getCellAt(x + 1, y);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }
    
    // ↘
    if(this.contains(x + 1, y + 1)) {
      const cell = this.getCellAt(x + 1, y + 1);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }
    
    // ↓
    if(this.contains(x, y + 1)) {
      const cell = this.getCellAt(x, y + 1);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }
    
    // ↙
    if(this.contains(x - 1, y + 1)) {
      const cell = this.getCellAt(x - 1, y + 1);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }
    
    // ←
    if(this.contains(x - 1, y)) {
      const cell = this.getCellAt(x - 1, y);

      if(cell.isWalkable) {
        neighbors.push(cell);
      }
    }

    // ↖
    if(this.contains(x - 1, y - 1)) {
      const cell = this.getCellAt(x - 1, y - 1);

      if(cell.isWalkable) {
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
    for(let cell of this._cells) {
      cell.dispose();
    }

    this._cells = null;
  }
}
