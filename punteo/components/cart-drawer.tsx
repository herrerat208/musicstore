'use client';

import { useCart } from '@/components/cart-context';
import { useEffect } from 'react';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart, total, totalItems } = useCart();
  
  // Prevenir scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel lateral del carrito */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-zinc-800 z-50 shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Header del carrito */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div>
            <h2 className="text-lg font-bold text-white">Tu Carrito</h2>
            <p className="text-xs text-[#D4854A]">{totalItems} productos</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-zinc-400">El carrito está vacío</p>
              <button 
                onClick={onClose}
                className="text-[#D4854A] text-sm hover:underline"
              >
                Volver al catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-zinc-900/30 p-3 rounded-lg border border-zinc-800 group">
                {/* Imagen pequeña (Placeholder) */}
                <div className="w-20 h-20 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0">
                   <span className="text-2xl opacity-50">
                    {item.image === 'guitarra' && ''}
                    {item.image === 'bajo' && '🎸'}
                    {item.image === 'bateria' && '🥁'}
                    {item.image === 'teclado' && ''}
                    {item.image === 'microfono' && '🎤'}
                    {item.image === 'viento' && '🎷'}
                  </span>
                </div>

                {/* Info y controles */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-zinc-500">{item.brand}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-zinc-700 rounded px-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[#D4854A]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>

                {/* Botón eliminar */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-600 hover:text-[#C0392B] transition-colors self-start p-1 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer del carrito (Totales y botón Checkout) */}
        {items.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span className="text-[#22c55e]">Gratis</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-zinc-700">
                <span>Total</span>
                <span className="text-[#D4854A]">{formatPrice(total)}</span>
              </div>
            </div>

            <button className="w-full bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold py-3 rounded-lg uppercase tracking-wider text-sm transition-all duration-200">
              Iniciar Compra
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full text-zinc-500 hover:text-[#C0392B] text-xs text-center transition-colors"
            >
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