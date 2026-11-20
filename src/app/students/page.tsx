import StudentsView from "@/components/students/studentsView";
import { students } from "@/data/student";

export default function StudentsPage() {
  return <StudentsView students={students} />;
}