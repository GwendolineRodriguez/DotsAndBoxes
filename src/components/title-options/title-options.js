import { titleOptions, button } from "./title-options.module.css";

class TitleOptions extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }

  render = () => {
    const html = String.raw;
    this.innerHTML = html`
      <section id="${titleOptions}">
        <h1>Dots & Boxes</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          nihil nostrum! Vitae fugit, ut in unde possimus neque placeat iusto
          corporis officia commodi, omnis ab odio nulla velit atque quam!
        </p>
        <a href="/game" class="button">Play</a>
      </section>
    `;
  };
}

customElements.define("title-options", TitleOptions);
