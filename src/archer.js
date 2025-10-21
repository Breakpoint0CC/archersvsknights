export class Archer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}