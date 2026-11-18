import StudentsView from "@/components/studentsView";
import { students } from "@/data/student";

export default function StudentsPage() {
  return <StudentsView students={students} />;
}