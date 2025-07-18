// src/api/notes-api.js
class NotesAPI {
  static BASE_URL = 'https://notes-api.dicoding.dev/v2';

  static async _fetchWithAuth(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    if (response.status >= 400) {
      throw new Error(responseJson.message || 'Request failed');
    }

    return responseJson;
  }

  static async getNotes() {
    const response = await this._fetchWithAuth(`${this.BASE_URL}/notes`);
    return response.data;
  }

  static async getArchivedNotes() {
    const response = await this._fetchWithAuth(`${this.BASE_URL}/notes/archived`);
    return response.data;
  }

  static async createNote({ title, body }) {
    return this._fetchWithAuth(`${this.BASE_URL}/notes`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
    });
  }

  static async deleteNote(noteId) {
    return this._fetchWithAuth(`${this.BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
  }

  static async archiveNote(noteId) {
    return this._fetchWithAuth(`${this.BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    });
  }

  static async unarchiveNote(noteId) {
    return this._fetchWithAuth(`${this.BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    });
  }
}

export default NotesAPI;