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
    const boxNumber = localStorage.getItem("boxNumber");
    this.boxNumber = boxNumber;
    const rootSqrt = Math.sqrt(this.boxNumber);
    const rowCount = rootSqrt * 2 + 1;
    this.options = { playerName, board, boxNumber, difficulty };
    console.log(this.options);
    this.state = new GameController(this.options, this.classes);
    this.render(rowCount);
    this.setupGrid(rowCount);
    this.state.setUpEventListeners();
  }

  setupGrid(rowCount) {
    const grid = document.getElementById(`${dotboxGrid}`);
    let gridTempRow = "";
    for (let i = 1; i < rowCount; i += 2) {
      gridTempRow += "auto 1fr ";
    }
    gridTempRow += "auto";
    let gridTempCol = gridTempRow;
    grid.style["grid-template"] = `${gridTempRow} / ${gridTempCol}`;
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

  getHorizontalSides(row, rowCount) {
    let result = "";
    for (let i = 2; i < rowCount; i += 2) {
      result += `
        ${this.getDot()}
        ${this.getHorizonBtn(row, i)}
      `;
    }
    result += `${this.getDot()}`;
    return result;
  }

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

  getVerticalSides(row, rowCount) {
    let result = "";
    for (let i = 1, counter = 1; i < rowCount; i += 2, counter++) {
      result += `
        ${this.getVerticalBtn(row, i)}
        ${this.getBox(row, counter)}
      `;
    }
    result += `${this.getVerticalBtn(row, rowCount)}`;
    return result;
  }

  renderDotsAndBoxes(rowCount) {
    let result = "";
    for (let i = 1; i < rowCount; i += 2) {
      result += `
        ${this.getHorizontalSides(i, rowCount)}
        ${this.getVerticalSides(i + 1, rowCount)}
      `;
    }
    result += `${this.getHorizontalSides(rowCount, rowCount)}`;
    return result;
  }

  render(rowCount) {
    const html = String.raw;
    this.innerHTML = html`
      <section id="${dotboxGrid}">${this.renderDotsAndBoxes(rowCount)}</section>
    `;
  }
}

customElements.define("dot-boxes-grid", DotBoxesGrid);
