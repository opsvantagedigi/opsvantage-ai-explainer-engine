import "./globals.css";
import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "AI-YouTube Studio | OpsVantage Digital",
  description: "Next-gen AI video orchestration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body>
        <div className="ambient-bg" />
        <div id="cursor-glow" className="cursor-glow" />
        {children}
      </body>
    </html>
  );
}
