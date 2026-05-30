import type { Metadata } from 'next'
import { MenuPageContent } from '@/components/sections/MenuPageContent'

export const metadata: Metadata = {
  title: 'Menu — Gangnam Kitchen',
  description:
    'Explore our full Korean menu — from signature BBQ and Bibimbap to street-style Corn Dogs and Bingsu. Authentic Seoul flavours in Pune.',
}

export default function MenuPage() {
  return <MenuPageContent />
}