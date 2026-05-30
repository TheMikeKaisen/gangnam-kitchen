import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { DishesSection } from '@/components/sections/DishesSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ReservationCTA } from '@/components/sections/ReservationCTA'

export const metadata: Metadata = {
  title: 'Gangnam Kitchen — Seoul Flavours, Crafted in Pune',
  description:
    "Pune's most premium Korean dining experience. Authentic Seoul flavours, curated ingredients, and a luxurious K-culture ambience.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DishesSection />
      <ExperienceSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationCTA />
      {/* Phase 4: Menu, Reservations, Contact, About pages */}
    </>
  )
}