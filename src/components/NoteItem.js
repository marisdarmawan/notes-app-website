// components/NoteItem.js

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  connectedCallback() {
    this.addEventListeners();
  }

  addEventListeners() {
    // Event listener untuk tombol aksi
    this._shadowRoot.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
        this.dispatchEvent(new CustomEvent('delete-note', { detail: this._note.id, bubbles: true }));
      }
      if (event.target.classList.contains('archive-button')) {
        // Kirim objek yang berisi id dan status archived
        this.dispatchEvent(new CustomEvent('archive-note', {
          detail: {
            id: this._note.id,
            archived: this._note.archived
          },
          bubbles: true
        }));
      }
    });
  }

  render() {
    const formattedDate = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Teks tombol arsip berubah sesuai status
    const archiveButtonText = this._note.archived ? 'Pindahkan' : 'Arsipkan';

    this._shadowRoot.innerHTML = `
      <style>
        .note-card {
          background-color: ${this._note.archived ? '#E8E8E8' : '#fff'}; /* Warna beda untuk arsip */
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 5px solid ${this._note.archived ? '#A0A0A0' : '#4A55A2'};
        }
        h3 {
          margin: 0 0 0.5rem 0;
          color: #4A55A2;
        }
        .note-date {
          font-size: 0.8rem;
          color: #777;
          margin-bottom: 1rem;
        }
        p {
          margin: 0 0 1.5rem 0; /* Beri ruang untuk tombol */
          color: #333;
          flex-grow: 1;
          white-space: pre-wrap;
        }
        .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: auto; /* Dorong tombol ke bawah */
        }
        .action-buttons button {
          flex-grow: 1;
          padding: 0.6rem;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .delete-button {
          background-color: #D63447;
          color: white;
        }
        .delete-button:hover {
          background-color: #B02A37;
        }
        .archive-button {
          background-color: #FFC436;
          color: #333;
        }
        .archive-button:hover {
          background-color: #D9A429;
        }
      </style>
      <div class="note-card">
        <h3>${this._note.title}</h3>
        <span class="note-date">${formattedDate}</span>
        <p>${this._note.body}</p>
        <div class="action-buttons">
          <button class="delete-button">Hapus</button>
          <button class="archive-button">${archiveButtonText}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);