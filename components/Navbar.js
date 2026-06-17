'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Quiénes Somos', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg/90 backdrop-blur-lg shadow-sm py-3 border-b border-border' : 'bg-bg/50 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo / Título */}
          <Link href="#" className="flex items-center gap-2 group">
            <span className="text-3xl font-extrabold text-brand-accent tracking-tighter">AF</span>
            <span className="font-bold text-text-main tracking-tight hidden sm:block">Asesoría Financiera</span>
          </Link>

          {/* Menú Desktop */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold uppercase tracking-wider text-text-muted hover:text-brand-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link 
              href="#contacto"
              className="bg-brand-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md"
            >
              Solicitar Crédito
            </Link>
          </div>

          {/* Botón Menú Mobile */}
          <button 
            className="md:hidden text-text-main p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg shadow-2xl border-t border-border">
          <nav className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-main font-bold text-lg p-2 border-b border-border/50"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-accent text-white text-center px-5 py-4 rounded-xl font-bold mt-4 shadow-md"
            >
              Solicitar Crédito
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
