"use client";

import { filterStudents } from "@/lib/filterStudents";
import { useSearch } from "@/components/searchProvider";
import { useStudents } from "@/components/context/studentsProvider";
import StudentTable from "@/components/students/studentTable";

export default function StudentsView() {
  const { students } = useStudents();
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