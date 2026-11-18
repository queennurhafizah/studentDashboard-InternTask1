import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardShell from "@/components/dashboardShell";
import Navbar from "@/components/navbar";
import "./globals.css";
import "@/styles/layout.css";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";
import "@/styles/dashboard.css";
import "@/styles/students.css";
import { SearchProvider } from "@/components/searchProvider";

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
          <SearchProvider>
            <DashboardShell>
              <Navbar />
              {children}
            </DashboardShell>
          </SearchProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
