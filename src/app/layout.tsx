import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardShell from "@/components/layout/dashboardShell";
import Navbar from "@/components/layout/navbar";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";
import "@/styles/dashboard.css";
import "@/styles/students.css";
import { SearchProvider } from "@/components/searchProvider";
import "@/styles/settings.css";
import { StudentsProvider } from "@/components/context/studentsProvider";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Dashboard data siswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CssBaseline />
          <StudentsProvider>
            <SearchProvider>
              <DashboardShell>
                <Navbar />
                {children}
              </DashboardShell>
            </SearchProvider>
          </StudentsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
