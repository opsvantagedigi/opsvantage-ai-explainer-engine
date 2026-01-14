import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Orbitron, Inter } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "AI‑Shorts Studio | OpsVantage Digital",
  description:
    "Turn long‑form ideas into viral AI shorts. AI‑Shorts Studio by OpsVantage Digital transforms scripts, calls, and content into ready‑to‑publish short‑form videos.",
  metadataBase: new URL("https://opsvantagedigital.online"),
  openGraph: {
    title: "AI‑Shorts Studio | OpsVantage Digital",
    description:
      "AI‑powered short‑form content engine for creators, founders, and teams.",
    url: "https://opsvantagedigital.online",
    siteName: "AI‑Shorts Studio",
    images: [
      {
        url: "/opsvantage-og.png",
        width: 1200,
        height: 630,
        alt: "AI‑Shorts Studio by OpsVantage Digital",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/opsvantage-icon.png",
    shortcut: "/opsvantage-icon.png",
    apple: "/opsvantage-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-0">{children}</main>
      </body>
    </html>
  )
}
