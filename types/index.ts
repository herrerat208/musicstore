// types/index.ts
export type Categoria =
  | 'guitarras'
  | 'bajos'
  | 'baterias'
  | 'teclados'
  | 'microfonos'
  | 'equipos'

export type NivelMusical = 'principiante' | 'intermedio' | 'avanzado'

export interface Product {
  id: string
  nombre: string
  marca: string
  categoria: Categoria
  precio: number
  descripcion: string
  imagen: string
  etiquetas: string[]
  nivelMusical: NivelMusical[]
  stock: number
  badge?: 'Nuevo' | 'Oferta' | 'Popular' | 'Premium'
}

export interface CartItem extends Product {
  qty: number
}

export interface ContactForm {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

export interface NewsletterForm {
  email: string
}

export interface RecomendadorForm {
  nivelMusical: NivelMusical
  presupuesto: number
  generoMusical: string
  tipoInstrumento: Categoria
  marcaPreferida?: string
}