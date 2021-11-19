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
    this.boxNumber = 9;

    this.options = { playerName, board, difficulty };
    console.log(this.options);
    this.state = new GameController(this.options);
    this.state.setUpClasses(this.classes);
    this.render();
    this.state.setUpEventListeners();
  }

  getHorizontalSides = (row) => {
    const html = String.raw;
    return html`
      <span class="${dot}"></span>
      <button
        id="r${row}c2"
        class="${sideBtn} ${selectable} ${horizonBtn}"
      ></button>
      <span class="${dot}"></span>
      <button
        id="r${row}c4"
        class="${sideBtn} ${selectable} ${horizonBtn}"
      ></button>
      <span class="${dot}"></span>
      <button
        id="r${row}c6"
        class="${sideBtn} ${selectable} ${horizonBtn}"
      ></button>
      <span class="${dot}"></span>
    `;
  };

  getVerticalSides = (row) => {
    const html = String.raw;
    // let result = "";
    // for (let i = 1; i < this.boxNumber - 2; i += 2) {
    //   result += `
    //     ${this.getHorizontalSides(i)}
    //     ${this.getVerticalSides(i + 1)}
    //   `;
    // }

    return html`
      <button
        id="r${row}c1"
        class="${sideBtn} ${selectable} ${verticaBtn}"
      ></button>
      <div id="r${row}Content1"></div>
      <button
        id="r${row}c3"
        class="${sideBtn} ${selectable} ${verticaBtn}"
      ></button>
      <div id="r${row}Content2"></div>
      <button
        id="r${row}c5"
        class="${sideBtn} ${selectable} ${verticaBtn}"
      ></button>
      <div id="r${row}Content3"></div>
      <button
        id="r${row}c7"
        class="${sideBtn} ${selectable} ${verticaBtn}"
      ></button>
    `;
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
