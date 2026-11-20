"use client";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Student } from "@/data/student";

type StudentTableProps = {
  students: Student[];
  // Jika diberikan, kolom Aksi ditampilkan dengan tombol ubah
  onEdit?: (student: Student) => void;
};

export default function StudentTable({ students, onEdit }: StudentTableProps) {
  const showActions = Boolean(onEdit);
  const colCount = showActions ? 7 : 6;

  return (
    <TableContainer className="student-table-wrapper">
      <Table className="student-table">
        <TableHead>
          <TableRow className="student-table-head-row">
            <TableCell align="center" className="col-no">No</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>NIS</TableCell>
            <TableCell>Kelas</TableCell>
            <TableCell>Jenis Kelamin</TableCell>
            <TableCell>Status</TableCell>
            {showActions && <TableCell align="center">Aksi</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {students.length === 0 && (
            <TableRow>
              <TableCell colSpan={colCount} align="center" className="student-empty">
                Data siswa tidak ditemukan
              </TableCell>
            </TableRow>
          )}

          {students.map((student, index) => {
            const isAktif = student.status === "Aktif";
            const isLaki = student.gender === "L";

            return (
              <TableRow key={student.id} hover>
                <TableCell align="center" className="col-no">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <span className="student-name">{student.name}</span>
                </TableCell>
                <TableCell>{student.nis}</TableCell>
                <TableCell>
                  <span className="kelas-badge">{student.kelas}</span>
                </TableCell>
                <TableCell>
                  <Chip
                    label={isLaki ? "Laki-laki" : "Perempuan"}
                    size="small"
                    className={`gender-chip ${isLaki ? "gender-chip--blue" : "gender-chip--pink"}`}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    size="small"
                    className={`status-chip ${isAktif ? "status-chip--aktif" : "status-chip--nonaktif"}`}
                  />
                </TableCell>
                {showActions && onEdit && (
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      className="student-edit-btn"
                      onClick={() => onEdit(student)}
                      aria-label={`Ubah data ${student.name}`}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}