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
        <div className="flex max-h-screen justify-center">
          <div className="md:w-2/12">
            <Sidebar />
          </div>
          <main className="flex w-10/12 justify-center">{children}</main>
          {/* <Toaster /> */}
        </div>
        <ParticlesBackground />
      </body>
    </html>
  );
}
