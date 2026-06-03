'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/nav-bar';

const categorias = [
  { nombre: 'Guitarras', icono: '🎸', href: '/catalogo' },
  { nombre: 'Bajos', icono: '🎸', href: '/catalogo' },
  { nombre: 'Batería', icono: '🥁', href: '/catalogo' },
  { nombre: 'Teclados', icono: '🎹', href: '/catalogo' },
  { nombre: 'Vientos', icono: '🎷', href: '/catalogo' },
  { nombre: 'Sonido', icono: '🎤', href: '/catalogo' },
];

const features = [
  { titulo: 'Envío a todo el país', desc: 'Gratis en compras mayores a $500.000', icono: '🚚' },
  { titulo: '12 cuotas sin interés', desc: 'Con todas las tarjetas', icono: '💳' },
  { titulo: 'Garantía oficial', desc: '12 meses en todos los productos', icono: '🛡️' },
  { titulo: 'Asesoramiento', desc: 'Te ayudamos a elegir tu instrumento', icono: '🎵' },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, var(--bg-3) 0%, var(--bg) 70%)' }} />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-px bg-gradient-to-b from-transparent via-[#D4854A]/20 to-transparent"
                style={{ left: `${15 + i * 15}%`, height: '100%', animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`, opacity: 0.3 }} />
            ))}
          </div>

          <div className="z-10 flex flex-col items-center gap-8 [animation:fade-up_0.8s_ease_forwards]">
            <div className="w-48 h-48 animate-[spin_8s_linear_infinite] drop-shadow-[0_0_60px_rgba(212,133,74,0.4)]">
              <Image src="/logo.png" alt="Punteo Logo" width={192} height={192} priority />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text)' }}>
                Punteo
              </h1>
              <p className="text-[#D4854A] text-sm tracking-[0.4em] uppercase font-medium">
                Instrumentos musicales · Morón, BA
              </p>
            </div>
            <p className="text-lg max-w-md leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Tu tienda de instrumentos en el oeste del Gran Buenos Aires.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <Link href="/catalogo" className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-8 py-3 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,133,74,0.4)]">
                Ver catálogo
              </Link>
              <Link href="/encuesta" className="border font-bold px-8 py-3 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:border-[#D4854A] hover:text-[#D4854A]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                ¿Qué instrumento te va?
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-current to-transparent animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4854A] to-transparent opacity-40" />
        </section>

        {/* CATEGORÍAS */}
        <section className="py-20 px-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#D4854A] text-xs uppercase tracking-[0.4em] mb-2">Explorá</p>
              <h2 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Categorías</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categorias.map((cat) => (
                <Link key={cat.nombre} href={cat.href}
                  className="group flex flex-col items-center gap-3 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icono}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider transition-colors text-center group-hover:text-[#D4854A]"
                    style={{ color: 'var(--text-2)' }}>{cat.nombre}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-4" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-2)' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.titulo} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl transition-colors"
                style={{ border: '1px solid var(--border)' }}>
                <span className="text-3xl">{f.icono}</span>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text)' }}>{f.titulo}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 px-4 relative overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, var(--bg-3) 0%, var(--bg) 70%)' }} />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <p className="text-[#D4854A] text-xs uppercase tracking-[0.4em] mb-3">¿Listo para empezar?</p>
            <h2 className="text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text)' }}>Tu instrumento te espera</h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Más de 90 instrumentos disponibles. Encontrá el tuyo con nuestro asistente inteligente.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/catalogo" className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-10 py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105">
                Ver catálogo
              </Link>
              <Link href="/contacto" className="border font-bold px-10 py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:border-[#D4854A] hover:text-[#D4854A]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                Contactarnos
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'var(--text-2)' }}>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Punteo" width={24} height={24} className="rounded-full opacity-60" />
              <span>© 2026 Punteo · Morón, Buenos Aires</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Tienda abierta
              </span>
              <a href="#" className="hover:text-[#D4854A] transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-[#D4854A] transition-colors">Instagram</a>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}