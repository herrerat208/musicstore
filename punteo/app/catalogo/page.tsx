'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/nav-bar';
import CartDrawer from '@/components/cart-drawer';
import { useCart } from '@/components/cart-context';
import { brands, categories, maxCatalogPrice, products } from '@/lib/catalog';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Catalogo() {
  const { addItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxCatalogPrice]);
  const [sortOrder, setSortOrder] = useState('relevance');

  const toggleFilter = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxCatalogPrice]);
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const visibleProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    if (sortOrder === 'name') return a.name.localeCompare(b.name, 'es');
    return a.id - b.id;
  });

  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < maxCatalogPrice || searchQuery.trim().length > 0;

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <div className="sticky top-[72px] z-40 backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 animate-[spin_6s_linear_infinite] flex-shrink-0 hidden sm:block">
              <Image src="/logo.png" alt="Punteo" width={40} height={40} className="rounded-full" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-black tracking-tight" style={{ color: 'var(--text)' }}>PUNTEO</span>
              <span className="text-[#D4854A] text-xs uppercase tracking-wide">Catalogo</span>
            </div>
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input type="text" placeholder="Buscar instrumentos, marcas, modelos..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4854A] transition-colors"
                  style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-2)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <span className="text-sm hidden md:block" style={{ color: 'var(--text-2)' }}>{visibleProducts.length} productos</span>
          </div>
        </div>
      </div>

      <div className="max-w-[2100px] mx-auto px-6 py-8" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>Categorias</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)} className="w-4 h-4 rounded text-[#D4854A] focus:ring-[#D4854A] focus:ring-offset-0" />
                      <span className="text-sm group-hover:text-[#D4854A] transition-colors" style={{ color: 'var(--text-2)' }}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3" style={{ color: 'var(--text)' }}>Marcas</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)} className="w-4 h-4 rounded text-[#D4854A] focus:ring-[#D4854A] focus:ring-offset-0" />
                      <span className="text-sm group-hover:text-[#D4854A] transition-colors" style={{ color: 'var(--text-2)' }}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3" style={{ color: 'var(--text)' }}>Precio</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="number" placeholder="Desde" value={priceRange[0] || ''} onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])} className="w-full rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#D4854A]" style={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                    <input type="number" placeholder="Hasta" value={priceRange[1] === maxCatalogPrice ? '' : priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || maxCatalogPrice])} className="w-full rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#D4854A]" style={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  </div>
                  <input type="range" min="0" max={maxCatalogPrice} step="100000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-[#D4854A]" />
                  <div className="flex justify-between text-xs" style={{ color: 'var(--text-2)' }}><span>$0</span><span>{formatPrice(maxCatalogPrice)}</span></div>
                </div>
              </div>

              {hasFilters && <button onClick={clearFilters} className="w-full text-red-400 hover:text-[#D4854A] text-sm font-medium transition-colors">Limpiar filtros</button>}
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Catalogo</h2>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4854A]" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre</option>
              </select>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {visibleProducts.map(product => (
                  <article key={product.id} className="group rounded-xl overflow-hidden transition-all duration-200 hover:border-[#D4854A]/50" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                    <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: 'var(--bg-3)' }}>
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                      <span className="absolute top-3 left-3 px-2 py-1 rounded text-xs z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>{product.category}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-[#D4854A] uppercase tracking-wide font-medium">{product.brand}</p>
                        <h3 className="font-semibold leading-tight group-hover:text-[#D4854A] transition-colors line-clamp-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{formatPrice(product.price)}</p>
                          <p className="text-xs" style={{ color: 'var(--text-2)' }}>o 12 cuotas de {formatPrice(Math.round(product.price / 12))}</p>
                        </div>
                        <button onClick={() => addItem({ id: String(product.id), name: product.name, price: product.price, image: product.image, brand: product.brand })} className="bg-[#D4854A]/10 hover:bg-[#D4854A] text-[#D4854A] hover:text-black border border-[#D4854A] font-medium px-3 py-2 text-sm rounded-lg transition-all duration-200">Agregar</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Sin resultados</h3>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>Proba ajustando los filtros o tu busqueda</p>
                <button onClick={clearFilters} className="mt-4 text-[#D4854A] hover:text-[#c0742f] text-sm font-medium transition-colors">Limpiar todos los filtros</button>
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="py-6 px-4" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'var(--text-2)' }}>
          <p>(c) 2026 Punteo - Moron, Buenos Aires</p>
          <div className="flex items-center gap-4"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>Tienda abierta</span><a href="#" className="hover:text-[#D4854A] transition-colors">WhatsApp</a><a href="#" className="hover:text-[#D4854A] transition-colors">Instagram</a></div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
