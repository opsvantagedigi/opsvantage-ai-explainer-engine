import './studio.css';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';

export const metadata = {
  title: 'Studio - AI YouTube Studio',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0f1c] text-white font-inter">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
