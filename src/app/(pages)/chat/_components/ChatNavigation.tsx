"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function ChatNavigation() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-4 py-3 bg-white/80 dark:bg-gray-800/20 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
            <a href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600 bg-clip-text text-transparent"
          >
            Amal
          </motion.div>
          </a>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-800 dark:text-gray-300">Agent System Online</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 bg-white/80 dark:bg-gray-800/20 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}