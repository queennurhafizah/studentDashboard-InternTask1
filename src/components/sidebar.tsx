"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChevronLeft } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const mainMenu = [
    {label: "Dashboard", href: "/", icon: <DashboardIcon />},
    {label: "Data Siswa", href: "/students", icon: <PeopleIcon />},
    {label: "Pengaturan", href: "/settings", icon: <SettingsIcon />}
]

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">Student Dashboard</div>
                <button className="sidebar-toggle" type="button" aria-label="Tutup sidebar">
                    <ChevronLeft fontSize="small" />
                </button>
            </div>

            <nav className="sidebar-menu">
                {mainMenu.map((item) => (
                    <Link key={item.href} href={item.href} className={`sidebar-item ${pathname === item.href ? "active" : ""}`}>
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}