'use client';

import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { useState, useEffect } from 'react';

interface NavbarProps {
  onCartClick?: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // avoid synchronous state update during render/effect; schedule async to prevent cascading renders
    const id = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 animate-[spin_12s_linear_infinite]">
            <Image src="/logo.png" alt="Punteo" width={40} height={40} className="rounded-full" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">PUNTEO</span>
        </div>

        {/* Links centrales */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-zinc-400 hover:text-[#D4854A] text-sm font-medium transition-colors uppercase tracking-wider">Catálogo</a>
          <a href="#" className="text-zinc-400 hover:text-[#D4854A] text-sm font-medium transition-colors uppercase tracking-wider">Categorías</a>
          <a href="#" className="text-zinc-400 hover:text-[#D4854A] text-sm font-medium transition-colors uppercase tracking-wider">Contacto</a>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">Ingresar</a>
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-zinc-400 hover:text-[#D4854A] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            {/* Badge: mismo HTML en server y client, visibilidad por CSS */}
            <span className={`absolute -top-1 -right-1 bg-[#D4854A] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transition-opacity duration-200 ${
              isMounted && totalItems > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              {isMounted ? totalItems : 0}
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
}