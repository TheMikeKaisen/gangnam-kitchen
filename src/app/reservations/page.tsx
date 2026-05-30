import { ReservationsPageContent } from '@/components/sections/ReservationsPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reservations — Gangnam Kitchen',
  description:
    'Reserve your table at Gangnam Kitchen, Pune\'s most premium Korean dining experience. Book online or call us directly.',
}

export default function ReservationsPage() {
  return <ReservationsPageContent />
}