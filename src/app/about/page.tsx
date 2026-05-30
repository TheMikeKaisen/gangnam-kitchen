import { AboutPageContent } from '@/components/sections/AboutPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Gangnam Kitchen',
  description:
    "The story behind Pune's most premium Korean dining experience — born from a love of Seoul, built for Pune.",
}

export default function AboutPage() {
  return <AboutPageContent />
}