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

    this.F = -1;
    this.G = -1;
    this.H = -1;

    this.parent = null;
  }

  /**
   * @method reset
   * @public
   */
  reset() {
    this.isOpen = false;
    this.isClosed = false;

    this.F = -1;
    this.G = -1;
    this.H = -1;

    this.parent = null;
  }

  /**
   * @method dispose
   */
  dispose() {

  }
}
