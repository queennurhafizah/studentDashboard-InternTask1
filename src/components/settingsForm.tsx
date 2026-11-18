"use client";

import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  initialSchool,
  initialUser,
  SchoolInfo,
  UserProfile,
} from "@/data/settings";

type Field<T> = {
  key: keyof T;
  label: string;
  type?: string;
  options?: string[];
};

const userFields: Field<UserProfile>[] = [
  { key: "nama", label: "Nama Lengkap" },
  { key: "email", label: "Email", type: "email" },
  { key: "nip", label: "NIP" },
  { key: "telepon", label: "Nomor Telepon", type: "tel" },
  { key: "jabatan", label: "Jabatan" },
];

const schoolFields: Field<SchoolInfo>[] = [
  { key: "namaSekolah", label: "Nama Sekolah" },
  { key: "npsn", label: "NPSN" },
  { key: "tahunAjaran", label: "Tahun Ajaran" },
  { key: "semester", label: "Semester", options: ["Ganjil", "Genap"] },
  { key: "emailSekolah", label: "Email Sekolah", type: "email" },
  { key: "teleponSekolah", label: "No. Telepon Sekolah", type: "tel" },
];

export default function SettingsForm() {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [school, setSchool] = useState<SchoolInfo>(initialSchool);
  const [saved, setSaved] = useState(false);

  function updateUser(key: keyof UserProfile, value: string) {
    setUser((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function updateSchool(key: keyof SchoolInfo, value: string) {
    setSchool((prev) => ({ ...prev, [key]: value }) as SchoolInfo);
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form className="settings-page" onSubmit={handleSubmit}>
      <section className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Informasi Pengguna</h2>
          <p className="settings-card-desc">Data akun admin yang sedang login</p>
        </div>

        <div className="settings-grid">
          {userFields.map((field) => (
            <TextField
              key={String(field.key)}
              label={field.label}
              type={field.type ?? "text"}
              value={user[field.key]}
              onChange={(event) => updateUser(field.key, event.target.value)}
              size="small"
              fullWidth
              className="settings-field"
            />
          ))}
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Informasi Sekolah</h2>
          <p className="settings-card-desc">Data identitas dan periode akademik sekolah</p>
        </div>

        <div className="settings-grid">
          {schoolFields.map((field) =>
            field.options ? (
              <TextField
                key={String(field.key)}
                select
                label={field.label}
                value={school[field.key]}
                onChange={(event) => updateSchool(field.key, event.target.value)}
                size="small"
                fullWidth
                className="settings-field"
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={String(field.key)}
                label={field.label}
                type={field.type ?? "text"}
                value={school[field.key]}
                onChange={(event) => updateSchool(field.key, event.target.value)}
                size="small"
                fullWidth
                className="settings-field"
              />
            )
          )}
        </div>
      </section>

      <div className="settings-actions">
        {saved && (
          <span className="settings-saved">
            Perubahan disimpan sementara (belum ke database)
          </span>
        )}
        <Button type="submit" variant="contained" className="settings-save-btn">
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}