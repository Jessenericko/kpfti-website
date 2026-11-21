# Sistem Informasi Kerja Praktik FTI UNTAR (Prototipe)

Prototipe front-end hasil rancangan ulang UI/UX website KPFTI (tugas HCI). Ini hanya front-end, tanpa backend: semua data disimpan di `localStorage` browser masing-masing pengguna.

## Halaman

| File | Isi |
|---|---|
| `index.html` | Beranda |
| `login.html`, `register.html` | Login dan registrasi akun |
| `dashboard.html` | Dasbor dan menu utama |
| `profile.html` | Ubah nama, email, dan password |
| `data-kp.html` | Tab Pendaftaran KP, Laporan Akhir & Abstrak, dan Program KP |
| `tempat-kp.html` | Tab History (cari dan halaman) dan Lowongan |
| `pengumuman.html`, `alur-kp.html` | Pengumuman dan alur KP |

## Cara kerja fitur

- **Login**: tombol baru aktif setelah username dan password diisi.
  - NIM yang sudah terdaftar harus memakai password yang benar.
  - NIM yang belum terdaftar langsung dibuatkan akun demo, supaya responden bisa langsung mencoba.
- **Register**: NIM harus 9 angka, email harus valid, dan password minimal 6 karakter. Jika NIM sudah terdaftar, muncul pop-up "Tidak dapat mendaftarkan akun untuk saat ini."
- **Data KP**:
  - Kolom Tempat KP memberi saran nama perusahaan, lalu mengisi alamat dan kontak secara otomatis.
  - Unggah file mengecek format dan ukuran file. Yang disimpan hanya nama dan ukurannya, bukan isi file.
  - Abstrak harus 100–200 kata dan dilengkapi penghitung kata.
- Data perusahaan di `js/data.js` adalah data contoh.

## Upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `kpfti`. Jadikan **Public**.
2. Klik **Add file → Upload files**. Seret **semua isi** folder ini (bukan folder induknya), lalu klik **Commit changes**.
3. Buka **Settings → Pages**. Pada *Source* pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
4. Tunggu 1–2 menit. Situs akan aktif di `https://<username>.github.io/kpfti/`.

Untuk mencoba tanpa internet, buka `index.html` langsung di browser. Font bawaan desain diambil dari Google Fonts, jadi tampilannya paling sesuai saat online.

## Struktur

```
css/style.css   tema dan tampilan responsif (laptop/PC dan HP)
js/app.js       header, sidebar, footer, sesi login, toast, tab, pemilih file
js/auth.js      login dan register
js/profile.js   halaman profil
js/data-kp.js   halaman Data KP
js/tempat-kp.js tabel Tempat KP
js/data.js      data contoh perusahaan dan lowongan
assets/         logo, foto gedung, favicon
```
