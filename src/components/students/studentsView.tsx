"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { filterStudents } from "@/lib/filterStudents";
import { useSearch } from "@/components/searchProvider";
import { useStudents } from "@/components/context/studentsProvider";
import StudentTable from "@/components/students/studentTable";
import StudentFormDialog from "@/components/students/studentFormDialog";

export default function StudentsView() {
  const { students, addStudent } = useStudents();
  const { query } = useSearch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = filterStudents(students, query);
  const isFiltering = query.trim() !== "";

  return (
    <section className="students-card">
      <div className="students-card-header">
        <div className="students-card-heading">
          <h2 className="students-card-title">Daftar Siswa</h2>
          <span className="students-card-count">
            {isFiltering
              ? `${filtered.length} dari ${students.length} siswa`
              : `${students.length} siswa`}
          </span>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="students-add-btn"
          onClick={() => setDialogOpen(true)}
        >
          Tambah Siswa
        </Button>
      </div>

      <StudentTable students={filtered} />

      <StudentFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={addStudent}
      />
    </section>
  );
}