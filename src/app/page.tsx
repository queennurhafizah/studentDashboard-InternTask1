import Link from "next/link";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import StatCard from "@/components/dashboard/statCard";
import StudentTable from "@/components/students/studentTable";
import InactiveStudents from "@/components/dashboard/inactiveStudent";
import { students } from "@/data/student";
import { initialSchool } from "@/data/settings";
import { countByGender } from "@/lib/filterStudents";

export default function Page() {
  const totalSiswa = students.length;
  const totalLaki = countByGender(students, "L");
  const totalPerempuan = countByGender(students, "P");
  const totalKelas = new Set(students.map((s) => s.kelas)).size;

  const topStudents = students.slice(0, 5);
  const inactiveStudents = students.filter((s) => s.status === "Tidak Aktif");

  return (
    <section className="dashboard">
      {/* Sapaan */}
      <div className="dashboard-greeting">
        <span className="dashboard-badge">
          {initialSchool.tahunAjaran} · Semester {initialSchool.semester}
        </span>
        <h2 className="dashboard-greeting-title">Selamat datang, Admin</h2>
        <p className="dashboard-greeting-text">
          Berikut ringkasan data siswa {initialSchool.namaSekolah} saat ini.
        </p>
      </div>

      {/* Statistik */}
      <div className="stats-grid">
        <StatCard
          title="Total Siswa"
          value={totalSiswa}
          icon={<GroupOutlinedIcon />}
          variant="indigo"
        />
        <StatCard
          title="Siswa Perempuan"
          value={totalPerempuan}
          icon={<FemaleOutlinedIcon />}
          variant="pink"
        />
        <StatCard
          title="Siswa Laki-laki"
          value={totalLaki}
          icon={<MaleOutlinedIcon />}
          variant="blue"
        />
        <StatCard
          title="Total Kelas"
          value={totalKelas}
          icon={<SchoolOutlinedIcon />}
          variant="green"
        />
      </div>

      {/* 5 siswa teratas dan siswa tidak aktif, berdampingan */}
      <div className="dashboard-split">
        <section className="students-card">
          <div className="students-card-header">
            <h3 className="students-card-title">5 Siswa Teratas</h3>
            <span className="students-card-count">Cuplikan</span>
          </div>

          <StudentTable students={topStudents} />

          <div className="dashboard-section-footer">
            <Link href="/students" className="dashboard-link">
              Lihat semua siswa →
            </Link>
          </div>
        </section>

        <InactiveStudents students={inactiveStudents} />
      </div>
    </section>
  );
}