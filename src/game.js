import { Grid } from "./grid.js";

export class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.money = 100;
    this.selectedUnit = null;

    // Set tile size and build grid
    this.tileSize = 80;
    this.initGrid();

    // Store placed units
    this.placements = [];

    // Mouse click to place
    canvas.addEventListener("click", (e) => this.handleClick(e));

    // 🔥 Force an immediate draw on start
    this.draw();
  }

  initGrid() {
    const cols = Math.ceil(this.canvas.width / this.tileSize);
    const rows = Math.ceil(this.canvas.height / this.tileSize);
    this.grid = new Grid(cols, rows, this.tileSize, 3);
  }

  handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { col, row } = this.grid.getTileFromCoords(x, y);

    // Can't place on castle or mud
    if (col < this.grid.castleCols || row >= this.grid.rows - 1) return;

    if (this.selectedUnit && this.money >= 50) {
      this.money -= 50;
      this.placements.push({ col, row, type: this.selectedUnit });
      this.selectedUnit = null;
    }
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.initGrid();
    this.draw(); // redraw on resize
  }

  update() {}

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw terrain grid
    this.grid.draw(ctx);

    // draw placed units
    for (const p of this.placements) {
      ctx.fillStyle = p.type === "archer" ? "blue" : "yellow";
      ctx.fillRect(
        p.col * this.tileSize + 10,
        p.row * this.tileSize + 10,
        this.tileSize - 20,
        this.tileSize - 20
      );
    }
  }
}