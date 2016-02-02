/**
 * @class Cell
 */
export default class Cell {
  /**
   * @constructs Cell
   * @param {uint} x
   * @param {uint} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.isWalkable = true;
    this.isOpen = false;
    this.isClosed = false;

    this.F = Infinity;
    this.G = Infinity;
    this.H = Infinity;

    this.parent = null;
  }

  /**
   * @method reset
   * @public
   */
  reset() {
    this.isOpen = false;
    this.isClosed = false;

    this.F = Infinity;
    this.G = Infinity;
    this.H = Infinity;

    this.parent = null;
  }

  /**
   * @method dispose
   */
  dispose() {

  }
}
