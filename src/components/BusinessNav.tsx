'use client';

import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export const BusinessNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-[#050a14]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 via-emerald-600 to-yellow-600 flex items-center justify-center">
            <Zap size={18} className="text-white fill-current" />
          </div>
          <div className="text-2xl font-orbitron font-bold tracking-wider text-white">
            OPS<span className="text-emerald-500">VANTAGE</span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-inter font-medium text-slate-400">
          {['Services', 'Case Studies', 'Products', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-emerald-400 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="px-6 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 font-inter text-sm font-semibold tracking-wide">
            Book Strategy Call
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-screen bg-[#050a14] p-8 flex flex-col space-y-8 z-40 border-t border-white/10">
          {['Services', 'Case Studies', 'Products', 'About'].map((item) => (
            <a key={item} href="#" className="text-2xl font-orbitron text-white hover:text-emerald-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-orbitron font-bold rounded-lg">
            Book Strategy Call
          </button>
        </div>
      )}
    </nav>
  );
};
