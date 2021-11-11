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
    this.boxNumber = Number(this.getAttribute("boxNumber"));
    this.state = new GameController(this.boxNumber);
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

  render = () => {
    const html = String.raw;
    this.innerHTML = html`
      <section id="${dotboxGrid}">
        <!-- first dotted line -->
        ${this.getHorizontalSides(1)}
        <!-- first row -->
        ${this.getVerticalSides(2)}
        <!-- second dotted line -->
        ${this.getHorizontalSides(3)}
        <!-- second row -->
        ${this.getVerticalSides(4)}
        <!-- third dotted line -->
        ${this.getHorizontalSides(5)}
        <!-- third row -->
        ${this.getVerticalSides(6)}
        <!-- fourth dotted line -->
        ${this.getHorizontalSides(7)}
      </section>
    `;
  };
}

customElements.define("dot-boxes-grid", DotBoxesGrid);
