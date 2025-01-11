"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-4xl text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Build AI Agents
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {" "}Without Code
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Create, customize, and deploy powerful AI agents through a simple chat interface. 
          Choose your framework, define your goals, and launch your agent in minutes.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Create Agent
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent">
            View Templates
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm text-gray-400"
        >
          No coding required • Multiple frameworks supported • Instant deployment
        </motion.div>
      </div>
    </div>
  )
}