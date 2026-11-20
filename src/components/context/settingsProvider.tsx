"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  initialSchool,
  initialUser,
  SchoolInfo,
  UserProfile,
} from "@/data/settings";

type SettingsContextValue = {
  user: UserProfile;
  school: SchoolInfo;
  saveUser: (data: UserProfile) => void;
  saveSchool: (data: SchoolInfo) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [school, setSchool] = useState<SchoolInfo>(initialSchool);

  function saveUser(data: UserProfile) {
    setUser(data);
  }

  function saveSchool(data: SchoolInfo) {
    setSchool(data);
  }

  return (
    <SettingsContext.Provider value={{ user, school, saveUser, saveSchool }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings harus dipakai di dalam SettingsProvider");
  }

  return context;
}