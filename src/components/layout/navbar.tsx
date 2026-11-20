"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useSearch } from "@/components/searchProvider";
import { useSettings } from "@/components/context/settingsProvider";

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Ringkasan data siswa" },
  "/students": { title: "Data Siswa", subtitle: "Daftar seluruh siswa" },
  "/settings": { title: "Pengaturan", subtitle: "Atur preferensi aplikasi" },
};

const todayText = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const info = pageInfo[pathname] ?? { title: "Halaman", subtitle: "" };
  const { query, setQuery } = useSearch();
  const { user } = useSettings();

  return (
    <header className="navbar">
      <div className="navbar-title-group">
        <h1 className="navbar-title">{info.title}</h1>
        <span className="navbar-subtitle">{info.subtitle}</span>
      </div>

      {pathname === "/students" && (
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
      )}

      {pathname === "/" && (
        <div className="navbar-date">
          <CalendarTodayOutlinedIcon fontSize="small" />
          <span>{todayText}</span>
        </div>
      )}

      <Link href="/settings" className="navbar-profile" aria-label="Buka pengaturan akun">
        <Avatar className="navbar-avatar">{getInitials(user.nama)}</Avatar>
        <div className="navbar-user">
          <span className="navbar-name">{user.nama}</span>
          <span className="navbar-role">{user.jabatan}</span>
        </div>
      </Link>
    </header>
  );
}