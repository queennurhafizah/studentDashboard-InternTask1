# Student Dashboard

Dashboard sederhana untuk menampilkan dan mengelola data siswa, dibuat dengan Next.js (App Router), React, TypeScript, dan Material UI (MUI).

Project ini dibuat sebagai tugas praktik frontend di [nama tempat prakerin]. Seluruh data bersifat dummy dan disimpan di state lokal, sehingga akan kembali ke data awal saat halaman di-refresh.

## Teknologi

- Next.js 16 (App Router) dan React
- TypeScript
- Material UI (`@mui/material`, `@mui/icons-material`)
- CSS biasa dengan Flexbox dan CSS Grid (tanpa Tailwind)
- Git dan GitHub

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Fitur

**Dashboard**
- Sapaan dengan tahun ajaran, semester, dan nama admin dari pengaturan
- Empat kartu statistik: Total Siswa, Siswa Perempuan, Siswa Laki-laki, dan Total Kelas
- Cuplikan 5 siswa teratas dan daftar siswa tidak aktif

**Data Siswa**
- Tabel berisi No, Nama, NIS, Kelas, Jenis Kelamin, dan Status
- Pencarian berdasarkan nama, NIS, kelas, atau jenis kelamin (dari navbar)
- Tambah, ubah, dan hapus data siswa, dengan validasi wajib isi dan NIS tidak boleh ganda
- Pagination dengan pilihan 5 atau 10 baris per halaman

**Pengaturan**
- Informasi pengguna dan informasi sekolah
- Perubahan disimpan ke state, dengan validasi nama, email, nama sekolah, dan tahun ajaran

**Umum**
- Sidebar yang bisa dibuka dan ditutup, dan tampil sebagai ikon saat ditutup
- Navbar dan layout responsif untuk desktop, tablet, dan HP
- Tema warna MUI dibuat di `src/lib/theme.ts`

## Struktur Folder

```
src/
├── app/            Routing Next.js (layout, halaman, globals.css)
├── components/
│   ├── layout/     Sidebar, Navbar, DashboardShell
│   ├── dashboard/  StatCard, InactiveStudents
│   ├── students/   StudentsView, StudentTable, dialog tambah/ubah/hapus
│   ├── settings/   SettingsForm
│   └── shared/     SearchProvider, ThemeRegistry
├── context/        StudentsProvider, SettingsProvider (state global)
├── data/           Data dummy siswa dan pengaturan
├── lib/            Fungsi filter, hitung gender, dan tema MUI
└── styles/         CSS per fitur (layout, sidebar, navbar, dashboard, students, settings)
```

##