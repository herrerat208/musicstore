'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'bot'; text: string; }

const FAQ: Record<string, string> = {
  horario: 'Atendemos de lunes a sabado de 10 a 20 hs. Tambien podes escribirnos por WhatsApp.',
  envio: 'Hacemos envios a todo el pais. Envio gratis en compras mayores a $500.000.',
  pago: 'Aceptamos efectivo, transferencia y tarjetas. Hasta 12 cuotas sin interes.',
  garantia: 'Todos nuestros productos tienen garantia oficial de 12 meses.',
  local: 'Estamos en Moron, Buenos Aires. Podes pasar a ver los instrumentos en persona.',
  contacto: 'Podes escribirnos por WhatsApp o Instagram @punteo.music.',
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(FAQ)) if (lower.includes(key)) return FAQ[key];
  if (lower.includes('guitar') || lower.includes('bajo') || lower.includes('teclado') || lower.includes('bater')) return 'Tenemos una gran variedad en nuestro catalogo. Queres que te recomiende alguno segun tu presupuesto?';
  if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('cuesta')) return 'Los precios varian segun el modelo. Podes verlos todos en el catalogo con filtros por precio.';
  return 'Gracias por tu consulta. Para mas informacion podes contactarnos por WhatsApp o visitar nuestra tienda en Moron.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: 'Hola! Soy el asistente de Punteo. En que te puedo ayudar?' }]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'bot', text: getBotResponse(input) }]);
    setInput('');
  };
  const suggestions = ['Horarios', 'Envios', 'Medios de pago', 'Garantia'];
  return <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    {open && <div className="w-80 bg-[#0f0f0f] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '420px' }}>
      <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800"><span className="text-white font-bold text-sm">Asistente Punteo</span><button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white">Cerrar</button></div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">{messages.map((msg, i) => <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#D4854A] text-black font-medium' : 'bg-zinc-800 text-zinc-200'}`}>{msg.text}</div></div>)}<div ref={bottomRef} /></div>
      {messages.length <= 2 && <div className="px-3 pb-2 flex flex-wrap gap-1.5">{suggestions.map(s => <button key={s} onClick={() => setInput(s)} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700">{s}</button>)}</div>}
      <div className="p-3 border-t border-zinc-800 flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Escribi tu consulta..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4854A]" /><button onClick={send} className="bg-[#D4854A] hover:bg-[#c0742f] text-black px-3 rounded-lg">Enviar</button></div>
    </div>}
    <button onClick={() => setOpen(!open)} className="w-14 h-14 bg-[#D4854A] hover:bg-[#c0742f] rounded-full shadow-lg flex items-center justify-center text-black font-bold">{open ? 'X' : '?'}</button>
  </div>;
}
