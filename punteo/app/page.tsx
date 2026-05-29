// app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/nav-bar';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Fondo con textura radial sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_70%)] z-0" />

        {/* Hero content */}
        <div className="z-10 flex flex-col items-center gap-8 px-4 text-center">

          {/* Logo girando */}
          <div className="w-48 h-48 animate-[spin_6s_linear_infinite] drop-shadow-[0_0_40px_rgba(212,133,74,0.3)]">
            <Image
              src="/logo.png"
              alt="Punteo Logo"
              width={192}
              height={192}
              priority
            />
          </div>

          {/* Nombre */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-7xl font-black tracking-tighter uppercase text-white leading-none">
              Punteo
            </h1>
            <p className="text-[#D4854A] text-sm tracking-[0.3em] uppercase font-medium">
              Instrumentos musicales · Morón, BA
            </p>
          </div>

          {/* Bajada */}
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            Tu tienda de instrumentos en el oeste del Gran Buenos Aires.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 mt-2">
            <Link 
              href="/catalogo"
              className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-8 py-3 rounded-none uppercase tracking-widest text-sm transition-colors duration-200"
            >
              Ver catálogo
            </Link>
            <button className="border border-zinc-700 hover:border-[#D4854A] text-zinc-400 hover:text-[#D4854A] font-bold px-8 py-3 rounded-none uppercase tracking-widest text-sm transition-colors duration-200">
              ¿Qué instrumento te va?
            </button>
          </div>

        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4854A] to-transparent opacity-40 z-10" />
      </main>
    </>
  );
}