"use client";

import { usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useSearch } from "@/components/searchProvider";
import Link from "next/link";

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Ringkasan data siswa" },
  "/students": { title: "Data Siswa", subtitle: "Daftar seluruh siswa" },
  "/settings": { title: "Pengaturan", subtitle: "Atur preferensi aplikasi" },
};

export default function Navbar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const info = pageInfo[pathname] ?? { title: "Halaman", subtitle: "" };

  return (
    <header className="navbar">
      <div className="navbar-title-group">
        <h1 className="navbar-title">{info.title}</h1>
        <span className="navbar-subtitle">{info.subtitle}</span>
      </div>

      <div className="navbar-search">
        <TextField
          size="small"
          placeholder="Cari nama, NIS, kelas, atau gender..."
          variant="outlined"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <Link
        href="/settings"
        className="navbar-profile"
        aria-label="Buka pengaturan akun"
      >
        <Avatar className="navbar-avatar">AD</Avatar>
        <div className="navbar-user">
          <span className="navbar-name">Admin</span>
          <span className="navbar-role">Guru</span>
        </div>
      </Link>
    </header>
  );
}
