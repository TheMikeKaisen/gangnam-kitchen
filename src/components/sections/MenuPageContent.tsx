'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { DISH_IMAGES } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight, Leaf, Flame } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All', korean: '전체' },
  { id: 'mains', label: 'Mains', korean: '주요리' },
  { id: 'bbq', label: 'BBQ', korean: '바베큐' },
  { id: 'noodles', label: 'Noodles & Rice', korean: '면 & 밥' },
  { id: 'street', label: 'Street Bites', korean: '길거리' },
  { id: 'desserts', label: 'Desserts', korean: '디저트' },
  { id: 'drinks', label: 'Drinks', korean: '음료' },
]

const menuItems = [
  // Mains
  {
    id: 'bibimbap',
    name: 'Bibimbap',
    koreanName: '비빔밥',
    description: 'Stone-pot rice with six seasonal vegetables, a slow-cooked egg, sesame oil, and our house-made gochujang paste. Mixed tableside.',
    price: 440,
    category: 'mains',
    tags: ['Vegetarian'],
    spice: 1,
    imageKey: 'bibimbap',
    featured: true,
  },
  {
    id: 'dolsot-bibimbap',
    name: 'Dolsot Bibimbap',
    koreanName: '돌솥비빔밥',
    description: 'Our signature bibimbap served in a scorching stone bowl — the bottom layer of rice crisps to perfection. Topped with grilled chicken.',
    price: 520,
    category: 'mains',
    tags: [],
    spice: 1,
    imageKey: 'bibimbap',
    featured: false,
  },
  {
    id: 'sundubu-jjigae',
    name: 'Sundubu Jjigae',
    koreanName: '순두부찌개',
    description: 'Silken tofu stew simmered in a fiery red broth with mushrooms, zucchini, and a cracked egg. Classic Korean comfort in a clay pot.',
    price: 420,
    category: 'mains',
    tags: ['Vegetarian', 'Spicy'],
    spice: 3,
    imageKey: 'tteokbokki',
    featured: false,
  },
  {
    id: 'korean-fried-chicken',
    name: 'Korean Fried Chicken',
    koreanName: '양념치킨',
    description: 'Double-fried for maximum crunch. Half glazed in gochujang-honey sauce, half in soy-garlic. Served with pickled radish and beer sauce.',
    price: 520,
    category: 'mains',
    tags: ['Bestseller'],
    spice: 2,
    imageKey: 'korean-fried-chicken',
    featured: true,
  },
  // BBQ
  {
    id: 'samgyeopsal',
    name: 'Samgyeopsal',
    koreanName: '삼겹살',
    description: 'Thick-cut pork belly marinated overnight in a blend of Korean pear, soy, and sesame. Grilled tableside over live charcoal. For two.',
    price: 980,
    category: 'bbq',
    tags: ['For Two', 'Signature'],
    spice: 0,
    imageKey: 'korean-bbq',
    featured: true,
  },
  {
    id: 'bulgogi',
    name: 'Bulgogi',
    koreanName: '불고기',
    description: 'Paper-thin beef sirloin marinated in soy, Asian pear, garlic, and ginger. Wok-kissed to caramelised perfection. With steamed rice.',
    price: 860,
    category: 'bbq',
    tags: ['Premium'],
    spice: 0,
    imageKey: 'korean-bbq',
    featured: false,
  },
  {
    id: 'dak-galbi',
    name: 'Dak Galbi',
    koreanName: '닭갈비',
    description: 'Spicy stir-fried chicken with rice cakes, cabbage, and sweet potato in a rich gochujang glaze. A Chuncheon classic.',
    price: 680,
    category: 'bbq',
    tags: ['Spicy'],
    spice: 3,
    imageKey: 'korean-bbq',
    featured: false,
  },
  // Noodles & Rice
  {
    id: 'ramen',
    name: 'Tonkotsu Ramen',
    koreanName: '라면',
    description: 'Eighteen-hour pork bone broth, springy ramen noodles, a 63°C marinated egg, chashu, bamboo shoots, and house kimchi.',
    price: 480,
    category: 'noodles',
    tags: ['Comfort'],
    spice: 1,
    imageKey: 'ramen',
    featured: true,
  },
  {
    id: 'kimchi-rice',
    name: 'Kimchi Bokkeumbap',
    koreanName: '김치볶음밥',
    description: '72-hour fermented kimchi wok-fried in sesame butter with rice, scallions, and a runny fried egg. Simple. Perfect.',
    price: 380,
    category: 'noodles',
    tags: ['Vegetarian'],
    spice: 2,
    imageKey: 'kimchi-rice',
    featured: false,
  },
  {
    id: 'jajangmyeon',
    name: 'Jajangmyeon',
    koreanName: '자장면',
    description: 'Thick wheat noodles in a rich black bean sauce with pork, onion, and zucchini. Korea\'s most beloved comfort noodle.',
    price: 420,
    category: 'noodles',
    tags: [],
    spice: 0,
    imageKey: 'ramen',
    featured: false,
  },
  // Street
  {
    id: 'tteokbokki',
    name: 'Tteokbokki',
    koreanName: '떡볶이',
    description: 'Silken rice cakes in a scarlet gochujang broth with fish cakes, scallions, and a soft-boiled egg. Seoul\'s most iconic street bite.',
    price: 360,
    category: 'street',
    tags: ['Vegan', 'Spicy'],
    spice: 3,
    imageKey: 'tteokbokki',
    featured: true,
  },
  {
    id: 'korean-corn-dog',
    name: 'Mozzarella Corn Dog',
    koreanName: '모짜렐라 핫도그',
    description: 'Stretchy mozzarella wrapped in a panko-rice flour batter, deep-fried to golden. Dusted with sugar, drizzled with mustard and ketchup.',
    price: 280,
    category: 'street',
    tags: ['Vegetarian'],
    spice: 0,
    imageKey: 'korean-corn-dog',
    featured: false,
  },
  {
    id: 'pajeon',
    name: 'Haemul Pajeon',
    koreanName: '해물파전',
    description: 'A crispy Korean seafood pancake loaded with prawns, squid, and spring onions. Served with a house soy-sesame dipping sauce.',
    price: 420,
    category: 'street',
    tags: [],
    spice: 0,
    imageKey: 'korean-fried-chicken',
    featured: false,
  },
  // Desserts
  {
    id: 'bingsu',
    name: 'Patbingsu',
    koreanName: '팥빙수',
    description: 'Fine-shaved milk ice, house-made sweet red bean paste, condensed milk, mochi bites, and seasonal fresh fruit.',
    price: 320,
    category: 'desserts',
    tags: ['Vegetarian'],
    spice: 0,
    imageKey: 'bingsu',
    featured: true,
  },
  {
    id: 'hotteok',
    name: 'Hotteok',
    koreanName: '호떡',
    description: 'Crispy pan-fried sweet pancakes filled with brown sugar, cinnamon, and crushed walnuts. A Seoul street winter classic.',
    price: 240,
    category: 'desserts',
    tags: ['Vegetarian'],
    spice: 0,
    imageKey: 'bingsu',
    featured: false,
  },
  // Drinks
  {
    id: 'sikhye',
    name: 'Sikhye',
    koreanName: '식혜',
    description: 'Traditional Korean sweet rice punch. Gently fermented, lightly chilled, and subtly fragrant with ginger. Non-alcoholic.',
    price: 180,
    category: 'drinks',
    tags: ['Non-Alcoholic', 'Vegetarian'],
    spice: 0,
    imageKey: 'bingsu',
    featured: false,
  },
  {
    id: 'soju-cocktail',
    name: 'Yuzu Soju Splash',
    koreanName: '유자 소주',
    description: 'House soju mixed with fresh yuzu juice, sparkling water, and a rim of Tajin salt. Light, citrusy, dangerously easy to drink.',
    price: 380,
    category: 'drinks',
    tags: ['Alcoholic'],
    spice: 0,
    imageKey: 'bingsu',
    featured: true,
  },
]

const spiceLabels = ['', 'Mild', 'Medium', 'Hot']

function SpiceIndicator({ level }: { level: number }) {
  if (level === 0) return null
  return (
    <div className="flex items-center gap-1">
      <Flame size={10} className="text-korean-red" />
      <span className="text-[0.6rem] text-korean-red" style={{ fontFamily: 'var(--font-outfit)' }}>
        {spiceLabels[level]}
      </span>
    </div>
  )
}

function MenuItem({
  item,
  index,
  isVisible,
}: {
  item: (typeof menuItems)[0]
  index: number
  isVisible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const imageData = DISH_IMAGES[item.imageKey as keyof typeof DISH_IMAGES]
  const src = imageData?.local || imageData?.fallback || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-start gap-5 py-6 border-b border-charcoal-100 cursor-default"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 shrink-0 overflow-hidden" style={{ borderRadius: '2px' }}>
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={item.name}
            fill quality={75}
            sizes="80px"
            className="object-cover"
          />
        </motion.div>
        {item.featured && (
          <div
            className="absolute bottom-0 inset-x-0 h-[2px] bg-korean-red"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h3
              className="font-display text-charcoal-800 group-hover:text-korean-red transition-colors duration-300 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '-0.01em' }}
            >
              {item.name}
            </h3>
            <span
              className="font-korean text-[0.65rem] text-charcoal-300"
              style={{ fontFamily: 'var(--font-noto-kr)' }}
            >
              {item.koreanName}
            </span>
          </div>
          <span
            className="font-display text-charcoal-700 shrink-0 leading-snug"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '1.1rem' }}
          >
            ₹{item.price}
          </span>
        </div>

        <p
          className="text-charcoal-400 leading-relaxed mb-2.5"
          style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.82rem' }}
        >
          {item.description}
        </p>

        {/* Tags + spice */}
        <div className="flex items-center gap-3 flex-wrap">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[0.58rem] tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'var(--font-outfit)',
                color: tag === 'Bestseller' || tag === 'Signature' || tag === 'Premium'
                  ? '#C8393A'
                  : tag === 'Vegetarian' || tag === 'Vegan'
                    ? '#5A8A5A'
                    : '#7E7C78',
              }}
            >
              {(tag === 'Vegetarian' || tag === 'Vegan') && <Leaf size={9} />}
              {tag}
            </span>
          ))}
          <SpiceIndicator level={item.spice} />
        </div>
      </div>
    </motion.div>
  )
}

export function MenuPageContent() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { ref: heroRef, isInView: heroVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { ref: menuRef, isInView: menuVisible } = useInView<HTMLDivElement>({ threshold: 0.03 })

  const filtered =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <main className="bg-ivory-50 overflow-x-hidden">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="pt-36 pb-16 lg:pt-44 lg:pb-20 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <div ref={heroRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-8 h-px bg-korean-red block" />
              <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>Our Menu</span>
              <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>메뉴</span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: '105%', opacity: 0 }}
                animate={heroVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-display font-light text-charcoal-800 leading-[0.92]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(3rem, 8vw, 8.5rem)', letterSpacing: '-0.03em' }}
              >
                Every dish,
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%', opacity: 0 }}
                animate={heroVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="font-display italic font-light leading-[0.92]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(3rem, 8vw, 8.5rem)', letterSpacing: '-0.03em', color: '#C8393A' }}
              >
                a memory.
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm"
          >
            <p className="text-charcoal-400 leading-relaxed mb-5" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.9rem' }}>
              Our menu changes with the season. The obsession with getting it right stays constant.
            </p>
            <div className="flex items-center gap-3 text-[0.65rem] text-charcoal-400" style={{ fontFamily: 'var(--font-outfit)' }}>
              <span className="flex items-center gap-1.5"><Leaf size={10} className="text-green-600" /> Vegetarian available</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Flame size={10} className="text-korean-red" /> Spice indicated</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Category Filter tabs ──────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-ivory-50/90 backdrop-blur-xl border-b border-charcoal-100">
        <div className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="relative shrink-0 px-4 py-2 transition-all duration-300 group"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    borderRadius: '1px',
                  }}
                >
                  <span
                    className="relative z-10 uppercase font-medium tracking-widest transition-colors duration-300"
                    style={{ color: isActive ? '#FDFCF8' : '#7E7C78' }}
                  >
                    {cat.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="menu-category-pill"
                      className="absolute inset-0 bg-charcoal-800"
                      style={{ borderRadius: '1px' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Menu list ─────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto py-12 lg:py-16">
        <div ref={menuRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Count + label */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {filtered.length} dishes
                </span>
                <span className="w-8 h-px bg-charcoal-200 block" />
                {activeCategory !== 'all' && (
                  <span
                    className="font-korean text-xs text-charcoal-300"
                    style={{ fontFamily: 'var(--font-noto-kr)' }}
                  >
                    {categories.find((c) => c.id === activeCategory)?.korean}
                  </span>
                )}
              </div>

              {/* Two-column on large screens */}
              <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-16">
                <div>
                  {filtered
                    .filter((_, i) => i % 2 === 0)
                    .map((item, i) => (
                      <MenuItem key={item.id} item={item} index={i} isVisible={menuVisible} />
                    ))}
                </div>
                <div>
                  {filtered
                    .filter((_, i) => i % 2 === 1)
                    .map((item, i) => (
                      <MenuItem key={item.id} item={item} index={i} isVisible={menuVisible} />
                    ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Menu footer CTA ───────────────────────────────────────────── */}
      <div className="border-t border-charcoal-100 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-charcoal-700 mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Ready to order?
            </p>
            <p className="text-sm text-charcoal-400" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
              Reserve your table and we'll have your favourites waiting.
            </p>
          </div>
          <Link
            href="/reservations"
            className="group flex items-center gap-3 px-8 py-4 bg-charcoal-800 text-ivory-100 hover:bg-korean-red transition-colors duration-400 no-underline shrink-0"
            style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            <span className="uppercase font-medium tracking-widest">Reserve a Table</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

    </main>
  )
}