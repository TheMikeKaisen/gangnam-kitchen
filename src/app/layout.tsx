import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Outfit, Noto_Serif_KR } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gangnam Kitchen — Seoul Flavours, Crafted in Pune',
    template: '%s | Gangnam Kitchen',
  },
  description:
    'Gangnam Kitchen is Pune\'s most premium Korean dining experience. Authentic Seoul flavours, curated ingredients, and a luxurious K-culture ambience — right in the heart of Pune, India.',
  keywords: [
    'Korean restaurant Pune',
    'Korean food Pune',
    'Gangnam Kitchen',
    'Korean BBQ Pune',
    'Bibimbap Pune',
    'Korean café Pune',
    'best Korean restaurant India',
    'K-food Pune',
  ],
  authors: [{ name: 'Gangnam Kitchen' }],
  creator: 'Gangnam Kitchen',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gangnamkitchen.in',
    siteName: 'Gangnam Kitchen',
    title: 'Gangnam Kitchen — Seoul Flavours, Crafted in Pune',
    description:
      'Pune\'s most premium Korean dining experience. Authentic Seoul flavours in a luxurious K-culture setting.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gangnam Kitchen — Premium Korean Restaurant in Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gangnam Kitchen — Seoul Flavours, Crafted in Pune',
    description: 'Pune\'s most premium Korean dining experience.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#FDFCF8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${notoSerifKR.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ivory-50 text-charcoal-800 antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
