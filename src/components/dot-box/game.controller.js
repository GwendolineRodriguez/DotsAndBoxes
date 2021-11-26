import Player from "./player";
import DotBoxGame from "./dot-box-game";
import Score from "../scores/score";

class GameController {
  constructor(options, classes) {
    this.boxNumber = options.boxNumber;
    this.maxScore = this.boxNumber;
    this.player1 = new Player(options.playerName, true);
    this.player2 = new Player("Player 2", false);
    this.boxesOwned = 0;
    this.game = new DotBoxGame(this.boxNumber, options.difficulty);
    this.endGameModal = document.querySelector("end-game-modal");
    this.gameOver = false;
    this.setUpClasses(classes);
  }

  playTurn = (sideId, player) => {
    const btn = document.getElementById(sideId);
    this.game.markBtnAsOwned(btn, player, `${this.selectable}`);
    const boxes = this.game.boxes.filter((box) =>
      Object.keys(box.sideIds).includes(sideId)
    );
    let boxesCompleted = 0;
    boxes.forEach((box) => {
      box.sideIds[sideId] = player.name;
      let isCurrentBoxCompleted = this.game.boxIsCompleted(box);
      if (isCurrentBoxCompleted) {
        boxesCompleted++;
      }
      if (isCurrentBoxCompleted) {
        player.score++;
        this.boxesOwned++;
        box.owner = player.name;
        this.game.markBoxAsOwned(box, player);
        if (this.boxesOwned.toString() === this.maxScore) {
          this.gameOver = true;
          this.registerScore();
          this.endGameModal.open(this);
        }
      }
    });
    // Simulate other player, computer with a random ID
    if (player.isHuman && boxesCompleted === 0) {
      this.playTurn(this.game.chooseSideId(), this.player2);
    }
    if (!player.isHuman && boxesCompleted > 0 && !this.gameOver) {
      this.playTurn(this.game.chooseSideId(), this.player2);
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

  registerScore() {
    const score = new Score(this.player1, this.player2, this.boxNumber);
    const existingScores = localStorage.getItem("scores");
    const newScores = JSON.parse(existingScores) || [];
    newScores.push(score);
    localStorage.setItem("scores", JSON.stringify(newScores));
  }

  resetGame() {
    location.reload();
  }
}

export default GameController;
