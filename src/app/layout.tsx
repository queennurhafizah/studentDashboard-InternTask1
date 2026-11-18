import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import "@/styles/layout.css";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Dashboard data for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CssBaseline />
          <div className="layout">
            <Sidebar />
            <main className="content">
              <Navbar /> {children}
            </main>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
