// src/app.js
import './components/AppBar.js';
import './components/NoteInput.js';
import './components/NoteItem.js';
import './components/LoadingIndicator.js';
import NotesAPI from './api/notes-api.js';

const main = async () => {
  const activeNotesListElement = document.getElementById('active-notes-list');
  const archivedNotesListElement = document.getElementById('archived-notes-list');
  const noteInputElement = document.querySelector('note-input');
  const loadingIndicator = document.querySelector('loading-indicator');

  const showLoading = () => (loadingIndicator.style.display = 'block');
  const hideLoading = () => (loadingIndicator.style.display = 'none');

  const showAlert = (message) => alert(message);

  const renderNotes = async () => {
    showLoading();
    try {
      const [activeNotes, archivedNotes] = await Promise.all([
        NotesAPI.getNotes(),
        NotesAPI.getArchivedNotes(),
      ]);

      activeNotesListElement.innerHTML = '';
      archivedNotesListElement.innerHTML = '';

      const createNoteElement = (note) => {
        const noteItem = document.createElement('note-item');
        noteItem.note = note;
        return noteItem;
      };

      if (activeNotes.length > 0) {
        activeNotes.forEach(note => activeNotesListElement.appendChild(createNoteElement(note)));
      } else {
        activeNotesListElement.innerHTML = '<p class="empty-message">Tidak ada catatan aktif.</p>';
      }

      if (archivedNotes.length > 0) {
        archivedNotes.forEach(note => archivedNotesListElement.appendChild(createNoteElement(note)));
      } else {
        archivedNotesListElement.innerHTML = '<p class="empty-message">Tidak ada catatan di arsip.</p>';
      }
    } catch (error) {
      showAlert(error.message);
    } finally {
      hideLoading();
    }
  };

  noteInputElement.addEventListener('note-added', async (event) => {
    showLoading();
    try {
      await NotesAPI.createNote(event.detail);
      await renderNotes();
    } catch (error) {
      showAlert(error.message);
    } finally {
      hideLoading();
    }
  });

  document.body.addEventListener('delete-note', async (event) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      showLoading();
      try {
        await NotesAPI.deleteNote(event.detail);
        await renderNotes();
      } catch (error) {
        showAlert(error.message);
      } finally {
        hideLoading();
      }
    }
  });

  document.body.addEventListener('archive-note', async (event) => {
    showLoading();
    try {
      const noteId = event.detail.id;
      const isArchived = event.detail.archived;
      if (isArchived) {
        await NotesAPI.unarchiveNote(noteId);
      } else {
        await NotesAPI.archiveNote(noteId);
      }
      await renderNotes();
    } catch (error) {
      showAlert(error.message);
    } finally {
      hideLoading();
    }
  });

  // Event listener di NoteItem perlu diubah sedikit untuk mengirim detail { id, archived }
  // Pastikan NoteItem.js mengirimkan:
  // this.dispatchEvent(new CustomEvent('archive-note', { detail: { id: this._note.id, archived: this._note.archived }, bubbles: true }));

  await renderNotes();
};

document.addEventListener('DOMContentLoaded', main);