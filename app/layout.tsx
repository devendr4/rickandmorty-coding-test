import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/organisms/Sidebar";
import ParticlesBackground from "./components/organisms/Particles";
import { Toaster } from "./components/molecules/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty assestment app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:flex">
          <Sidebar />
          {children}
          <Toaster />
        </div>
        <ParticlesBackground />
      </body>
    </html>
  );
}
