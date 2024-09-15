'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ScrollDownArrow() {
  const [opacity, setOpacity] = useState(1) // Start with full opacity
  const [isDelayed, setIsDelayed] = useState(false) // State to control the delay

  // Delay the component rendering by 5 seconds
  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsDelayed(true) // Set to true after 5 seconds
    }, 1200)

    return () => clearTimeout(delayTimeout)
  }, [])

  useEffect(() => {
    if (!isDelayed) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fadeStartPoint = 0
      const fadeEndPoint = windowHeight * 0.3 // Fade out by 30% of screen height

      if (scrollPosition >= fadeStartPoint && scrollPosition <= fadeEndPoint) {
        const fadeRange = fadeEndPoint - fadeStartPoint
        const fadeProgress = (scrollPosition - fadeStartPoint) / fadeRange
        setOpacity(1 - fadeProgress)
      } else if (scrollPosition > fadeEndPoint) {
        setOpacity(0)
      } else {
        setOpacity(1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDelayed]) // Depend on isDelayed

  if (!isDelayed) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-custom-bounce transition-opacity0"
      style={{ opacity }}
    >
      <ChevronDown className="w-8 h-8 text-primary" />
    </div>
  )
}
