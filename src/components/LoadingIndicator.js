// src/components/LoadingIndicator.js
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #4A55A2;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loader"></div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);