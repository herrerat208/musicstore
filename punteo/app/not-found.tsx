import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 text-center"><div className="space-y-6"><div className="w-20 h-20 animate-[spin_8s_linear_infinite] mx-auto"><Image src="/logo.png" alt="Punteo" width={80} height={80} /></div><div><p className="text-[#D4854A] text-xs uppercase tracking-[0.4em] mb-2">Error 404</p><h1 className="text-6xl font-black text-white tracking-tight">Pagina no encontrada</h1><p className="text-zinc-400 mt-3 max-w-sm mx-auto">Esta pagina no existe o fue movida. Volve al inicio.</p></div><div className="flex gap-4 justify-center"><Link href="/" className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-8 py-3 uppercase tracking-widest text-sm transition-all hover:scale-105">Ir al inicio</Link><Link href="/catalogo" className="border border-zinc-700 hover:border-[#D4854A] text-zinc-400 hover:text-[#D4854A] font-bold px-8 py-3 uppercase tracking-widest text-sm transition-colors">Ver catalogo</Link></div></div></main>;
}
