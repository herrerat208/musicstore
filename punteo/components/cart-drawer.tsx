'use client';

import Image from 'next/image';
import { useCart } from '@/components/cart-context';
import { useEffect } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, total, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const fmt = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col animate-slide-in-right"
        style={{ backgroundColor: 'var(--bg)', borderLeft: '1px solid var(--border)' }}>

        {/* Header */}
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-2)' }}>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Tu Carrito</h2>
            <p className="text-xs text-[#D4854A]">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
          </div>
          <button onClick={onClose} className="p-2 transition-colors hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-2)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--text-2)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p style={{ color: 'var(--text-2)' }}>El carrito está vacío</p>
              <button onClick={onClose} className="text-[#D4854A] text-sm hover:underline">Volver al catálogo</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-lg group" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 relative" style={{ backgroundColor: 'var(--bg-3)' }}>
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--text-2)' }}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: 'var(--text)' }}>{item.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--text-2)' }}>{item.brand}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 rounded px-1" style={{ border: '1px solid var(--border)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-lg hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>−</button>
                      <span className="text-xs font-medium w-5 text-center" style={{ color: 'var(--text)' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-lg hover:text-[#D4854A]" style={{ color: 'var(--text-2)' }}>+</button>
                    </div>
                    <p className="text-sm font-bold text-[#D4854A]">{fmt(item.price * item.quantity)}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start p-1 opacity-0 group-hover:opacity-100 transition-all hover:text-red-500" style={{ color: 'var(--text-2)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 space-y-4" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-2)' }}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between" style={{ color: 'var(--text-2)' }}>
                <span>Subtotal</span><span>{fmt(total)}</span>
              </div>
              <div className="flex justify-between" style={{ color: 'var(--text-2)' }}>
                <span>Envío</span><span className="text-green-500">Gratis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2" style={{ borderTop: '1px solid var(--border)', color: 'var(--text)' }}>
                <span>Total</span><span className="text-[#D4854A]">{fmt(total)}</span>
              </div>
            </div>
            <button className="w-full bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all duration-200">
              Iniciar Compra
            </button>
            <button onClick={clearCart} className="w-full text-xs text-center transition-colors hover:text-red-500" style={{ color: 'var(--text-2)' }}>
              Vaciar carrito
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}