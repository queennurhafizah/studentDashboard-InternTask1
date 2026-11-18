export type UserProfile = {
  nama: string;
  email: string;
  nip: string;
  telepon: string;
  jabatan: string;
};

export type SchoolInfo = {
  namaSekolah: string;
  npsn: string;
  tahunAjaran: string;
  semester: string;
  emailSekolah: string;
  teleponSekolah: string;
};

export const initialUser: UserProfile = {
  nama: "Queen Nur Hafizah",
  email: "Queen@smk.sch.id",
  nip: "198501012010011001",
  telepon: "081249625724",
  jabatan: "Admin",
};

export const initialSchool: SchoolInfo = {
  namaSekolah: "SMK Telkom Malang",
  npsn: "20512345",
  tahunAjaran: "2026/2027",
  semester: "Ganjil",
  emailSekolah: "smkTelkom@smk.sch.id",
  teleponSekolah: "0352123456",
};