'use client';
import { useState } from 'react';
import Navbar from '@/components/nav-bar';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    setEnviado(true);
  };

  const inputStyle = { backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="mb-10">
            <p className="text-[#D4854A] text-xs uppercase tracking-[0.3em] font-medium mb-2">Punteo · Morón, BA</p>
            <h1 className="text-5xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Contacto</h1>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>¿Tenés una consulta? Escribinos y te respondemos a la brevedad.</p>
          </div>

          {enviado ? (
            <div className="rounded-xl p-8 text-center space-y-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>¡Mensaje enviado!</h3>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Te respondemos a <span className="text-[#D4854A]">{form.email}</span> a la brevedad.</p>
              <button onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }); }}
                className="text-[#D4854A] text-sm hover:underline">Enviar otro mensaje</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Nombre *</label>
                  <input type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
                    placeholder="Tu nombre" className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="tu@email.com" className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Asunto</label>
                <input type="text" value={form.asunto} onChange={e => setForm({...form, asunto: e.target.value})}
                  placeholder="¿En qué te podemos ayudar?" className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Mensaje *</label>
                <textarea value={form.mensaje} onChange={e => setForm({...form, mensaje: e.target.value})}
                  placeholder="Contanos tu consulta..." rows={5}
                  className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D4854A] resize-none" style={inputStyle} />
              </div>
              <button onClick={handleSubmit}
                className="w-full bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-colors">
                Enviar mensaje
              </button>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'WhatsApp', value: '+54 11 XXXX-XXXX', icon: '📱' },
              { label: 'Instagram', value: '@punteo.music', icon: '📸' },
              { label: 'Ubicación', value: 'Morón, Buenos Aires', icon: '📍' },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs uppercase tracking-wider mt-2" style={{ color: 'var(--text-2)' }}>{item.label}</p>
                <p className="text-sm font-medium mt-1" style={{ color: 'var(--text)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}