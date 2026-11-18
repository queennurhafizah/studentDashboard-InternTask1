import StudentTable from "@/components/studentTable";
import { students } from "@/data/student";

export default function StudentsPage() {
    return (
        <section className="student-card">
            <div className="student-card-header">
                <h2 className="student-card-tittle">Daftar Siswa</h2>
                <span className="student-card-count">{students.length} siswa</span>
            </div>

            <StudentTable students={students} />
        </section>
    )
}