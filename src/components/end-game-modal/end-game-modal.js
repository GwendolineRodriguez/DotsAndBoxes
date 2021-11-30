import {
  closeModal,
  hidden,
  modal,
  overlay,
  modalBtn,
  actionBtns,
  playerScores,
  endGameModalTitle,
} from "./end-game-modal.module.css";
import replayIcon from "./../../icons/replay_black_24dp.svg";
import homeIcon from "./../../icons/home_black_24dp.svg";

class EndGameModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.modal = document.querySelector(`.${modal}`);
    this.modalTitle = document.getElementById(`${endGameModalTitle}`);
    this.overlay = document.querySelector(`.${overlay}`);
    this.btnCloseModal = document.getElementById("closeModalBtn");
    this.playerScore1 = document.getElementById("playerScore1");
    this.playerScore2 = document.getElementById("playerScore2");
    this.homeBtn = document.getElementById("homeBtn");
    this.replayBtn = document.getElementById("replayBtn");
    this.btnCloseModal.addEventListener("click", this.close);
    this.overlay.addEventListener("click", this.close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !this.modal.classList.contains(`${hidden}`)) {
        this.close();
      }
    });
  }

  render() {
    const html = String.raw;
    this.innerHTML = html`
      <div
        role="dialog"
        class="${modal} ${hidden}"
        aria-hidden="true"
        aria-labelledby="${endGameModalTitle}"
      >
        <button id="closeModalBtn" class="${closeModal}">&times;</button>
        <h1 id="${endGameModalTitle}">Player wins ! 🥳🔥</h1>
        <div role="document" class="${playerScores}">
          <p id="playerScore1"></p>
          <p id="playerScore2"></p>
        </div>
        <div id="${actionBtns}">
          <a
            id="replayBtn"
            class="${modalBtn}"
            href="/game"
            aria-label="Replay"
          >
            <img class="icon" src="${replayIcon}" alt="replayIcon" />
          </a>
          <a id="homeBtn" class="${modalBtn}" href="/" aria-label="Home">
            <img class="icon" src="${homeIcon}" alt="homeIcon" />
          </a>
        </div>
      </div>
      <div class="${overlay} ${hidden}" aria-hidden="true"></div>
    `;
  }

  open(state) {
    const html = String.raw;
    const player1 = state.player1;
    const player2 = state.player2;
    this.setBtnEventListeners(state);
    this.modalTitle.innerHTML = `${state.winner} wins ! 🥳🔥`;
    this.playerScore1.innerHTML = html` ${player1.name}<br />${player1.score} `;
    this.playerScore2.innerHTML = html` ${player2.name}<br />${player2.score} `;
    this.modal.classList.remove(`${hidden}`);
    this.modal.removeAttribute("aria-hidden");
    this.overlay.classList.remove(`${hidden}`);
    this.overlay.removeAttribute("aria-hidden");
    this.homeBtn.focus();
  }

  close() {
    this.modal.classList.add(`${hidden}`);
    this.overlay.classList.add(`${hidden}`);
    this.modal.setAttribute("aria-hidden", "true");
    this.overlay.setAttribute("aria-hidden", "true");
  }

  setBtnEventListeners(state) {
    this.homeBtn.addEventListener("click", this.close);
    this.replayBtn.addEventListener("click", (e) => {
      this.close();
      state.resetGame();
    });
  }
}

customElements.define("end-game-modal", EndGameModal);
