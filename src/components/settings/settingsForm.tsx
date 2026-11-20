"use client";

import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  SchoolInfo,
  UserProfile,
} from "@/data/settings";
import { useSettings } from "@/components/context/settingsProvider";

type UserKey = keyof UserProfile;
type SchoolKey = keyof SchoolInfo;

type Field<T> = {
  key: keyof T;
  label: string;
  type?: string;
  options?: string[];
  required?: boolean;
};

const userFields: Field<UserProfile>[] = [
  { key: "nama", label: "Nama Lengkap", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "nip", label: "NIP" },
  { key: "telepon", label: "Nomor Telepon", type: "tel" },
  { key: "jabatan", label: "Jabatan" },
];

const schoolFields: Field<SchoolInfo>[] = [
  { key: "namaSekolah", label: "Nama Sekolah", required: true },
  { key: "npsn", label: "NPSN" },
  { key: "tahunAjaran", label: "Tahun Ajaran", required: true },
  { key: "semester", label: "Semester", options: ["Ganjil", "Genap"] },
  { key: "emailSekolah", label: "Email Sekolah", type: "email" },
  { key: "teleponSekolah", label: "No. Telepon Sekolah", type: "tel" },
];

type Errors = Partial<Record<string, string>>;

// Email kosong dianggap boleh, tetapi jika diisi harus berformat benar
function isValidEmail(value: string) {
  return value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SettingsForm() {
  const { user, school, saveUser, saveSchool } = useSettings();

  // Draft adalah isian di form. Data yang tersimpan ada di provider.
  const [userDraft, setUserDraft] = useState<UserProfile>(user);
  const [schoolDraft, setSchoolDraft] = useState<SchoolInfo>(school);
  const [errors, setErrors] = useState<Errors>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const isDirty =
    JSON.stringify(userDraft) !== JSON.stringify(user) ||
    JSON.stringify(schoolDraft) !== JSON.stringify(school);

  function updateUser(key: UserKey, value: string) {
    setUserDraft((prev) => ({ ...prev, [key]: value }));
    setSavedAt(null);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function updateSchool(key: SchoolKey, value: string) {
    setSchoolDraft((prev) => ({ ...prev, [key]: value }));
    setSavedAt(null);
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): Errors {
    const newErrors: Errors = {};

    if (userDraft.nama.trim() === "") newErrors.nama = "Nama wajib diisi";
    if (!isValidEmail(userDraft.email)) newErrors.email = "Format email tidak valid";
    if (schoolDraft.namaSekolah.trim() === "") newErrors.namaSekolah = "Nama sekolah wajib diisi";
    if (schoolDraft.tahunAjaran.trim() === "") newErrors.tahunAjaran = "Tahun ajaran wajib diisi";
    if (!isValidEmail(schoolDraft.emailSekolah)) newErrors.emailSekolah = "Format email tidak valid";

    return newErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const cleanUser: UserProfile = {
      ...userDraft,
      nama: userDraft.nama.trim(),
      email: userDraft.email.trim(),
    };
    const cleanSchool: SchoolInfo = {
      ...schoolDraft,
      namaSekolah: schoolDraft.namaSekolah.trim(),
      tahunAjaran: schoolDraft.tahunAjaran.trim(),
      emailSekolah: schoolDraft.emailSekolah.trim(),
    };

    saveUser(cleanUser);
    saveSchool(cleanSchool);
    setUserDraft(cleanUser);
    setSchoolDraft(cleanSchool);
    setSavedAt(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
  }

  function handleReset() {
    setUserDraft(user);
    setSchoolDraft(school);
    setErrors({});
    setSavedAt(null);
  }

  return (
    <form className="settings-page" onSubmit={handleSubmit} noValidate>
      <section className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Informasi Pengguna</h2>
          <p className="settings-card-desc">Data akun admin yang sedang login</p>
        </div>

        <div className="settings-grid">
          {userFields.map((field) => (
            <TextField
              key={String(field.key)}
              className="settings-field"
              label={field.required ? `${field.label} *` : field.label}
              type={field.type ?? "text"}
              value={userDraft[field.key as UserKey]}
              onChange={(e) => updateUser(field.key as UserKey, e.target.value)}
              error={Boolean(errors[String(field.key)])}
              helperText={errors[String(field.key)]}
              fullWidth
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
                className="settings-field"
                label={field.label}
                value={schoolDraft[field.key as SchoolKey]}
                onChange={(e) => updateSchool(field.key as SchoolKey, e.target.value)}
                fullWidth
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
                className="settings-field"
                label={field.required ? `${field.label} *` : field.label}
                type={field.type ?? "text"}
                value={schoolDraft[field.key as SchoolKey]}
                onChange={(e) => updateSchool(field.key as SchoolKey, e.target.value)}
                error={Boolean(errors[String(field.key)])}
                helperText={errors[String(field.key)]}
                fullWidth
              />
            )
          )}
        </div>
      </section>

      <div className="settings-actions">
        {savedAt && (
          <span className="settings-saved">Tersimpan pukul {savedAt}</span>
        )}
        {!savedAt && isDirty && (
          <span className="settings-unsaved">Ada perubahan belum disimpan</span>
        )}

        <Button
          type="button"
          onClick={handleReset}
          disabled={!isDirty}
          className="settings-reset-btn"
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty}
          className="settings-save-btn"
        >
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}