import { ContactPageContent } from '@/components/sections/ContactPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Gangnam Kitchen',
  description:
    'Get in touch with Gangnam Kitchen, Pune. For reservations, private dining, events, and general enquiries.',
}

export default function ContactPage() {
  return <ContactPageContent />
}