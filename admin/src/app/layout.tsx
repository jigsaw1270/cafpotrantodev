import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { ClientToastContainer } from '@/components/ClientToastContainer';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CafPotranto Admin Panel",
  description: "Admin panel for managing CafPotranto legal services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
          <ClientToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
