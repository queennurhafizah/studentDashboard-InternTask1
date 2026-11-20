"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Student, students as initialStudents } from "@/data/student";

export type StudentInput = Omit<Student, "id">;

type StudentsContextValue = {
  students: Student[];
  addStudent: (data: StudentInput) => void;
  updateStudent: (id: number, data: StudentInput) => void;
  deleteStudent: (id: number) => void;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  function addStudent(data: StudentInput) {
    setStudents((prev) => {
      const nextId = prev.length === 0 ? 1 : Math.max(...prev.map((s) => s.id)) + 1;
      return [...prev, { id: nextId, ...data }];
    });
  }

  function updateStudent(id: number, data: StudentInput) {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { id, ...data } : student))
    );
  }

  function deleteStudent(id: number) {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  return (
    <StudentsContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);

  if (!context) {
    throw new Error("useStudents harus dipakai di dalam StudentsProvider");
  }

  return context;
}