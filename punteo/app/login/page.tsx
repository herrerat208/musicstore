'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const inputStyle = { backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 animate-[spin_8s_linear_infinite] mx-auto mb-4">
            <Image src="/logo.png" alt="Punteo" width={64} height={64} className="rounded-full" />
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Ingresar</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Accedé a tu cuenta de Punteo</p>
        </div>
        <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="tu@email.com" className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Contraseña</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              placeholder="••••••••" className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
          </div>
          <button className="w-full bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-colors mt-2">
            Ingresar
          </button>
          <p className="text-center text-xs" style={{ color: 'var(--text-2)' }}>
            ¿No tenés cuenta?{' '}
            <Link href="/registro" className="text-[#D4854A] hover:underline">Registrate</Link>
          </p>
        </div>
        <p className="text-center mt-6">
          <Link href="/" className="text-xs transition-colors hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>← Volver al inicio</Link>
        </p>
      </div>
    </main>
  );
}