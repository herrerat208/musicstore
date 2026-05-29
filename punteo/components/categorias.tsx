const categorias = [
  { nombre: "Guitarras", emoji: "🎸", descripcion: "Eléctricas, acústicas y clásicas" },
  { nombre: "Bajos", emoji: "🎵", descripcion: "Eléctricos y acústicos" },
  { nombre: "Batería", emoji: "🥁", descripcion: "Acústica y electrónica" },
  { nombre: "Teclados", emoji: "🎹", descripcion: "Pianos y sintetizadores" },
  { nombre: "Vientos", emoji: "🎺", descripcion: "Saxo, trompeta y más" },
  { nombre: "Sonido", emoji: "🎚️", descripcion: "Micrófonos y equipos" },
];

export default function Categorias() {
  return (
    <section id="categorias" className="bg-[#0a0a0a] py-24 px-8">
      
      {/* Título */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-zinc-800" />
          <h2 className="text-zinc-500 text-xs uppercase tracking-[0.4em]">Explorá por categoría</h2>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="group border border-zinc-800 hover:border-[#D4854A] bg-zinc-900/30 hover:bg-zinc-900/60 p-8 cursor-pointer transition-all duration-300"
            >
              <span className="text-4xl block mb-4">{cat.emoji}</span>
              <h3 className="text-white font-black text-xl uppercase tracking-tight group-hover:text-[#D4854A] transition-colors duration-300">
                {cat.nombre}
              </h3>
              <p className="text-zinc-500 text-sm mt-1">{cat.descripcion}</p>
              <div className="mt-6 w-0 group-hover:w-8 h-px bg-[#D4854A] transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}