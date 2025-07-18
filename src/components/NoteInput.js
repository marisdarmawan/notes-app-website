class NoteInput extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.MAX_TITLE_LENGTH = 50;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        .form-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: #C5DFF8;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
        }
        input[type="text"], textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #4A55A2;
        }
        .char-counter {
          font-size: 0.8rem;
          color: #555;
          text-align: right;
        }
        button {
          width: 100%;
          padding: 0.8rem;
          background-color: #4A55A2;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #7895CB;
        }
        .error-message {
          color: red;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          display: none;
        }
      </style>
      <div class="form-container">
        <form id="note-form">
          <h2>Buat Catatan Baru</h2>
          <div class="form-group">
            <label for="note-title">Judul</label>
            <input type="text" id="note-title" name="title" required maxlength="${this.MAX_TITLE_LENGTH}">
            <div class="char-counter">
              Sisa karakter: <span id="title-char-counter">${this.MAX_TITLE_LENGTH}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="note-body">Isi Catatan</label>
            <textarea id="note-body" name="body" rows="5" required></textarea>
          </div>
          <button type="submit">Tambah Catatan</button>
          <p id="form-error" class="error-message">Judul dan isi catatan tidak boleh kosong!</p>
        </form>
      </div>
    `;
  }

  addEventListeners() {
    const form = this._shadowRoot.getElementById('note-form');
    const titleInput = this._shadowRoot.getElementById('note-title');
    const bodyInput = this._shadowRoot.getElementById('note-body');
    const charCounter = this._shadowRoot.getElementById('title-char-counter');
    const errorMessage = this._shadowRoot.getElementById('form-error');

    titleInput.addEventListener('input', () => {
      const remaining = this.MAX_TITLE_LENGTH - titleInput.value.length;
      charCounter.textContent = remaining;
      errorMessage.style.display = 'none';
    });

    bodyInput.addEventListener('input', () => {
       errorMessage.style.display = 'none';
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (!title || !body) {
        errorMessage.style.display = 'block';
        return;
      }

      const newNote = { title, body };
      this.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));
      form.reset();
      charCounter.textContent = this.MAX_TITLE_LENGTH;
    });
  }
}

customElements.define('note-input', NoteInput);
