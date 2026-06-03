// app/layout.tsx
import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { ThemeProvider } from './context/theme-context'
import Chatbot from '@/components/chatbot'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Punteo — Instrumentos Musicales',
  description: 'Tu tienda de instrumentos musicales en Argentina. Guitarras, bajos, baterías, teclados y más.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} font-dm bg-[#0a0a0a] text-[#F5EFE0] antialiased`}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
        <Chatbot />
      </body>
    </html>
  )
}