"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar";

export default function DashboardShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div className={`layout ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div className="sidebar-backdrop" onClick={() => setCollapsed(true)} />

      <main className="content">{children}</main>
    </div>
  );
}