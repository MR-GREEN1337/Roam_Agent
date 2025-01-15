"use client"

import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          Built with ❤️ by Claude and Islam
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MR-GREEN1337"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/islam-hachimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}