'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FAQ: Record<string, string> = {
  'horario': 'Atendemos de lunes a sábado de 10 a 20hs. ¡También podés escribirnos por WhatsApp!',
  'envio': 'Hacemos envíos a todo el país. Envío gratis en compras mayores a $500.000.',
  'pago': 'Aceptamos efectivo, transferencia y tarjetas. Hasta 12 cuotas sin interés.',
  'garantia': 'Todos nuestros productos tienen garantía oficial de 12 meses.',
  'local': 'Estamos en Morón, Buenos Aires. ¡Podés pasar a ver los instrumentos en persona!',
  'contacto': 'Podés escribirnos por WhatsApp o Instagram @punteo.music.',
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(FAQ)) {
    if (lower.includes(key)) return FAQ[key];
  }
  if (lower.includes('guitar') || lower.includes('bajo') || lower.includes('teclado') || lower.includes('bater')) {
    return 'Tenemos una gran variedad de ese instrumento en nuestro catálogo. ¿Querés que te recomiende alguno según tu presupuesto?';
  }
  if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('cuesta')) {
    return 'Los precios varían según el modelo. Podés verlos todos en nuestro catálogo con filtros por precio. ¿Tenés un presupuesto en mente?';
  }
  return 'Gracias por tu consulta. Para más información podés contactarnos por WhatsApp o visitar nuestra tienda en Morón. ¿Hay algo más en lo que pueda ayudarte?';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente de Punteo 🎸 ¿En qué te puedo ayudar?' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const botMsg: Message = { role: 'bot', text: getBotResponse(input) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const suggestions = ['Horarios', 'Envíos', 'Medios de pago', 'Garantía'];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 bg-[#0f0f0f] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '420px' }}>
          {/* Header */}
          <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-white font-bold text-sm">Asistente Punteo</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#D4854A] text-black font-medium'
                    : 'bg-zinc-800 text-zinc-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map(s => (
                <button key={s} onClick={() => { setInput(s); }}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-full transition-colors border border-zinc-700">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4854A]"
            />
            <button onClick={send} className="bg-[#D4854A] hover:bg-[#c0742f] text-black p-2 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#D4854A] hover:bg-[#c0742f] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
        {open ? (
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}