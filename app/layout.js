import { Cormorant_Garamond, EB_Garamond } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
})

export const metadata = {
  title: "Chaya's Posts — Words from the Heart",
  description:
    "A personal literary space where Chaya Chouksey shares her poems, reflections, and voice recordings.",
  keywords: ['poetry', 'literature', 'Chaya Chouksey', 'Hindi poetry', 'reflections'],
  openGraph: {
    title: "Chaya's Posts",
    description: 'Words from the heart of Chaya Chouksey — poet, storyteller, voice.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ebGaramond.variable}`}>
      <body className="font-body bg-parchment-50 text-ink-800 antialiased">
        {children}
      </body>
    </html>
  )
}
