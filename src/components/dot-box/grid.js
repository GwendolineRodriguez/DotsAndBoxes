import {
  dotboxGrid,
  dot,
  sideBtn,
  selectable,
  horizonBtn,
  verticaBtn,
  player1Color,
  player2Color,
} from "./dotsAndBoxes.module.css";

class GameGrid {
  constructor() {
    this.classes = this.getClasses();
  }

  getClasses() {
    return {
      sideBtn: `${sideBtn}`,
      selectable: `${selectable}`,
      player1Color: `${player1Color}`,
      player2Color: `${player2Color}`,
      dotboxGrid: `${dotboxGrid}`,
    };
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

  component(rowCount) {
    const html = String.raw;
    return html`
      <section id="${dotboxGrid}">${this.renderDotsAndBoxes(rowCount)}</section>
    `;
  }
}

export default GameGrid;
