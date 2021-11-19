import {
  options,
  actionBtn,
  optElem,
  inputField,
  optLabel,
  modularBtn,
  arrowBack,
  arrowForward,
} from "./options.module.css";

import arrowBackIcon from "./../../icons/arrow_back_24dp.svg";
import arrowForwardIcon from "./../../icons/arrow_forward_24dp.svg";

class Options extends HTMLElement {
  constructor() {
    super();
    this.optionsBoard = {
      "2x2": 4,
      "3x3": 9,
      "4x4": 16,
      "5x5": 25,
    };
  }

  connectedCallback() {
    const playerName = localStorage.getItem("playerName");
    const board = localStorage.getItem("board");
    const boxNumber = localStorage.getItem("boxNumber");
    const difficulty = localStorage.getItem("difficulty");
    this.options = { playerName, board, boxNumber, difficulty };
    console.log(this.options);
    this.render();
    this.setArrowBtns();
    this.setPlayBtnEvent();
  }

  getItem(key, i) {
    var keys = Object.keys(this.optionsBoard).sort(function (a, b) {
      return a - b;
    });
    var index = keys.indexOf(key);
    if ((i == -1 && index > 0) || (i == 1 && index < keys.length - 1)) {
      index = index + i;
    }
    return keys[index];
  }

  updateArrowDisplay() {
    this.boardBackBtn.style.display = "flex";
    this.boardForwardBtn.style.display = "flex";
    if (this.options.boxNumber === 4) {
      this.boardBackBtn.style.display = "none";
    }
    if (this.options.boxNumber === 25) {
      this.boardForwardBtn.style.display = "none";
    }
  }

  setArrowBtns() {
    this.boardBackBtn = document.getElementById("boardBackBtn");
    this.boardForwardBtn = document.getElementById("boardForwardBtn");
    this.updateArrowDisplay();
    this.boardBackBtn.addEventListener("click", () => {
      const board = document.getElementById("board");
      const currentBoardValue = board.value;
      board.value = this.getItem(currentBoardValue, -1);
      this.options.boxNumber = this.optionsBoard[board.value];
      this.updateArrowDisplay();
    });
    this.boardForwardBtn.addEventListener("click", () => {
      const board = document.getElementById("board");
      const currentBoardValue = board.value;
      board.value = this.getItem(currentBoardValue, +1);
      this.options.boxNumber = this.optionsBoard[board.value];
      this.updateArrowDisplay();
    });
  }

  setPlayBtnEvent() {
    this.playBtn = document.getElementById("playBtn");
    const gameLink = this.playBtn.children[0];
    this.playBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const board = document.getElementById("board").value;
      if (name && name != "") {
        localStorage.setItem("playerName", name);
      }
      localStorage.setItem("board", board);
      localStorage.setItem("boxNumber", this.optionsBoard[board]);
      localStorage.setItem(
        "difficulty",
        document.getElementById("difficulty").value
      );
      // dispatch event to anchor /game so that
      // router gets triggered after getting options
      gameLink.dispatchEvent(new Event("click"));
    });
  }

  render = () => {
    const html = String.raw;
    this.innerHTML = html`
      <section id="${options}">
        <!-- Name -->
        <label for="name" class="${optLabel} ${optElem}"
          >Name
          <input
            class="${inputField}"
            id="name"
            required
            minlength="4"
            maxlength="8"
            size="10"
            placeholder="Player 1"
            value="${this.options.playerName}"
          />
        </label>
        <!-- Board -->
        <button
          id="boardBackBtn"
          class="${modularBtn} ${arrowBack}"
          data-target="board"
        >
          <img class="icon" src="${arrowBackIcon}" alt="arrowBackIcon" />
        </button>
        <label for="board" class="${optLabel} ${optElem}"
          >Board
          <input
            id="board"
            value="${this.options.board}"
            class="${inputField}"
            disabled
          />
        </label>
        <button
          id="boardForwardBtn"
          class="${modularBtn} ${arrowForward}"
          data-target="board"
        >
          <img class="icon" src="${arrowForwardIcon}" alt="arrowForwardIcon" />
        </button>
        <!-- Difficulty -->
        <button class="${modularBtn} ${arrowBack}" data-target="difficulty">
          <img class="icon" src="${arrowBackIcon}" alt="arrowBackIcon" />
        </button>
        <label for="difficulty" class="${optLabel} ${optElem}"
          >Difficulty
          <input
            id="difficulty"
            value="${this.options.difficulty}"
            class="${inputField} ${optElem}"
            disabled
          />
        </label>
        <button class="${modularBtn} ${arrowForward}" data-target="difficulty">
          <img class="icon" src="${arrowForwardIcon}" alt="arrowForwardIcon" />
        </button>
        <button id="playBtn" class="${actionBtn} ${optElem}">
          Play
          <a href="/game"></a>
        </button>
        <a id="scoreBtn" class="${actionBtn} ${optElem}" href="/scores"
          >Scores</a
        >
      </section>
    `;
  };
}

customElements.define("game-options", Options);
