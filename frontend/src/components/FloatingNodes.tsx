"use client"

import { useEffect, useRef } from 'react'

export function FloatingNodes() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const nodes = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }))
    
    const drawNodes = () => {
      const canvas = document.createElement('canvas')
      const container = containerRef.current
      if (!container) return
      
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      container.innerHTML = ''
      container.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'
        
        nodes.forEach((node, i) => {
          node.x += Math.sin(Date.now() * 0.001 + i) * 0.5
          node.y += Math.cos(Date.now() * 0.001 + i) * 0.5
          
          ctx.beginPath()
          ctx.arc(
            (node.x * canvas.width) / 100,
            (node.y * canvas.height) / 100,
            node.size,
            0,
            Math.PI * 2
          )
          ctx.fill()
        })
        
        requestAnimationFrame(animate)
      }
      
      animate()
    }
    
    drawNodes()
    window.addEventListener('resize', drawNodes)
    
    return () => window.removeEventListener('resize', drawNodes)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
    />
  )
}