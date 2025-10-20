import { Archer } from "./archer.js";
import { Knight } from "./knight.js";

export class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.knights = [];
    this.arrows = [];
    this.castle = { x: 50, y: 200, width: 60, height: 120, color: "blue" };
    this.archer = new Archer(this.castle.x + 70, 260);
    this.lastKnightSpawn = 0;
    this.gameOver = false;
  }

  spawnKnight() {
    this.knights.push(new Knight(this.canvas.width - 50, 260));
  }

  update() {
    if (this.gameOver) return;

    // Spawn knight every 2 seconds
    if (Date.now() - this.lastKnightSpawn > 2000) {
      this.spawnKnight();
      this.lastKnightSpawn = Date.now();
    }

    this.archer.shoot(this.arrows);

    // Update arrows
    this.arrows.forEach(a => a.update());
    this.arrows = this.arrows.filter(a => a.x < this.canvas.width && !a.hit);

    // Update knights
    this.knights.forEach(k => k.update());

    // Collision detection
    for (let a of this.arrows) {
      for (let k of this.knights) {
        if (
          a.x < k.x + k.width &&
          a.x + a.width > k.x &&
          a.y < k.y + k.height &&
          a.y + a.height > k.y
        ) {
          k.hit = true;
          a.hit = true;
        }
      }
    }

    // Remove hit enemies
    this.knights = this.knights.filter(k => !k.hit);

    // Check if any knight reaches castle
    for (let k of this.knights) {
      if (k.x < this.castle.x + this.castle.width) {
        this.gameOver = true;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Castle
    ctx.fillStyle = this.castle.color;
    ctx.fillRect(this.castle.x, this.castle.y, this.castle.width, this.castle.height);

    // Archer
    this.archer.draw(ctx);

    // Knights
    this.knights.forEach(k => k.draw(ctx));

    // Arrows
    this.arrows.forEach(a => a.draw(ctx));

    // Game over
    if (this.gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.fillText("Game Over!", this.canvas.width / 2 - 120, this.canvas.height / 2);
    }
  }
}