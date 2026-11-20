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
import { StudentInput } from "@/components/context/studentsProvider";

type StudentFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StudentInput) => void;
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
  onClose,
  onSubmit,
}: StudentFormDialogProps) {
  const [form, setForm] = useState<StudentInput>(emptyForm);

  function handleChange<K extends keyof StudentInput>(key: K, value: StudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      ...form,
      name: form.name.trim(),
      nis: form.nis.trim(),
      kelas: form.kelas.trim(),
    });
    setForm(emptyForm);
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
        <DialogTitle className="student-dialog-title">Tambah Siswa</DialogTitle>

        <DialogContent>
          <DialogContentText className="student-dialog-subtitle">
            Isi data siswa baru dengan lengkap. Field bertanda * wajib diisi.
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