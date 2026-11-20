"use client";

import { Student } from "@/data/student";
import { filterStudents } from "@/lib/filterStudents";
import { useSearch } from "@/components/searchProvider";
import StudentTable from "@/components/students/studentTable";

type StudentsViewProps = {
  students: Student[];
};

export default function StudentsView({ students }: StudentsViewProps) {
  const { query } = useSearch();
  const filtered = filterStudents(students, query);
  const isFiltering = query.trim() !== "";

  return (
    <section className="students-card">
      <div className="students-card-header">
        <h2 className="students-card-title">Daftar Siswa</h2>
        <span className="students-card-count">
          {isFiltering
            ? `${filtered.length} dari ${students.length} siswa`
            : `${students.length} siswa`}
        </span>
      </div>

      <StudentTable students={filtered} />
    </section>
  );
}