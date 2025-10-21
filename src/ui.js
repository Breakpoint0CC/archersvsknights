export class UI {
  constructor(game) {
    this.game = game;
    this.moneyEl = document.getElementById("money");
    this.gemsEl = document.getElementById("gems");

    document
      .getElementById("buyArcher")
      .addEventListener("click", () => this.game.buyArcher());

    document
      .getElementById("startWave")
      .addEventListener("click", () => this.game.startWave());
  }

  update() {
    this.moneyEl.textContent = this.game.money;
    this.gemsEl.textContent = this.game.gems;
  }
}