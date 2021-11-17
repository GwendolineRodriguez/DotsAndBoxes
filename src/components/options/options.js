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
    this.render();
  }
  setEventListeners() {
    this.playBtn = document.getElementById("playBtn");
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
        />
        <!-- Board -->
        <label for="board" class="${optLabel}">Board</label>
        <span class="${selectInput}">
          <button class="${modularBtn}" data-target="board">
            <img class="icon" src="${arrowBackIcon}" alt="arrowBackIcon" />
          </button>
          <input id="board" value="3 x 3" class="${inputField} ${elemWidth}" />
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
            value="easy"
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

        <a id="playBtn" class="${actionBtn} ${elemWidth}" href="/game">Play</a>
        <a id="scoreBtn" class="${actionBtn} ${elemWidth}" href="/scores"
          >Scores</a
        >
      </section>
    `;
  };
}

customElements.define("game-options", Options);
