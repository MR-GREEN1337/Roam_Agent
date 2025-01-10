"use client"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 px-4 py-3 bg-black/20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          RoamAgent
        </motion.div>
        <div className="flex gap-4">
          <Button variant="ghost">Documentation</Button>
          <Button variant="ghost">GitHub</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
        </div>
      </div>
    </motion.nav>
  )
}