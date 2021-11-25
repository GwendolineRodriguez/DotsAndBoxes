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
    this.diffLevels = ["easy", "medium", "difficult"];
  }

  connectedCallback() {
    const playerName = localStorage.getItem("playerName");
    const board = localStorage.getItem("board");
    const boxNumber = localStorage.getItem("boxNumber");
    const difficulty = localStorage.getItem("difficulty");
    this.options = { playerName, board, boxNumber, difficulty };
    console.log(this.options);
    this.render();
    this.setBoardArrowBtns();
    this.setDifficultyArrowBtns();
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

  updateBoardArrowDisplay() {
    this.boardBackBtn.style.display = "flex";
    this.boardForwardBtn.style.display = "flex";
    if (this.options.boxNumber === 4) {
      this.boardBackBtn.style.display = "none";
    }
    if (this.options.boxNumber === 25) {
      this.boardForwardBtn.style.display = "none";
    }
  }

  setBoardArrowBtns() {
    this.boardBackBtn = document.getElementById("boardBackBtn");
    this.boardForwardBtn = document.getElementById("boardForwardBtn");
    this.updateBoardArrowDisplay();
    this.boardBackBtn.addEventListener("click", () => {
      const board = document.getElementById("board");
      const currentBoardValue = board.value;
      board.value = this.getItem(currentBoardValue, -1);
      this.options.boxNumber = this.optionsBoard[board.value];
      this.updateBoardArrowDisplay();
    });
    this.boardForwardBtn.addEventListener("click", () => {
      const board = document.getElementById("board");
      const currentBoardValue = board.value;
      board.value = this.getItem(currentBoardValue, +1);
      this.options.boxNumber = this.optionsBoard[board.value];
      this.updateBoardArrowDisplay();
    });
  }

  updateDiffArrowDisplay(value) {
    this.diffBackBtn.style.display = "flex";
    this.diffForwardBtn.style.display = "flex";
    if (value === "easy") {
      this.diffBackBtn.style.display = "none";
    }
    if (value === "difficult") {
      this.diffForwardBtn.style.display = "none";
    }
  }

  setDifficultyArrowBtns() {
    this.diffBackBtn = document.getElementById("diffBackBtn");
    this.diffForwardBtn = document.getElementById("diffForwardBtn");
    const diffValue = document.getElementById("difficulty").value;
    this.updateDiffArrowDisplay(diffValue);
    this.diffBackBtn.addEventListener("click", () => {
      const diff = document.getElementById("difficulty");
      const currentDiffValueIdx = this.diffLevels.indexOf(diff.value);
      diff.value = this.diffLevels[currentDiffValueIdx - 1];
      this.updateDiffArrowDisplay(diff.value);
    });
    this.diffForwardBtn.addEventListener("click", () => {
      const diff = document.getElementById("difficulty");
      const currentDiffValueIdx = this.diffLevels.indexOf(diff.value);
      diff.value = this.diffLevels[currentDiffValueIdx + 1];
      this.updateDiffArrowDisplay(diff.value);
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
        <button
          id="diffBackBtn"
          class="${modularBtn} ${arrowBack}"
          data-target="difficulty"
        >
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
        <button
          id="diffForwardBtn"
          class="${modularBtn} ${arrowForward}"
          data-target="difficulty"
        >
          <img class="icon" src="${arrowForwardIcon}" alt="arrowForwardIcon" />
        </button>
        <button id="playBtn" class="${actionBtn} ${optElem}">
          Play
          <a href="/game" aria-label="Play"></a>
        </button>
        <a
          id="scoreBtn"
          class="${actionBtn} ${optElem}"
          href="/scores"
          aria-label="Scores"
          >Scores</a
        >
      </section>
    `;
  };
}

customElements.define("game-options", Options);
