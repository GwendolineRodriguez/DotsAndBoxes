class Scores extends HTMLElement {
  constructor() {}

  connectedCallback() {
    this.render();
  }

  render() {
    const html = String.raw;
    this.innerHTML = html`
      <section>
        <h1>Scores</h1>
      </section>
    `;
  }
}

customElements.define("game-scores", Scores);
