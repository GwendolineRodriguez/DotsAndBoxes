import Player from "./models/player";
import Score from "../scores/score";

class GameState {
  constructor(gridController, options, classes) {
    this.player1 = new Player(options.playerName, true, classes.player1Color);
    this.player2 = new Player("Player 2", false, classes.player2Color);
    this.boxes = gridController.boxes;
    this.gameOver = false;
    this.boxesOwned = 0;
    this.maxScore = options.boxNumber;
    this.endGameModal = document.querySelector("end-game-modal");
  }

  get winner() {
    return this.player1.score > this.player2.score
      ? this.player1.name
      : this.player2.name;
  }

  registerScore() {
    const score = new Score(this.player1, this.player2, this.maxScore);
    const existingScores = localStorage.getItem("scores");
    const newScores = JSON.parse(existingScores) || [];
    newScores.push(score);
    localStorage.setItem("scores", JSON.stringify(newScores));
  }

  checkEndGame() {
    if (this.boxesOwned.toString() === this.maxScore) {
      this.gameOver = true;
      this.registerScore();
      this.endGameModal.open(this);
    }
  }

  resetGame() {
    location.reload();
  }
}

export default GameState;
