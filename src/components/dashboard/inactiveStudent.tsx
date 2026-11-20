import { Student } from "@/data/student";

type InactiveStudentsProps = {
  students: Student[];
};

export default function InactiveStudents({ students }: InactiveStudentsProps) {
  return (
    <section className="students-card">
      <div className="students-card-header">
        <h3 className="students-card-title">Siswa Tidak Aktif</h3>
        <span className="students-card-count">{students.length} siswa</span>
      </div>

      <p className="inactive-note">
        <strong>Catatan:</strong> siswa di bawah ini berstatus tidak aktif.
        Pastikan data status sudah sesuai dengan kondisi sebenarnya.
      </p>

      {students.length === 0 ? (
        <p className="inactive-empty">Semua siswa berstatus aktif.</p>
      ) : (
        <ul className="inactive-list">
          {students.map((student) => (
            <li key={student.id} className="inactive-item">
              <div className="inactive-avatar">{student.name.charAt(0)}</div>
              <div className="inactive-info">
                <span className="inactive-name">{student.name}</span>
                <span className="inactive-meta">
                  NIS {student.nis} · {student.kelas}
                </span>
              </div>
              <span className="status-chip status-chip--nonaktif">
                Tidak Aktif
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}