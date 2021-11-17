import Player from "./player";
import DotBoxGame from "./dot-box-game";
import Score from "../scores/score";

class GameController {
  constructor(boxNumber) {
    // this.maxScore = boxNumber;
    this.boxNumber = boxNumber;
    this.maxScore = 1;
    this.player1 = new Player("Player 1", true);
    this.player2 = new Player("Player 2", false);
    this.boxesOwned = 0;
    this.game = new DotBoxGame();
    this.boxes = this.game.generateBoxes(boxNumber);
    this.endGameModal = document.querySelector("end-game-modal");
  }

  playTurn = (sideId, player) => {
    const btn = document.getElementById(sideId);
    this.game.markBtnAsOwned(btn, player);
    const boxes = this.boxes.filter((box) =>
      Object.keys(box.sideIds).includes(sideId)
    );
    let boxCompleted = false;
    boxes.forEach((box) => {
      box.sideIds[sideId] = player.name;
      boxCompleted = this.game.boxIsCompleted(box);
      if (boxCompleted) {
        player.score++;
        this.boxesOwned++;
        box.owner = player.name;
        this.game.markBoxAsOwned(box, player, `${this.selectable}`);
        if (this.boxesOwned === this.maxScore) {
          this.gameOver = true;
          this.registerScore();
          this.endGameModal.open(this);
        }
      }
    });
    // Simulate other player, computer with a random ID
    if (player.isHuman && !boxCompleted) {
      this.playTurn(this.game.getRandomSideId(), this.player2);
    }
    if (!player.isHuman && boxCompleted && !this.gameOver) {
      this.playTurn(this.game.getRandomSideId(), this.player2);
    }
  };

  setUpEventListeners = () => {
    const sideBtns = document.querySelectorAll(`.${this.sideBtn}`);
    sideBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("id");
        this.playTurn(id, this.player1);
      });
    });
  };

  getWinner = () =>
    this.player1.score > this.player2.score
      ? this.player1.name
      : this.player2.name;

  setUpClasses = (classes) => {
    this.sideBtn = classes.sideBtn;
    this.marked = classes.marked;
    this.selectable = classes.selectable;
    this.player1.color = classes.player1Color;
    this.player2.color = classes.player2Color;
  };

  resetGame = () => {
    // could just refreshpage with options in route ?
    console.error("ResetGame not implemented yet");
  };

  registerScore() {
    const score = new Score(this.player1, this.player2, this.boxNumber);
    const existingScores = localStorage.getItem("scores");
    const newScores = JSON.parse(existingScores) || [];
    newScores.push(score);
    localStorage.setItem("scores", JSON.stringify(newScores));
  }
}

export default GameController;
