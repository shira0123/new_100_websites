import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "100 Websites | A Collection of 100 Web Experiences",
  description:
    "A curated collection of 100 unique websites — 65 static tools & games, 35 live dynamic apps. Built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
