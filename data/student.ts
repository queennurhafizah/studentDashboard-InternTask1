export type Student = {
    id: number;
    name: string;
    nis: string;
    kelas: string;
    gender: "L" | "P";
    status: "Aktif" | "Tidak Aktif";
}

export const students: Student[] = [
    {id: 1, name: "Andika", nis: "123456", kelas: "XII IPA 1", gender: "L", status: "Aktif"},
    {id: 2, name: "Budi", nis: "123457", kelas: "XII IPA 2", gender: "L", status: "Aktif"},
    {id: 3, name: "Citra", nis: "123458", kelas: "XII IPA 3", gender: "P", status: "Aktif"},
    {id: 4, name: "Dewi", nis: "123459", kelas: "XII IPA 4", gender: "P", status: "Tidak Aktif"},
    {id: 5, name: "Eko", nis: "123460", kelas: "XII IPA 5", gender: "L", status: "Aktif"},
    {id: 6, name: "Fajar", nis: "123461", kelas: "XII IPA 6", gender: "L", status: "Aktif"},
    {id: 7, name: "Gita", nis: "123462", kelas: "XII IPA 7", gender: "P", status: "Aktif"},
    {id: 8, name: "Hadi", nis: "123463", kelas: "XII IPA 8", gender: "L", status: "Tidak Aktif"},
    {id: 9, name: "Indah", nis: "123464", kelas: "XII IPA 9", gender: "P", status: "Aktif"},
    {id: 10, name: "Joko", nis: "123465", kelas: "XII IPA 10", gender: "L", status: "Aktif"},
]