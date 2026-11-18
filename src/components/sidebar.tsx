"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const mainMenu = [
  { label: "Dashboard", href: "/", icon: <DashboardOutlinedIcon /> },
  { label: "Data Siswa", href: "/students", icon: <PeopleOutlinedIcon /> },
  { label: "Pengaturan", href: "/settings", icon: <SettingsOutlinedIcon /> },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">Student Dashboard</div>
        <button
          className="sidebar-toggle"
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
        >
          {collapsed ? <MenuIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </button>
      </div>

      <nav className="sidebar-menu">
        {mainMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={`sidebar-item ${pathname === item.href ? "active" : ""}`}
          >
            {item.icon}
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}