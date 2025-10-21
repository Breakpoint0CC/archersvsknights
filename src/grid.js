<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Archers vs Knights</title>
<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
  font-family: sans-serif;
}
#ui {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background: rgba(0,0,0,0.6);
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
}
#ui button {
  background: #555;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
</head>
<body>
<canvas id="gameCanvas"></canvas>

<div id="ui">
  <span id="money">Money: $100</span>
  <button id="buyArcher">Buy Archer ($50)</button>
  <button id="buyMiner">Buy Miner ($50)</button>
</div>

<script>
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let money = 100;
let selectedUnit = null;
const tileSize = 80;
let cols, rows;
const castleRows = 3; // castle occupies top 3 rows
const placements = [];
const knights = [];

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / tileSize);
  rows = Math.floor(canvas.height / tileSize);
}
window.addEventListener("resize", resize);
resize();

// UI Buttons
document.getElementById("buyArcher").onclick = () => selectedUnit = "archer";
document.getElementById("buyMiner").onclick = () => selectedUnit = "miner";

// Place unit on click
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  // Can't place on castle or mud (bottom row)
  if (row < castleRows || row >= rows - 1) return;
  if (!selectedUnit || money < 50) return;

  placements.push({ col, row, type: selectedUnit });
  money -= 50;
  selectedUnit = null;
});

// Draw grid + units + knights
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw tiles
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r < castleRows) ctx.fillStyle = "#888"; // Castle gray
      else if (r === rows - 1) ctx.fillStyle = "#7a4a2b"; // Mud brown
      else ctx.fillStyle = "#2fb84f"; // Grass green
      ctx.fillRect(c * tileSize, r * tileSize, tileSize - 1, tileSize - 1);
    }
  }

  // Draw placed units
  for (const p of placements) {
    ctx.fillStyle = p.type === "archer" ? "blue" : "yellow";
    ctx.fillRect(p.col * tileSize + 10, p.row * tileSize + 10, tileSize - 20, tileSize - 20);
  }

  // Draw knights (red squares)
  for (const k of knights) {
    ctx.fillStyle = "red";
    ctx.fillRect(k.col * tileSize + 10, k.row * tileSize + 10, tileSize - 20, tileSize - 20);
  }
}

// Spawn knights every 2 seconds
setInterval(() => {
  const spawnCol = Math.floor(Math.random() * cols);
  knights.push({ col: spawnCol, row: castleRows });
}, 2000);

// Move knights downward
function update() {
  for (const k of knights) {
    k.row += 0.02; // slow movement
  }
}

// Main loop
function loop() {
  update();
  draw();
  document.getElementById("money").textContent = "Money: $" + money;
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>