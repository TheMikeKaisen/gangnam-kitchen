import { GalleryPageContent } from '@/components/sections/GalleryPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery — Gangnam Kitchen',
  description:
    'A visual journey through Gangnam Kitchen — our food, our space, and the moments that make dining with us unforgettable.',
}

export default function GalleryPage() {
  return <GalleryPageContent />
}