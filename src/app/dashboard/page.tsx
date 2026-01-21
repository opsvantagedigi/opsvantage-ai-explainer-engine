
import { Logo } from "@/components/Logo";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans">
      <header className="glass-header absolute top-0 left-0 w-full flex items-center justify-between p-6">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-2xl font-bold ml-3 font-orbitron">OpsVantage AI-YouTube Studio</h1>
        </div>
        <nav>
          <Link href="/" className="text-lg font-medium hover:text-gray-400 transition-colors">
            Home
          </Link>
        </nav>
      </header>

      <main className="text-center">
        <div className="glass-box">
            <h2 className="text-4xl font-bold mb-4 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">Dashboard</h2>
            <p className="text-lg">
              Welcome to your dashboard! This is where you will manage your video projects and view analytics.
            </p>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full text-center p-6 text-sm text-gray-500">
        &copy; 2024 OpsVantage AI-YouTube Studio. All rights reserved.
      </footer>
    </div>
  );
}
