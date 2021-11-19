import {
  dotboxGrid,
  dot,
  sideBtn,
  marked,
  selectable,
  horizonBtn,
  verticaBtn,
  player1Color,
  player2Color,
} from "./dot-box-grid.module.css";
import GameController from "./game.controller";

class DotBoxesGrid extends HTMLElement {
  constructor() {
    super();
    this.classes = {
      sideBtn: `${sideBtn}`,
      marked: `${marked}`,
      selectable: `${selectable}`,
      player1Color: `${player1Color}`,
      player2Color: `${player2Color}`,
    };
  }

  connectedCallback() {
    const playerName = localStorage.getItem("playerName");
    const board = localStorage.getItem("board");
    const difficulty = localStorage.getItem("difficulty");
    // this.boxNumber = Number(this.options.board);
    this.boxNumber = 4;

    this.options = { playerName, board, difficulty };
    console.log(this.options);
    this.state = new GameController(this.options);
    this.state.setUpClasses(this.classes);
    this.render();
    this.state.setUpEventListeners();
  }

  getHorizonBtn(row, col) {
    const html = String.raw;
    return html`
      <button
        id="r${row}c${col}"
        class="${sideBtn} ${selectable} ${horizonBtn}"
      ></button>
    `;
  }

  getDot() {
    const html = String.raw;
    return html`<span class="${dot}"></span>`;
  }

  getHorizontalSides = (row) => {
    let result = "";
    for (let i = 1; i < this.boxNumber - 2; i += 2) {
      result += `
        ${this.getDot()}
        ${this.getHorizonBtn(row, i)}
      `;
    }
    result += `${this.getDot()}`;
    return result;
  };

  getVerticalBtn(row, col) {
    const html = String.raw;
    return html`
      <button
        id="r${row}c${col}"
        class="${sideBtn} ${selectable} ${verticaBtn}"
      ></button>
    `;
  }

  getBox(row, col) {
    const html = String.raw;
    return html` <div id="r${row}Content${col}"></div> `;
  }

  getVerticalSides = (row) => {
    let result = "";
    for (let i = 1, counter = 1; i < this.boxNumber - 2; i += 2, counter++) {
      result += `
        ${this.getVerticalBtn(row, i)}
        ${this.getBox(counter)}
      `;
    }
    result += `${this.getVerticalBtn(row, this.boxNumber - 2)}`;
    return result;
  };

  renderDotsAndBoxes() {
    let result = "";
    for (let i = 1; i < this.boxNumber - 2; i += 2) {
      result += `
        ${this.getHorizontalSides(i)}
        ${this.getVerticalSides(i + 1)}
      `;
    }
    result += `${this.getHorizontalSides(this.boxNumber - 2)}`;
    return result;
  }

  render = () => {
    const html = String.raw;
    this.innerHTML = html`
      <section id="${dotboxGrid}">${this.renderDotsAndBoxes()}</section>
    `;
  };
}

customElements.define("dot-boxes-grid", DotBoxesGrid);
