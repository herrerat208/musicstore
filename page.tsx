// app/catalogo/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/nav-bar';
import CartDrawer from '@/components/cart-drawer';
import { useCart } from '@/components/cart-context';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  image: string;
}

// Categorías actualizadas
const categories = [
  'Guitarras', 'Bajos', 'Batería', 'Teclados', 'Vientos', 'Sonido',
  'Pianos', 'Violines', 'Violonchelos', 'Violas', 'Contrabajo',
  'Percusión', 'Acordeón', 'Ukelele', 'Banjo', 'Mandolina', 'Armónica', 'Arpa'
];

// Marcas actualizadas
const brands = [
  'Fender', 'Gibson', 'Yamaha', 'Pearl', 'Shure', 'Audio-Technica', 
  'Roland', 'Ibanez', 'Kawai', 'Nord', 'Korg', 'Casio', 'Tama', 'Mapex',
  'Hohner', 'Pigini', 'Victoria', 'Kala', 'Cordoba', 'Deering', 'Gold Tone',
  'Kentucky', 'Suzuki', 'Rees Harps', 'Dusty Strings', 'Aulos', 'Buffet', 
  'Selmer', 'Bach', 'Jean Paul USA', 'LP', 'Meinl', 'Stentor', 'Cremona', 
  'Knilling', 'Sterling by Music Man', 'Epiphone', 'PRS', 'Jackson'
];

const products: Product[] = [
  // GUITARRAS
  { id: 1, name: 'Fender Stratocaster American Pro', category: 'Guitarras', price: 2850000, brand: 'Fender', image: '/productos/fender-stratocaster-pro.jpg' },
  { id: 2, name: 'Gibson Les Paul Standard', category: 'Guitarras', price: 4200000, brand: 'Gibson', image: '/productos/gibson-lespaul.jpg' },
  { id: 12, name: 'Ibanez GRG121DX', category: 'Guitarras', price: 620000, brand: 'Ibanez', image: '/productos/ibanez-grg121.jpg' },
  { id: 13, name: 'Fender Telecaster Player', category: 'Guitarras', price: 1450000, brand: 'Fender', image: '/productos/fender-telecaster.jpg' },
  { id: 14, name: 'Gibson SG Standard', category: 'Guitarras', price: 2100000, brand: 'Gibson', image: '/productos/gibson-sg.jpg' },
  { id: 15, name: 'Ibanez RG421', category: 'Guitarras', price: 780000, brand: 'Ibanez', image: '/productos/ibanez-rg421.jpg' },
  { id: 16, name: 'Yamaha Pacifica 112V', category: 'Guitarras', price: 520000, brand: 'Yamaha', image: '/productos/yamaha-pacifica.jpg' },
  { id: 17, name: 'Epiphone Les Paul Standard', category: 'Guitarras', price: 890000, brand: 'Epiphone', image: '/productos/epiphone-lespaul.jpg' },
  { id: 18, name: 'PRS SE Custom 24', category: 'Guitarras', price: 1650000, brand: 'PRS', image: '/productos/prs-se-custom.jpg' },
  { id: 19, name: 'Jackson JS32 Dinky', category: 'Guitarras', price: 680000, brand: 'Jackson', image: '/productos/jackson-dinky.jpg' },
  
  // BAJOS
  { id: 3, name: 'Ibanez SR300E Bass', category: 'Bajos', price: 890000, brand: 'Ibanez', image: '/productos/ibanez-sr300.jpg' },
  { id: 4, name: 'Fender Precision Bass', category: 'Bajos', price: 1650000, brand: 'Fender', image: '/productos/fender-precision.jpg' },
  { id: 20, name: 'Fender Jazz Bass', category: 'Bajos', price: 1750000, brand: 'Fender', image: '/productos/fender-jazz.jpg' },
  { id: 21, name: 'Ibanez GSR200', category: 'Bajos', price: 520000, brand: 'Ibanez', image: '/productos/ibanez-gsr200.jpg' },
  { id: 22, name: 'Yamaha TRBX174', category: 'Bajos', price: 450000, brand: 'Yamaha', image: '/productos/yamaha-trbx174.jpg' },
  { id: 23, name: 'Epiphone Thunderbird', category: 'Bajos', price: 780000, brand: 'Epiphone', image: '/productos/epiphone-thunderbird.jpg' },
  { id: 24, name: 'Sterling by Music Man SUB Ray4', category: 'Bajos', price: 620000, brand: 'Sterling by Music Man', image: '/productos/musicman-ray4.jpg' },
  
  // BATERÍA
  { id: 5, name: 'Pearl Export EXX725', category: 'Batería', price: 1200000, brand: 'Pearl', image: '/productos/pearl-export.jpg' },
  { id: 6, name: 'Yamaha Stage Custom', category: 'Batería', price: 1450000, brand: 'Yamaha', image: '/productos/yamaha-stage.jpg' },
  { id: 25, name: 'Tama Imperialstar', category: 'Batería', price: 1350000, brand: 'Tama', image: '/productos/tama-imperialstar.jpg' },
  { id: 26, name: 'Pearl Roadshow', category: 'Batería', price: 850000, brand: 'Pearl', image: '/productos/pearl-roadshow.jpg' },
  { id: 27, name: 'Yamaha GigMaker', category: 'Batería', price: 920000, brand: 'Yamaha', image: '/productos/yamaha-gigmaker.jpg' },
  { id: 28, name: 'Mapex Tornado', category: 'Batería', price: 780000, brand: 'Mapex', image: '/productos/mapex-tornado.jpg' },
  
  // TECLADOS
  { id: 7, name: 'Roland FP-30X Digital', category: 'Teclados', price: 980000, brand: 'Roland', image: '/productos/roland-fp30x.jpg' },
  { id: 8, name: 'Yamaha PSR-E373', category: 'Teclados', price: 450000, brand: 'Yamaha', image: '/productos/yamaha-psre373.jpg' },
  { id: 29, name: 'Casio CT-S300', category: 'Teclados', price: 380000, brand: 'Casio', image: '/productos/casio-cts300.jpg' },
  { id: 30, name: 'Korg B2 Digital Piano', category: 'Teclados', price: 850000, brand: 'Korg', image: '/productos/korg-b2.jpg' },
  { id: 31, name: 'Yamaha P-45', category: 'Teclados', price: 720000, brand: 'Yamaha', image: '/productos/yamaha-p45.jpg' },
  { id: 32, name: 'Roland GO:KEYS', category: 'Teclados', price: 650000, brand: 'Roland', image: '/productos/roland-gokeys.jpg' },
  { id: 33, name: 'Korg Microkey 61', category: 'Teclados', price: 420000, brand: 'Korg', image: '/productos/korg-microkey.jpg' },
  
  // VIENTOS
  { id: 11, name: 'Yamaha YTS-280 Saxofón', category: 'Vientos', price: 1350000, brand: 'Yamaha', image: '/productos/yamaha-yts280.jpg' },
  { id: 34, name: 'Yamaha YTR-2330 Trompeta', category: 'Vientos', price: 980000, brand: 'Yamaha', image: '/productos/yamaha-ytr2330.jpg' },
  { id: 35, name: 'Bach Stradivarius Trombón', category: 'Vientos', price: 2100000, brand: 'Bach', image: '/productos/bach-trombon.jpg' },
  { id: 36, name: 'Yamaha YCL-255 Clarinete', category: 'Vientos', price: 1150000, brand: 'Yamaha', image: '/productos/yamaha-ycl255.jpg' },
  { id: 37, name: 'Jean Paul USA Flauta', category: 'Vientos', price: 420000, brand: 'Jean Paul USA', image: '/productos/jeanpaul-flauta.jpg' },
  { id: 84, name: 'Yamaha YRS-302B Flauta Dulce', category: 'Vientos', price: 45000, brand: 'Yamaha', image: '/productos/yamaha-yrs302.jpg' },
  { id: 85, name: 'Aulos 309 Flauta Dulce', category: 'Vientos', price: 38000, brand: 'Aulos', image: '/productos/aulos-309.jpg' },
  { id: 86, name: 'Buffet E11 Clarinete', category: 'Vientos', price: 2100000, brand: 'Buffet', image: '/productos/buffet-e11.jpg' },
  { id: 87, name: 'Yamaha YCL-450 Clarinete', category: 'Vientos', price: 1850000, brand: 'Yamaha', image: '/productos/yamaha-ycl450.jpg' },
  { id: 88, name: 'Yamaha YOB-241 Oboe', category: 'Vientos', price: 3200000, brand: 'Yamaha', image: '/productos/yamaha-yob241.jpg' },
  { id: 89, name: 'Yamaha YFG-811 Fagot', category: 'Vientos', price: 8500000, brand: 'Yamaha', image: '/productos/yamaha-yfg811.jpg' },
  { id: 90, name: 'Yamaha YHR-322II Trompa', category: 'Vientos', price: 2800000, brand: 'Yamaha', image: '/productos/yamaha-yhr322.jpg' },
  { id: 91, name: 'Yamaha YBB-321 Tuba', category: 'Vientos', price: 6500000, brand: 'Yamaha', image: '/productos/yamaha-ybb321.jpg' },
  { id: 92, name: 'Yamaha YAS-280 Saxo Alto', category: 'Vientos', price: 1650000, brand: 'Yamaha', image: '/productos/yamaha-yas280.jpg' },
  { id: 93, name: 'Selmer AS500 Saxo Alto', category: 'Vientos', price: 2800000, brand: 'Selmer', image: '/productos/selmer-as500.jpg' },
  { id: 94, name: 'Yamaha YTS-480 Saxo Tenor', category: 'Vientos', price: 2400000, brand: 'Yamaha', image: '/productos/yamaha-yts480.jpg' },
  
  // SONIDO
  { id: 9, name: 'Shure SM58-LCE', category: 'Sonido', price: 185000, brand: 'Shure', image: '/productos/shure-sm58.jpg' },
  { id: 10, name: 'Audio-Technica AT2020', category: 'Sonido', price: 220000, brand: 'Audio-Technica', image: '/productos/audiotechnica-at2020.jpg' },
  { id: 38, name: 'Shure SM57', category: 'Sonido', price: 175000, brand: 'Shure', image: '/productos/shure-sm57.jpg' },
  { id: 39, name: 'Audio-Technica ATH-M50x', category: 'Sonido', price: 320000, brand: 'Audio-Technica', image: '/productos/audiotechnica-m50x.jpg' },
  { id: 40, name: 'Behringer U-Phoria UM2', category: 'Sonido', price: 145000, brand: 'Behringer', image: '/productos/behringer-um2.jpg' },
  { id: 41, name: 'Focusrite Scarlett Solo', category: 'Sonido', price: 380000, brand: 'Focusrite', image: '/productos/focusrite-solo.jpg' },
  { id: 42, name: 'AKG P420', category: 'Sonido', price: 280000, brand: 'AKG', image: '/productos/akg-p420.jpg' },
  { id: 43, name: 'Rode NT1-A', category: 'Sonido', price: 420000, brand: 'Rode', image: '/productos/rode-nt1a.jpg' },

  // PIANOS
  { id: 44, name: 'Yamaha U1 Piano Vertical', category: 'Pianos', price: 8500000, brand: 'Yamaha', image: '/productos/yamaha-u1.jpg' },
  { id: 45, name: 'Kawai K-300 Piano Vertical', category: 'Pianos', price: 7800000, brand: 'Kawai', image: '/productos/kawai-k300.jpg' },
  { id: 46, name: 'Yamaha C1X Piano de Cola', category: 'Pianos', price: 25000000, brand: 'Yamaha', image: '/productos/yamaha-c1x.jpg' },
  { id: 47, name: 'Roland LX-708 Digital', category: 'Pianos', price: 4200000, brand: 'Roland', image: '/productos/roland-lx708.jpg' },
  { id: 48, name: 'Kawai CA99 Digital', category: 'Pianos', price: 3800000, brand: 'Kawai', image: '/productos/kawai-ca99.jpg' },
  { id: 49, name: 'Nord Piano 5 Stage', category: 'Pianos', price: 5200000, brand: 'Nord', image: '/productos/nord-piano5.jpg' },

  // VIOLINES
  { id: 50, name: 'Yamaha V5SA Violín 4/4', category: 'Violines', price: 850000, brand: 'Yamaha', image: '/productos/yamaha-v5sa.jpg' },
  { id: 51, name: 'Stentor Student II Violín', category: 'Violines', price: 420000, brand: 'Stentor', image: '/productos/stentor-student.jpg' },
  { id: 52, name: 'Cremona SV-175 Violín', category: 'Violines', price: 680000, brand: 'Cremona', image: '/productos/cremona-sv175.jpg' },
  { id: 53, name: 'Knilling Perfection Violín', category: 'Violines', price: 1200000, brand: 'Knilling', image: '/productos/knilling-perfection.jpg' },
  { id: 54, name: 'Yamaha V7SG Violín', category: 'Violines', price: 1850000, brand: 'Yamaha', image: '/productos/yamaha-v7sg.jpg' },

  // VIOLONCHELOS
  { id: 55, name: 'Yamaha VC5S Violonchelo 4/4', category: 'Violonchelos', price: 1650000, brand: 'Yamaha', image: '/productos/yamaha-vc5s.jpg' },
  { id: 56, name: 'Stentor Cello 4/4', category: 'Violonchelos', price: 980000, brand: 'Stentor', image: '/productos/stentor-cello.jpg' },
  { id: 57, name: 'Knilling 134VC Violonchelo', category: 'Violonchelos', price: 2100000, brand: 'Knilling', image: '/productos/knilling-cello.jpg' },

  // VIOLAS
  { id: 58, name: 'Yamaha VA5 Viola 16"', category: 'Violas', price: 920000, brand: 'Yamaha', image: '/productos/yamaha-va5.jpg' },
  { id: 59, name: 'Cremona SV-150 Viola', category: 'Violas', price: 750000, brand: 'Cremona', image: '/productos/cremona-viola.jpg' },

  // CONTRABAJO
  { id: 60, name: 'Stentor Bass 3/4', category: 'Contrabajo', price: 2800000, brand: 'Stentor', image: '/productos/stentor-bass.jpg' },
  { id: 61, name: 'Yamaha SLB200 Silent Bass', category: 'Contrabajo', price: 4500000, brand: 'Yamaha', image: '/productos/yamaha-slb200.jpg' },

  // PERCUSIÓN
  { id: 62, name: 'LP Aspire Congas', category: 'Percusión', price: 680000, brand: 'LP', image: '/productos/lp-congas.jpg' },
  { id: 63, name: 'Meinl Bongos', category: 'Percusión', price: 320000, brand: 'Meinl', image: '/productos/meinl-bongos.jpg' },
  { id: 64, name: 'Cajón Peruano Professional', category: 'Percusión', price: 280000, brand: 'Pearl', image: '/productos/cajon-peruano.jpg' },
  { id: 65, name: 'Pearl PFB-200 Bongos', category: 'Percusión', price: 380000, brand: 'Pearl', image: '/productos/pearl-bongos.jpg' },
  { id: 66, name: 'LP Galaxia Timbales', category: 'Percusión', price: 850000, brand: 'LP', image: '/productos/lp-timbales.jpg' },
  { id: 67, name: 'Meinl Djembe 12"', category: 'Percusión', price: 420000, brand: 'Meinl', image: '/productos/meinl-djembe.jpg' },

  // ACORDEÓN
  { id: 68, name: 'Hohner Bravo III 72', category: 'Acordeón', price: 1850000, brand: 'Hohner', image: '/productos/hohner-bravo.jpg' },
  { id: 69, name: 'Pigini M1 Piano', category: 'Acordeón', price: 3200000, brand: 'Pigini', image: '/productos/pigini-m1.jpg' },
  { id: 70, name: 'Victoria 402 PM', category: 'Acordeón', price: 2800000, brand: 'Victoria', image: '/productos/victoria-402.jpg' },

  // UKELELE
  { id: 71, name: 'Kala KA-S Soprano', category: 'Ukelele', price: 180000, brand: 'Kala', image: '/productos/kala-soprano.jpg' },
  { id: 72, name: 'Fender Venice Soprano', category: 'Ukelele', price: 220000, brand: 'Fender', image: '/productos/fender-venice.jpg' },
  { id: 73, name: 'Cordoba 15CM Concert', category: 'Ukelele', price: 280000, brand: 'Cordoba', image: '/productos/cordoba-15cm.jpg' },
  { id: 74, name: 'Kala KA-T Tenor', category: 'Ukelele', price: 320000, brand: 'Kala', image: '/productos/kala-tenor.jpg' },

  // BANJO
  { id: 75, name: 'Deering Goodtime Banjo', category: 'Banjo', price: 850000, brand: 'Deering', image: '/productos/deering-goodtime.jpg' },
  { id: 76, name: 'Gold Tone AC-1 Banjo', category: 'Banjo', price: 620000, brand: 'Gold Tone', image: '/productos/goldtone-ac1.jpg' },

  // MANDOLINA
  { id: 77, name: 'Ibanez M510 Mandolina', category: 'Mandolina', price: 420000, brand: 'Ibanez', image: '/productos/ibanez-m510.jpg' },
  { id: 78, name: 'Kentucky KM-150 Mandolina', category: 'Mandolina', price: 780000, brand: 'Kentucky', image: '/productos/kentucky-km150.jpg' },

  // ARMÓNICA
  { id: 79, name: 'Hohner Marine Band', category: 'Armónica', price: 85000, brand: 'Hohner', image: '/productos/hohner-marine.jpg' },
  { id: 80, name: 'Suzuki Promaster', category: 'Armónica', price: 120000, brand: 'Suzuki', image: '/productos/suzuki-promaster.jpg' },
  { id: 81, name: 'Hohner Special 20', category: 'Armónica', price: 95000, brand: 'Hohner', image: '/productos/hohner-special20.jpg' },

  // ARPA
  { id: 82, name: 'Rees Harps Sharpsicle', category: 'Arpa', price: 1200000, brand: 'Rees Harps', image: '/productos/rees-sharpsicle.jpg' },
  { id: 83, name: 'Dusty Strings Harpsicle', category: 'Arpa', price: 1850000, brand: 'Dusty Strings', image: '/productos/dusty-harpsicle.jpg' },
];

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);

  const toggleFilter = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Header sticky */}
      <div className="sticky top-[72px] z-40 backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 animate-[spin_6s_linear_infinite] flex-shrink-0 hidden sm:block">
              <Image src="/logo.png" alt="Punteo" width={40} height={40} className="rounded-full" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-black tracking-tight" style={{ color: 'var(--text)' }}>PUNTEO</span>
              <span className="text-[#D4854A] text-xs uppercase tracking-wide">Catálogo</span>
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
            <span className="text-sm hidden md:block" style={{ color: 'var(--text-2)' }}>{filteredProducts.length} productos</span>
          </div>
        </div>
      </div>

      <div className="max-w-[2100px] mx-auto px-6 py-8" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="flex gap-6">

          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-6">

              {/* Categorías */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <svg className="w-4 h-4 text-[#D4854A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Categorías
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                        className="w-4 h-4 rounded text-[#D4854A] focus:ring-[#D4854A] focus:ring-offset-0"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-3)' }} />
                      <span className="text-sm group-hover:text-[#D4854A] transition-colors" style={{ color: 'var(--text-2)' }}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Marcas */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <svg className="w-4 h-4 text-[#D4854A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Marcas
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                        className="w-4 h-4 rounded text-[#D4854A] focus:ring-[#D4854A] focus:ring-offset-0"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-3)' }} />
                      <span className="text-sm group-hover:text-[#D4854A] transition-colors" style={{ color: 'var(--text-2)' }}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <svg className="w-4 h-4 text-[#D4854A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Precio
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="number" placeholder="Desde" value={priceRange[0] || ''}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="w-full rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#D4854A]"
                      style={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                    <input type="number" placeholder="Hasta" value={priceRange[1] === 10000000 ? '' : priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000000])}
                      className="w-full rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#D4854A]"
                      style={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  </div>
                  <input type="range" min="0" max="10000000" step="100000" value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-[#D4854A]" />
                  <div className="flex justify-between text-xs" style={{ color: 'var(--text-2)' }}>
                    <span>$0</span><span>$10M+</span>
                  </div>
                </div>
              </div>

              {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000000) && (
                <button onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setPriceRange([0, 10000000]); }}
                  className="w-full text-red-400 hover:text-[#D4854A] text-sm font-medium transition-colors">
                  Limpiar filtros
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>Catálogo</h2>
              <select className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4854A]"
                style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                <option>Relevancia</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Novedades</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <article key={product.id}
                    className="group rounded-xl overflow-hidden transition-all duration-200 hover:border-[#D4854A]/50"
                    style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                    <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: 'var(--bg-3)' }}>
                      <Image src={product.image} alt={product.name} fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <span className="absolute top-3 left-3 px-2 py-1 rounded text-xs z-10"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                        {product.category}
                      </span>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <button className="bg-[#D4854A] hover:bg-[#c0742f] text-black font-bold px-4 py-2 text-sm uppercase tracking-wide transition-colors">
                          Ver detalle
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-[#D4854A] uppercase tracking-wide font-medium">{product.brand}</p>
                        <h3 className="font-semibold leading-tight group-hover:text-[#D4854A] transition-colors line-clamp-2" style={{ color: 'var(--text)' }}>
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>{formatPrice(product.price)}</p>
                          <p className="text-xs" style={{ color: 'var(--text-2)' }}>o 12 cuotas de {formatPrice(Math.round(product.price / 12))}</p>
                        </div>
                        <button onClick={() => addItem({ id: String(product.id), name: product.name, price: product.price, image: product.image, brand: product.brand })}
                          className="bg-[#D4854A]/10 hover:bg-[#D4854A] text-[#D4854A] hover:text-black border border-[#D4854A] font-medium px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-2)' }}>
                  <svg className="w-8 h-8" style={{ color: 'var(--text-2)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Sin resultados</h3>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>Probá ajustando los filtros o tu búsqueda</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategories([]); setSelectedBrands([]); setPriceRange([0, 10000000]); }}
                  className="mt-4 text-[#D4854A] hover:text-[#c0742f] text-sm font-medium transition-colors">
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="py-6 px-4" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'var(--text-2)' }}>
          <p>© 2026 Punteo · Morón, Buenos Aires</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>Tienda abierta</span>
            <a href="#" className="hover:text-[#D4854A] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#D4854A] transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}