import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { FloatingNodes } from '@/components/FloatingNodes'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white overflow-hidden">
      <Navigation />
      <FloatingNodes />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}