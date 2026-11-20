import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/themeRegistry";
import DashboardShell from "@/components/layout/dashboardShell";
import Navbar from "@/components/layout/navbar";
import { SearchProvider } from "@/components/searchProvider";
import { SettingsProvider } from "@/components/context/settingsProvider";
import { StudentsProvider } from "@/components/context/studentsProvider";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";
import "@/styles/dashboard.css";
import "@/styles/students.css";
import "@/styles/settings.css";

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
          <ThemeRegistry>
            <SettingsProvider>
              <StudentsProvider>
                <SearchProvider>
                  <DashboardShell>
                    <Navbar />
                    {children}
                  </DashboardShell>
                </SearchProvider>
              </StudentsProvider>
            </SettingsProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}