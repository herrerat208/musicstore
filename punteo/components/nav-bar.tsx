'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useTheme } from "@/app/context/theme-context";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onCartClick?: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const id = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const links = [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/encuesta', label: '¿Qué instrumento te va?' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const isLight = isMounted && theme === 'light';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isLight
        ? 'bg-[#f5f0eb]/90 border-[#d4cfc9]'
        : 'bg-[#0a0a0a]/90 border-zinc-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 animate-[spin_12s_linear_infinite]">
            <Image src="/logo.png" alt="Punteo" width={40} height={40} className="rounded-full" />
          </div>
          <span className={`font-black text-xl tracking-tighter ${isLight ? 'text-[#1a1a1a]' : 'text-white'}`}>
            PUNTEO
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                pathname === link.href
                  ? 'text-[#D4854A]'
                  : isLight
                    ? 'text-[#6b6b6b] hover:text-[#D4854A]'
                    : 'text-zinc-400 hover:text-[#D4854A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors hidden sm:block ${
              isLight ? 'text-[#6b6b6b] hover:text-[#1a1a1a]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ingresar
          </Link>

          {/* Toggle tema */}
          {isMounted && (
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#e0dbd5]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
              title={isLight ? 'Modo oscuro' : 'Modo claro'}
            >
              {isLight ? (
                /* Luna */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                /* Sol */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          )}

          {/* Carrito */}
          <button
            onClick={onCartClick}
            className={`relative p-2 transition-colors ${
              isLight ? 'text-[#6b6b6b] hover:text-[#D4854A]' : 'text-zinc-400 hover:text-[#D4854A]'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className={`absolute -top-1 -right-1 bg-[#D4854A] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transition-opacity duration-200 ${
              isMounted && totalItems > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              {isMounted ? (totalItems || 0) : 0}
            </span>
          </button>

          {/* Hamburguesa mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isLight ? 'text-[#6b6b6b] hover:text-[#1a1a1a]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {menuOpen && (
        <div className={`md:hidden border-t px-4 py-4 space-y-3 ${
          isLight ? 'bg-[#f5f0eb] border-[#d4cfc9]' : 'bg-[#0a0a0a] border-zinc-800'
        }`}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium uppercase tracking-wider py-2 transition-colors ${
                pathname === link.href
                  ? 'text-[#D4854A]'
                  : isLight ? 'text-[#6b6b6b] hover:text-[#D4854A]' : 'text-zinc-400 hover:text-[#D4854A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className={`block text-sm font-medium py-2 transition-colors ${
              isLight ? 'text-[#6b6b6b] hover:text-[#1a1a1a]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ingresar
          </Link>
        </div>
      )}
    </nav>
  );
}