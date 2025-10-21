import { Game } from "./game.js";
import { setupUI } from "./ui.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set initial size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

const game = new Game(canvas);
setupUI(game);

function loop() {
  game.update();
  game.draw();
  requestAnimationFrame(loop);
}
loop();

window.addEventListener("resize", () => {
  resizeCanvas();
  game.resize(canvas.width, canvas.height);
});