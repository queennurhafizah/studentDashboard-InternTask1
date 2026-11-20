"use client";

import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Student } from "@/data/student";
import { StudentInput } from "@/components/context/studentsProvider";

type StudentFormDialogProps = {
  open: boolean;
  student?: Student | null;
  checkNisTaken: (nis: string) => string | null;
  onClose: () => void;
  onSave: (data: StudentInput) => void;
};

type FormErrors = Partial<Record<"name" | "nis" | "kelas", string>>;

const emptyForm: StudentInput = {
  name: "",
  nis: "",
  kelas: "",
  gender: "L",
  status: "Aktif",
};

function validateForm(form: StudentInput, nisTakenBy: string | null): FormErrors {
  const errors: FormErrors = {};

  if (form.name.trim() === "") {
    errors.name = "Nama wajib diisi";
  }

  if (form.nis.trim() === "") {
    errors.nis = "NIS wajib diisi";
  } else if (nisTakenBy) {
    errors.nis = `NIS sudah dipakai oleh ${nisTakenBy}`;
  }

  if (form.kelas.trim() === "") {
    errors.kelas = "Kelas wajib diisi";
  }

  return errors;
}

export default function StudentFormDialog({
  open,
  student,
  checkNisTaken,
  onClose,
  onSave,
}: StudentFormDialogProps) {
  const [form, setForm] = useState<StudentInput>(() =>
    student
      ? {
          name: student.name,
          nis: student.nis,
          kelas: student.kelas,
          gender: student.gender,
          status: student.status,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const isEdit = Boolean(student);

  function handleChange<K extends keyof StudentInput>(key: K, value: StudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "nis" || key === "kelas") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned: StudentInput = {
      ...form,
      name: form.name.trim(),
      nis: form.nis.trim(),
      kelas: form.kelas.trim(),
    };

    const nisTakenBy = cleaned.nis ? checkNisTaken(cleaned.nis) : null;
    const newErrors = validateForm(cleaned, nisTakenBy);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSave(cleaned);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "student-dialog" } }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle className="student-dialog-title">
          {isEdit ? "Ubah Siswa" : "Tambah Siswa"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText className="student-dialog-subtitle">
            {isEdit
              ? "Perbarui data siswa. Field bertanda * wajib diisi."
              : "Isi data siswa baru dengan lengkap. Field bertanda * wajib diisi."}
          </DialogContentText>

          <div className="student-form">
            <TextField
              className="student-field"
              label="Nama"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
              required
              fullWidth
            />
            <TextField
              className="student-field"
              label="NIS"
              value={form.nis}
              onChange={(e) => handleChange("nis", e.target.value)}
              error={Boolean(errors.nis)}
              helperText={errors.nis}
              required
              fullWidth
            />
            <TextField
              className="student-field"
              label="Kelas"
              value={form.kelas}
              onChange={(e) => handleChange("kelas", e.target.value)}
              error={Boolean(errors.kelas)}
              helperText={errors.kelas}
              required
              fullWidth
            />
            <TextField
              select
              className="student-field"
              label="Jenis Kelamin"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value as "L" | "P")}
              fullWidth
            >
              <MenuItem value="L">Laki-laki</MenuItem>
              <MenuItem value="P">Perempuan</MenuItem>
            </TextField>
            <TextField
              select
              className="student-field"
              label="Status"
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as "Aktif" | "Tidak Aktif")
              }
              fullWidth
            >
              <MenuItem value="Aktif">Aktif</MenuItem>
              <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
            </TextField>
          </div>
        </DialogContent>

        <DialogActions className="student-dialog-actions">
          <Button onClick={onClose} className="student-btn-cancel">
            Batal
          </Button>
          <Button type="submit" variant="contained" className="student-btn-save">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}