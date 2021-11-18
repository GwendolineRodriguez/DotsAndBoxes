import {
  options,
  actionBtn,
  elemWidth,
  inputField,
  optLabel,
  modularBtn,
  selectInput,
} from "./options.module.css";

import arrowBackIcon from "./../../icons/arrow_back_24dp.svg";
import arrowForwardIcon from "./../../icons/arrow_forward_24dp.svg";

class Options extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const playerName = localStorage.getItem("playerName");
    const board = localStorage.getItem("board");
    const difficulty = localStorage.getItem("difficulty");
    this.options = { playerName, board, difficulty };
    this.render();
    this.setEventListeners();
  }
  setEventListeners() {
    this.playBtn = document.getElementById("playBtn");
    const gameLink = this.playBtn.children[0];
    this.playBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      if (name && name != "") {
        localStorage.setItem("playerName", name);
      }
      localStorage.setItem("board", document.getElementById("board").value);
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
        <label for="name" class="${optLabel}">Name</label>
        <input
          class="${inputField} ${elemWidth}"
          id="name"
          required
          minlength="4"
          maxlength="8"
          size="10"
          placeholder="Player 1"
          value="${this.options.playerName}"
        />
        <!-- Board -->
        <label for="board" class="${optLabel}">Board</label>
        <span class="${selectInput}">
          <button class="${modularBtn}" data-target="board">
            <img class="icon" src="${arrowBackIcon}" alt="arrowBackIcon" />
          </button>
          <input
            id="board"
            value="${this.options.board}"
            class="${inputField} ${elemWidth}"
          />
          <button class="${modularBtn}" data-target="board">
            <img
              class="icon"
              src="${arrowForwardIcon}"
              alt="arrowForwardIcon"
            />
          </button>
        </span>
        <!-- Difficulty -->
        <label for="difficulty" class="${optLabel}">Difficulty</label>
        <span class="${selectInput}">
          <button class="${modularBtn}" data-target="difficulty">
            <img class="icon" src="${arrowBackIcon}" alt="arrowBackIcon" />
          </button>
          <input
            id="difficulty"
            value="${this.options.difficulty}"
            class="${inputField} ${elemWidth}"
          />
          <button class="${modularBtn}" data-target="difficulty">
            <img
              class="icon"
              src="${arrowForwardIcon}"
              alt="arrowForwardIcon"
            />
          </button>
        </span>
        <button id="playBtn" class="${actionBtn} ${elemWidth}">
          Play
          <a href="/game"></a>
        </button>
        <a id="scoreBtn" class="${actionBtn} ${elemWidth}" href="/scores"
          >Scores</a
        >
      </section>
    `;
  };
}

customElements.define("game-options", Options);
