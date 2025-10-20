import { Arrow } from "./arrow.js";

export class Archer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 40;
    this.color = "cyan";
    this.lastShot = 0;
  }

  shoot(arrows) {
    const now = Date.now();
    if (now - this.lastShot > 1000) {
      arrows.push(new Arrow(this.x + this.width, this.y + this.height / 2));
      this.lastShot = now;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}