"use client";

import Link from "next/link";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import StatCard from "@/components/dashboard/statCard";
import InactiveStudents from "@/components/dashboard/inactiveStudent";
import StudentTable from "@/components/students/studentTable";
import { countByGender } from "@/lib/filterStudents";
import { useStudents } from "@/components/context/studentsProvider";
import { useSettings } from "@/components/context/settingsProvider";

export default function Page() {
  const { students } = useStudents();

  const totalSiswa = students.length;
  const totalLaki = countByGender(students, "L");
  const totalPerempuan = countByGender(students, "P");
  const totalKelas = new Set(students.map((s) => s.kelas)).size;
  const { user, school } = useSettings();
  const topStudents = students.slice(0, 5);
  const inactiveStudents = students.filter((s) => s.status === "Tidak Aktif");

  return (
    <section className="dashboard">
      <div className="dashboard-greeting">
        <span className="dashboard-badge">
          {school.tahunAjaran} · Semester {school.semester}
        </span>
        <h2 className="dashboard-greeting-title">
          Selamat datang, {user.nama}
        </h2>
        <p className="dashboard-greeting-text">
          Berikut ringkasan data siswa {school.namaSekolah} saat ini.
        </p>
      </div>

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
