# ☁️ SkyPortfolio - Portofolio Web Tema Awan Biru Putih & Glassmorphism

Selamat! Website portofolio interaktif bertema **Awan Biru Putih (Soft Sky & Glassmorphism)** telah berhasil dibuat. Website ini ringan, responsif, modern, dan siap diunggah langsung ke **GitHub Pages**.

---

## 🌟 Fitur Utama Website

1. **Desain Soft Sky & Glassmorphism**: Kombinasi warna biru langit lembut, efek kaca transparan (*backdrop blur*), dan animasi awan melayang.
2. **Dual Mode (Day Sky & Night Sky)**: Tombol toggle switch di pojok kanan atas untuk mengubah suasana langit (Siang: Awan Cerah, Malam: Bintang Bertaburan).
3. **Showcase 5 Proyek Utama**:
   - Filter Kategori (`Semua`, `Web App`, `Mobile App`, `AI & Cloud`).
   - Kartu proyek dengan efek hover zoom & badge teknologi.
   - **Pop-up Detail Proyek (Modal)**: Menampilkan fitur lengkap, teknologi, link demo, dan link repo GitHub.
4. **Hero Dynamic Typing**: Teks peran developer yang mengetik secara otomatis.
5. **Interactive Sky Canvas (`js/clouds.js`)**: Animasi awan melayang dengan reaksi pergerakan mouse kursor pengguna.
6. **Statistik Counter Animasi**: Angka statistik proyek yang menghitung otomatis saat di-scroll.
7. **Formulir Kontak & Salin Email**: Tombol instan salin alamat email ke clipboard dengan notifikasi toast.
8. **100% Siap GitHub Pages**: Tanpa perlu install Node.js/build tools complex, cukup upload file HTML, CSS, dan JS ke GitHub Repository.

---

## 📁 Struktur File Project

```text
D:\Portofolio Web\
 ├── index.html           # File HTML utama (Semantic & SEO Friendly)
 ├── css/
 │    └── style.css       # Design System (Variabel Warna Sky, Glassmorphism, Animations, Responsive)
 ├── js/
 │    ├── clouds.js       # Visual Canvas animasi awan & bintang interaktif
 │    └── app.js          # Logic utama (Data 5 proyek, modal, filter, typing, theme switch)
 └── assets/
      └── images/         # Foto sampel 5 proyek dan avatar
           ├── avatar.jpg
           ├── cloudsync.jpg
           ├── nimbuspay.jpg
           ├── aetherai.jpg
           ├── skyflow.jpg
           └── lumina.jpg
```

---

## 🛠️ Cara Mengubah Data 5 Proyek Anda

Untuk mengganti data 5 sampel proyek menjadi proyek asli Anda:

1. Buka file `js/app.js`.
2. Cari variabel `PROJECTS_DATA` di baris paling atas.
3. Ubah judul (`title`), deskripsi (`description`), foto (`image`), tag teknologi (`tags`), fitur (`features`), link demo (`demoUrl`), dan link GitHub (`githubUrl`).
4. Ganti foto proyek di folder `assets/images/` dengan gambar screenshot proyek asli Anda.

---

## 🚀 Cara Upload & Publish ke GitHub Pages

Berikut langkah-langkah mudah mengunggah portofolio ini ke GitHub Pages agar bisa diakses seluruh dunia:

### Langkah 1: Buat Repository Baru di GitHub
1. Buka [GitHub.com](https://github.com) dan buat repository baru.
2. Beri nama repository, misalnya: `portofolio-web` atau `username.github.io`.
3. Pilih **Public**, lalu klik **Create repository**.

### Langkah 2: Upload File ke GitHub
Anda bisa mengunggah file menggunakan **Git CLI** atau langsung via halaman **Upload Files** di web GitHub:

#### Cara A: Menggunakan Git CLI (Terminal / VS Code)
Buka terminal di folder project ini (`D:\Portofolio Web`) dan jalankan:
```bash
git init
git add .
git commit -m "Initial commit - Sky Portfolio Web"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO-ANDA.git
git push -u origin main
```

#### Cara B: Menggunakan Web GitHub Drag & Drop
1. Di halaman repository GitHub Anda, klik **Add file** -> **Upload files**.
2. Drag & drop seluruh folder dan file (`index.html`, folder `css`, `js`, `assets`, `README.md`).
3. Klik **Commit changes**.

---

### Langkah 3: Aktifkan GitHub Pages (Gratis!)
1. Masuk ke halaman **Settings** di repository GitHub Anda.
2. Klik menu **Pages** di bilah navigasi sebelah kiri.
3. Pada opsi **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` (atau `master`) dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu sekitar 1 - 2 menit. URL website Anda akan muncul di bagian atas halaman:
   👉 **`https://username-anda.github.io/nama-repo/`**

---

### 💡 Tips Tambahan
- Untuk mengganti foto avatar profil Anda, cukup ganti file `assets/images/avatar.jpg` dengan foto profil Anda sendiri.
- Anda bisa menambahkan CV format PDF ke folder `assets/` dan mengubah link download di `index.html`.
