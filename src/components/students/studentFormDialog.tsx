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
  onClose: () => void;
  onSave: (data: StudentInput) => void;
};

const emptyForm: StudentInput = {
  name: "",
  nis: "",
  kelas: "",
  gender: "L",
  status: "Aktif",
};

export default function StudentFormDialog({
  open,
  student,
  onClose,
  onSave,
}: StudentFormDialogProps) {
  // Nilai awal form diambil dari siswa yang dipilih (mode ubah) atau kosong (mode tambah).
  // Parent memberi key baru setiap kali dialog dibuka, sehingga state ini selalu segar.
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

  const isEdit = Boolean(student);

  function handleChange<K extends keyof StudentInput>(key: K, value: StudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      ...form,
      name: form.name.trim(),
      nis: form.nis.trim(),
      kelas: form.kelas.trim(),
    });
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
      <form onSubmit={handleSubmit}>
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
              required
              fullWidth
            />
            <TextField
              className="student-field"
              label="NIS"
              value={form.nis}
              onChange={(e) => handleChange("nis", e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="student-field"
              label="Kelas"
              value={form.kelas}
              onChange={(e) => handleChange("kelas", e.target.value)}
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