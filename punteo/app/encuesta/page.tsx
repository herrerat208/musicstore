'use client';
import { useState } from 'react';
import Navbar from '@/components/nav-bar';
import Link from 'next/link';

const steps = [
  { key: 'nivel', question: '¿Cuál es tu nivel musical?', options: ['Principiante', 'Intermedio', 'Avanzado', 'Profesional'] },
  { key: 'instrumento', question: '¿Qué tipo de instrumento te interesa?', options: ['Guitarra / Bajo', 'Batería / Percusión', 'Teclado / Piano', 'Vientos', 'Cuerdas clásicas', 'Otro'] },
  { key: 'genero', question: '¿Qué género musical tocás o querés tocar?', options: ['Rock / Metal', 'Pop / Indie', 'Jazz / Blues', 'Clásica', 'Folklore', 'Electrónica'] },
  { key: 'presupuesto', question: '¿Cuál es tu presupuesto aproximado?', options: ['Hasta $500.000', '$500.000 - $1.500.000', '$1.500.000 - $3.000.000', 'Más de $3.000.000'] },
];

const recommendations: Record<string, string[]> = {
  'Guitarra / Bajo-Principiante': ['Yamaha Pacifica 112V', 'Ibanez GRG121DX', 'Yamaha TRBX174'],
  'Guitarra / Bajo-Intermedio': ['Fender Telecaster Player', 'PRS SE Custom 24', 'Fender Jazz Bass'],
  'Guitarra / Bajo-Avanzado': ['Fender Stratocaster American Pro', 'Gibson Les Paul Standard'],
  'Teclado / Piano-Principiante': ['Casio CT-S300', 'Yamaha PSR-E373'],
  'Teclado / Piano-Intermedio': ['Korg B2 Digital Piano', 'Yamaha P-45', 'Roland FP-30X Digital'],
  'Batería / Percusión-Principiante': ['Pearl Roadshow', 'Mapex Tornado'],
  'Batería / Percusión-Intermedio': ['Pearl Export EXX725', 'Yamaha Stage Custom', 'Tama Imperialstar'],
};

export default function Encuesta() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const select = (value: string) => {
    const newAnswers = { ...answers, [steps[step].key]: value };
    setAnswers(newAnswers);
    if (step < steps.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const getRecs = () => recommendations[`${answers.instrumento}-${answers.nivel}`]
    || ['Fender Stratocaster American Pro', 'Yamaha P-45', 'Pearl Export EXX725'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="w-full max-w-lg py-16">
          {!done ? (
            <>
              <div className="flex gap-1.5 mb-8">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-[#D4854A]' : ''}`}
                    style={i <= step ? {} : { backgroundColor: 'var(--border)' }} />
                ))}
              </div>
              <p className="text-[#D4854A] text-xs uppercase tracking-[0.3em] mb-2">Paso {step + 1} de {steps.length}</p>
              <h2 className="text-3xl font-black mb-8" style={{ color: 'var(--text)' }}>{steps[step].question}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[step].options.map(opt => (
                  <button key={opt} onClick={() => select(opt)}
                    className="font-medium px-5 py-4 rounded-xl text-left transition-all duration-200 hover:translate-x-1 hover:border-[#D4854A] hover:text-[#D4854A]"
                    style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    {opt}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-sm transition-colors hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>
                  ← Volver
                </button>
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <div>
                <p className="text-[#D4854A] text-xs uppercase tracking-[0.3em] mb-2">Tus recomendaciones</p>
                <h2 className="text-3xl font-black" style={{ color: 'var(--text)' }}>Estos instrumentos son para vos</h2>
                <p className="text-sm mt-2" style={{ color: 'var(--text-2)' }}>
                  Basado en tu perfil: <span style={{ color: 'var(--text)' }}>{answers.nivel} · {answers.instrumento} · {answers.genero}</span>
                </p>
              </div>
              <div className="space-y-3 text-left">
                {getRecs().map((item, i) => (
                  <div key={i} className="rounded-xl px-5 py-4 flex items-center gap-4"
                    style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                    <span className="text-[#D4854A] font-black text-xl">{i + 1}</span>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--text)' }}>{item}</p>
                      <p className="text-xs" style={{ color: 'var(--text-2)' }}>Disponible en nuestro catálogo</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-center pt-2">
                <Link href="/catalogo" className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-6 py-3 rounded-lg uppercase tracking-wider text-sm transition-colors">
                  Ver catálogo
                </Link>
                <button onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
                  className="font-medium px-6 py-3 rounded-lg text-sm transition-colors hover:border-[#D4854A] hover:text-[#D4854A]"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  Volver a empezar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}