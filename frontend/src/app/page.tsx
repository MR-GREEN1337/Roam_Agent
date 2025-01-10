import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { FloatingNodes } from '@/components/FloatingNodes'
import { Navigation } from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      <Navigation />
      <FloatingNodes />
      <Hero />
      <Features />
    </main>
  )
}