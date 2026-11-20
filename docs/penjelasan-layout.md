# Penjelasan Penerapan Flexbox dan CSS Grid

## Layout Utama (CSS Grid)

File: `src/styles/layout.css`, class `.layout`

Layout utama memakai Grid dua kolom: `240px` untuk sidebar dan `minmax(0, 1fr)` untuk konten. Lebar kolom berubah menjadi `200px` di tablet dan `72px` saat sidebar ditutup. Grid dipilih karena lebar kolom cukup ditentukan di satu tempat dan tidak perlu diatur ulang di setiap komponen.

## Sidebar (Flexbox)

File: `src/styles/sidebar.css`, class `.sidebar`, `.sidebar-header`, `.sidebar-menu`

- `.sidebar` memakai `display: flex` dengan `flex-direction: column` agar logo dan menu tersusun dari atas ke bawah.
- `.sidebar-header` memakai `justify-content: space-between` untuk menaruh judul di kiri dan tombol toggle di kanan.
- `.sidebar-item` memakai `align-items: center` agar ikon dan teks sejajar.
- Di mode ditutup, `justify-content: center` dipakai agar ikon berada di tengah.

## Navbar (CSS Grid)

File: `src/styles/navbar.css`, class `.navbar`

Navbar memakai Grid dengan area bernama (`grid-template-areas`):
- Desktop: `"title search profile"` dalam satu baris.
- Tablet: sama, dengan ukuran yang lebih kecil.
- HP: `"title profile"` di baris pertama dan `"search search"` di baris kedua.

Dengan area bernama, posisi elemen tidak bergantung pada urutan HTML, sehingga susunan bisa berubah hanya dengan mengganti CSS.

## Kartu Statistik (Grid untuk susunan, Flexbox untuk isi)

File: `src/styles/dashboard.css`, class `.stats-grid` dan `.stat-card`

- `.stats-grid` memakai Grid: `repeat(4, minmax(0, 1fr))` di desktop, `repeat(2, ...)` di tablet, dan satu kolom di HP.
- `.stat-card` memakai Flexbox dengan `align-items: center` untuk menempatkan ikon di kiri dan angka serta label di kanan.

## Bagian Bawah Dashboard (CSS Grid)

Class `.dashboard-split` memakai Grid dua kolom (`1.6fr` dan `1fr`) untuk tabel 5 siswa teratas dan daftar siswa tidak aktif. Di tablet dan HP, grid berubah menjadi satu kolom.

## Form Pengaturan (CSS Grid)

Class `.settings-grid` memakai Grid dua kolom untuk field input, dan satu kolom di HP.

## Kolom Aksi dan Tombol (Flexbox)

Class `.student-actions` dan `.settings-actions` memakai Flexbox untuk menyusun tombol berdampingan, dan `column-reverse` di HP agar tombol utama berada di bawah.