import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Loading from "./components/load/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Tiktok",
  description: "A demo of web tiktok",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Loading />
      </body>
    </html>
  );
}
