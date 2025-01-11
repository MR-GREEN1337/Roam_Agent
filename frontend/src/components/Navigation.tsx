"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 px-4 py-3 bg-black/20 dark:bg-black/20 backdrop-blur-md border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            Amal
          </motion.div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-96 gap-3 p-4 bg-white dark:bg-gray-900">
                    <div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg">
                      <h5 className="font-medium">Agent Builder</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create custom AI agents through chat</p>
                    </div>
                    <div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg">
                      <h5 className="font-medium">Visual Workflows</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Design agent behavior visually</p>
                    </div>
                    <div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg">
                      <h5 className="font-medium">Deployment</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">One-click agent deployment</p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Pricing
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Templates
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign In
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Start Free
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800"
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