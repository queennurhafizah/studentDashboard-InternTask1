"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { filterStudents } from "@/lib/filterStudents";
import { useSearch } from "@/components/searchProvider";
import { useStudents } from "@/components/context/studentsProvider";
import { Student } from "@/data/student";
import StudentTable from "@/components/students/studentTable";
import StudentFormDialog from "@/components/students/studentFormDialog";

export default function StudentsView() {
  const { students, addStudent, updateStudent } = useStudents();
  const { query } = useSearch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formKey, setFormKey] = useState(0);

  const filtered = filterStudents(students, query);
  const isFiltering = query.trim() !== "";

  function openAdd() {
    setEditingStudent(null);
    setFormKey((k) => k + 1);
    setDialogOpen(true);
  }

  function openEdit(student: Student) {
    setEditingStudent(student);
    setFormKey((k) => k + 1);
    setDialogOpen(true);
  }

  function handleSave(data: Parameters<typeof addStudent>[0]) {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
    } else {
      addStudent(data);
    }
  }

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
          onClick={openAdd}
        >
          Tambah Siswa
        </Button>
      </div>

      <StudentTable students={filtered} onEdit={openEdit} />

      <StudentFormDialog
        key={formKey}
        open={dialogOpen}
        student={editingStudent}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </section>
  );
}