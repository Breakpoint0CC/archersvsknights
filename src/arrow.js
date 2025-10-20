export class Arrow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 4;
    this.color = "yellow";
    this.speed = 5;
    this.hit = false;
  }

  update() {
    this.x += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}