"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Student } from "@/data/student";

type DeleteConfirmDialogProps = {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmDialog({
  open,
  student,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { className: "student-dialog" } }}
    >
      <DialogTitle className="student-dialog-title">Hapus Siswa</DialogTitle>

      <DialogContent>
        <DialogContentText className="student-dialog-subtitle">
          Yakin ingin menghapus data{" "}
          <strong>{student?.name}</strong> (NIS {student?.nis})?
          Tindakan ini tidak bisa dibatalkan.
        </DialogContentText>
      </DialogContent>

      <DialogActions className="student-dialog-actions">
        <Button onClick={onClose} className="student-btn-cancel">
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className="student-btn-delete"
        >
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}