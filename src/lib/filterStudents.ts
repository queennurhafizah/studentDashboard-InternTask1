import { Student } from "@/data/student";

export function genderLabel(gender: Student["gender"]): string {
  return gender === "L" ? "Laki-laki" : "Perempuan";
}

export function countByGender(students: Student[], gender: "L" | "P"): number {
  return students.filter((student) => student.gender === gender).length;
}

export function filterStudents(students: Student[], query: string): Student[] {
  const keyword = query.trim().toLowerCase();

  if (keyword === "") return students;

  return students.filter((student) => {
    return (
      student.name.toLowerCase().includes(keyword) ||
      student.nis.toLowerCase().includes(keyword) ||
      student.kelas.toLowerCase().includes(keyword) ||
      genderLabel(student.gender).toLowerCase().includes(keyword)
    );
  });
}