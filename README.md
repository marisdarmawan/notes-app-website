# Notes App v2 - Webpack & API

Aplikasi web pencatatan sederhana yang dibangun sebagai submission untuk kelas "Belajar Fundamental Front-End Web Development" di Dicoding. Proyek ini merupakan versi lanjutan yang telah di-upgrade untuk menggunakan RESTful API sebagai sumber data dan Webpack sebagai module bundler.

## ✨ Fitur Utama

* **Buat Catatan**: Menambahkan catatan baru (judul dan isi).
* **Tampilkan Catatan**: Menampilkan daftar catatan aktif dan yang diarsip secara terpisah.
* **Hapus Catatan**: Menghapus catatan secara permanen.
* **Arsipkan & Pindahkan**: Memindahkan catatan antara daftar aktif dan arsip.
* **Data Persisten**: Semua data disimpan dan diambil melalui [Dicoding Notes API](https://notes-api.dicoding.dev/v2).
* **Indikator Loading**: Menampilkan animasi loading saat terjadi proses request ke API.
* **Umpan Balik Error**: Menampilkan pesan error jika request ke API gagal.
* **Desain Responsif**: Tampilan dapat beradaptasi dengan baik di berbagai ukuran layar, dari mobile hingga desktop.

## 💻 Teknologi yang Digunakan

* **HTML5**
* **CSS3** (dengan CSS Grid untuk layout)
* **JavaScript (ES6+)**
* **Web Components**: Untuk membangun UI yang modular (`<app-bar>`, `<note-item>`, dll).
* **Webpack**: Sebagai module bundler untuk development dan production build.
* **Prettier**: Untuk menjaga konsistensi dan kerapian format kode.

## ⚙️ Instalasi dan Setup

Pastikan Anda sudah memiliki [Node.js](https://nodejs.org/) (disarankan versi LTS) terinstal di sistem Anda.

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/marisdarmawan/notes-app-website.git](https://github.com/marisdarmawan/notes-app-website.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd NAMA-REPOSITORI
    ```

3.  **Install semua dependensi yang dibutuhkan:**
    ```bash
    npm install
    ```

## ▶️ Menjalankan Aplikasi

Proyek ini memiliki beberapa skrip yang tersedia untuk dijalankan:

* **Menjalankan mode development:**
    Perintah ini akan menjalankan aplikasi dengan `webpack-dev-server` yang dilengkapi fitur hot-reload.
    ```bash
    npm run start-dev
    ```
    Aplikasi akan otomatis terbuka di browser Anda pada alamat `http://localhost:8080` (atau port lain jika 8080 sudah terpakai).

* **Membuat build untuk production:**
    Perintah ini akan membuat versi optimasi dari aplikasi Anda di dalam folder `/dist`.
    ```bash
    npm run build
    ```

* **Menjalankan hasil build production:**
    Untuk melihat hasil dari `npm run build`, Anda bisa menggunakan `serve`. Jika belum terinstal, jalankan `npm install -g serve`.
    ```bash
    serve -s dist
    ```
    Aplikasi akan tersedia di `http://localhost:3000`.

---
Dibuat oleh Mohammad Aris Darmawan untuk submission Dicoding.
