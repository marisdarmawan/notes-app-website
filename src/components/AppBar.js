class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute('title') || 'Notes App';
    this._shadowRoot.innerHTML = `
      <style>
        header {
          background-color: #4A55A2;
          color: white;
          padding: 1rem;
          text-align: center;
          font-size: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      </style>
      <header>
        <h1>${title}</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);
