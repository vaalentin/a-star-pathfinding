export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.isWalkable = true;
    this.isOpen = false;
    this.isClosed = false;

    this.F = -1;
    this.G = -1;
    this.H = -1;
  }
}
