import GameController from "./gameController";
import GameGrid from "./grid";
import EasyGameAI from "./models/easyGameAI";
import MediumGameAI from "./models/mediumGameAI";
import DifficultGameAI from "./models/difficultGameAI";
import GameState from "./gameState";
import GridController from "./gridController";

class DotsAndBoxes extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const options = this.getOptions();
    console.log(options);
    const rootSqrt = Math.sqrt(options.boxNumber);
    const rowCount = rootSqrt * 2 + 1;
    this.grid = new GameGrid(options.boxNumber);
    this.innerHTML = this.grid.component(rowCount);
    const gridController = new GridController(
      options.boxNumber,
      this.grid.classes
    );
    const gameAI = this.setUpAI(options.difficulty, gridController);
    this.gameState = new GameState(gridController, options, this.grid.classes);
    this.gameController = new GameController(
      gridController,
      this.gameState,
      gameAI,
      this.grid.classes
    );
    this.setUpEventListeners();
  }

  getOptions() {
    const playerName = localStorage.getItem("playerName");
    const board = localStorage.getItem("board");
    const difficulty = localStorage.getItem("difficulty");
    const boxNumber = localStorage.getItem("boxNumber");
    return { playerName, board, boxNumber, difficulty };
  }

  setUpAI(difficulty, gridController) {
    switch (difficulty) {
      case "easy":
        return new EasyGameAI(gridController);
      case "medium":
        return new MediumGameAI(gridController);
      case "difficult":
        return new DifficultGameAI(gridController);
      default:
        return new EasyGameAI(gridController);
    }
  }

  setUpEventListeners = () => {
    const sideBtns = document.querySelectorAll(`.${this.grid.classes.sideBtn}`);
    sideBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const sideId = btn.getAttribute("id");
        this.gameController.chooseBoxSide(this.gameState.player1, sideId);
      });
    });
  };
}

customElements.define("dots-and-boxes", DotsAndBoxes);
