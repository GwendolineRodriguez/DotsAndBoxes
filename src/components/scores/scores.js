class Scores extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.scores = JSON.parse(localStorage.getItem("scores"));
    this.render();
  }

  getScores() {
    const html = String.raw;
    let newScores = "";
    for (let score of this.scores) {
      newScores += html`
        <tr>
          <td>${score.player1.name}(${score.player1.score})</td>
          <td>${score.player2.name}(${score.player2.score})</td>
          <td>${score.board}</td>
        </tr>
      `;
    }
    return newScores;
  }

  render() {
    const html = String.raw;
    this.innerHTML = html`
      <section>
        <h1>Scores</h1>
        <table>
          <tr>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Board</th>
          </tr>
          ${this.getScores()}
      </section>
    `;
  }
}

customElements.define("game-scores", Scores);
