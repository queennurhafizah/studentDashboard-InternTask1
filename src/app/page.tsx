import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import StatCard from "@/components/statCard";
import { students } from "@/data/student";

export default function Page() {
  const totalSiswa = students.length;
  const totalLaki = students.filter((g) => g.gender === "L").length;
  const totalPerempuan = students.filter((g) => g.gender === "P").length;
  const totalKelas = new Set(students.map((k) => k.kelas)).size;

  return (
    <section className="dashboard">
      <div className="dashboard-greeting">
        <h2 className="dashboard-greeting-tittle">Selamat datang, Admin</h2>
        <p className="dashboard-greeting-text">
          Berikut ringkasan data siswa saat ini
        </p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Siswa"
          value={totalSiswa}
          icon={<GroupOutlinedIcon />}
          variant="indigo" />

        <StatCard
          title="Siswa Laki-laki"
          value={totalPerempuan}
          icon={<MaleOutlinedIcon />}
          variant="indigo" />

        <StatCard
          title="Siswa Perempuan"
          value={totalPerempuan}
          icon={<FemaleOutlinedIcon />}
          variant="indigo" />

        <StatCard
          title="Total Kelas"
          value={totalKelas}
          icon={<SchoolOutlinedIcon />}
          variant="indigo" />
      </div>
    </section>
  );
}
