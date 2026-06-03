'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' });
  const [registrado, setRegistrado] = useState(false);
  const inputStyle = { backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' };

  const handleSubmit = () => {
    if (!form.nombre || !form.email || !form.password) return;
    if (form.password !== form.confirmar) return;
    setRegistrado(true);
  };

  if (registrado) return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black" style={{ color: 'var(--text)' }}>¡Cuenta creada!</h2>
        <p className="text-sm" style={{ color: 'var(--text-2)' }}>Bienvenido a Punteo, <span className="text-[#D4854A]">{form.nombre}</span>.</p>
        <Link href="/login" className="inline-block bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-6 py-2 rounded-lg uppercase tracking-wider text-sm transition-colors">
          Ingresar
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 animate-[spin_8s_linear_infinite] mx-auto mb-4">
            <Image src="/logo.png" alt="Punteo" width={64} height={64} className="rounded-full" />
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Crear cuenta</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Unite a la comunidad Punteo</p>
        </div>
        <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          {[
            { key: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
            { key: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••' },
            { key: 'confirmar', label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>{field.label}</label>
              <input type={field.type} value={form[field.key as keyof typeof form]}
                onChange={e => setForm({...form, [field.key]: e.target.value})}
                placeholder={field.placeholder}
                className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
            </div>
          ))}
          <button onClick={handleSubmit}
            className="w-full bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-colors mt-2">
            Crear cuenta
          </button>
          <p className="text-center text-xs" style={{ color: 'var(--text-2)' }}>
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" className="text-[#D4854A] hover:underline">Ingresar</Link>
          </p>
        </div>
        <p className="text-center mt-6">
          <Link href="/" className="text-xs transition-colors hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>← Volver al inicio</Link>
        </p>
      </div>
    </main>
  );
}