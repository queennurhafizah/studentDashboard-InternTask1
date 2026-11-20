"use client";

import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { Student } from "@/data/student";

type StudentTableProps = {
  students: Student[];
};

export default function StudentTable({ students }: StudentTableProps) {
  return (
    <TableContainer className="student-table-wrapper">
      <Table className="student-table">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>NIS</TableCell>
            <TableCell>Kelas</TableCell>
            <TableCell>Jenis Kelamin</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" className="student-empty">
                Data siswa tidak ditemukan
              </TableCell>
            </TableRow>
          )}
          {students.map((student) => (
            <TableRow key={student.id} hover>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.nis}</TableCell>
              <TableCell>{student.kelas}</TableCell>
              <TableCell>
                {student.gender === "L" ? "Laki-laki" : "Perempuan"}
              </TableCell>
              <TableCell>
                <Chip
                  label={student.status}
                  size="small"
                  className={
                    student.status === "Aktif"
                      ? "status-chip status-chip--aktif"
                      : "status-chip status-chip--nonaktif"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
