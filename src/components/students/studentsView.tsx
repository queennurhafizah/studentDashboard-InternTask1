"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import { filterStudents } from "@/lib/filterStudents";
import { useSearch } from "@/components/searchProvider";
import { useStudents } from "@/components/context/studentsProvider";
import { Student } from "@/data/student";
import StudentTable from "@/components/students/studentTable";
import StudentFormDialog from "@/components/students/studentFormDialog";
import DeleteConfirmDialog from "@/components/students/deleteConfirmDialog";

export default function StudentsView() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const { query } = useSearch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = filterStudents(students, query);
  const isFiltering = query.trim() !== "";

  useEffect(() => {
    setPage(0);
  }, [query]);

  const lastPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);
  const currentPage = Math.min(page, lastPage);

  const pageStudents = filtered.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  function checkNisTaken(nis: string): string | null {
    const owner = students.find(
      (s) => s.nis === nis && s.id !== editingStudent?.id
    );
    return owner ? owner.name : null;
  }

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

  function handleConfirmDelete() {
    if (deleteTarget) {
      deleteStudent(deleteTarget.id);
    }
    setDeleteTarget(null);
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

      <StudentTable
        students={pageStudents}
        numberOffset={currentPage * rowsPerPage}
        onEdit={openEdit}
        onDelete={(student) => setDeleteTarget(student)}
      />

      <TablePagination
        component="div"
        className="students-pagination"
        count={filtered.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        labelRowsPerPage="Baris per halaman"
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      <StudentFormDialog
        key={formKey}
        open={dialogOpen}
        student={editingStudent}
        checkNisTaken={checkNisTaken}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        student={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}