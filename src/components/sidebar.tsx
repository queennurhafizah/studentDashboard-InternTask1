"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ChevronLeft } from "@mui/icons-material";

const mainMenu = [
    {label: "Dashboard", href: "/", icon: <DashboardOutlinedIcon />},
    {label: "Data Siswa", href: "/students", icon: <PeopleOutlinedIcon />},
    {label: "Pengaturan", href: "/settings", icon: <SettingsOutlinedIcon />}
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