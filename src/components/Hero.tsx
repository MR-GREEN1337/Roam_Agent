"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-4">
      <div className="max-w-4xl text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          Build AI Agents
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent">
            {" "}Without Code
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
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
          <a href="/chat">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Agent
            </Button>
          </a>
          {/*
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            View Templates
          </Button>
          */}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          No coding required • Multiple frameworks supported • Instant deployment
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9] 
        }}
        className="w-full max-w-5xl px-4"
      >
        <div className="relative w-full pt-[56.25%]">
          {/* Main iframe container */}
          <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-900/80 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
            <iframe
              src="/demo.webm"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-gray-900/20 to-transparent" />
          
          {/* Decorative edge glow */}
          <div className="absolute -inset-px rounded-xl pointer-events-none bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm" />
          
          {/* Extra shadow for depth */}
          <div className="absolute -inset-px rounded-xl pointer-events-none shadow-lg shadow-purple-500/10" />
        </div>
      </motion.div>
    </div>
  )
}