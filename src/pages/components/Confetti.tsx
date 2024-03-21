import React, { useState, useEffect, useRef } from 'react'

const SHAPES = ['square', 'triangle']
const COLOR_DIGIT = 'ABCDEF1234567890'

const PresentIcon = (
  <svg
    fill='#000000'
    width='32px'
    height='32px'
    viewBox='0 0 32 32'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M32 10.015c0-1.104-0.895-2-2-2h-3.414c0.884-0.872 1.449-2.014 1.449-3.421 0-1.732-0.995-3.615-3.788-3.615-3.675 0-6.745 3.913-8.188 6.106-1.444-2.193-4.607-6.106-8.282-6.106-2.793 0-3.788 1.882-3.788 3.614 0 1.407 0.581 2.55 1.482 3.421h-3.472c-1.105 0-2 0.896-2 2v5.986h2.018v13.017c0 1.105 0.895 2 2 2h23.99c1.105 0 2-0.895 2-2v-13.018h1.992v-5.986zM24.247 2.981c1.236 0 1.788 0.52 1.788 1.615 0 2.221-2.479 3.42-4.811 3.42h-3.386c1.421-2.111 3.922-5.035 6.409-5.035zM7.778 2.981c2.487 0 5.083 2.924 6.504 5.034h-3.386c-2.332 0-4.905-1.229-4.905-3.451 0-1.095 0.551-1.583 1.788-1.583zM30 14.002h-13v-3.986h13v3.986zM2 10.015h13v3.986h-13zM4.018 16.002h10.982v13.018h-10.982zM28.008 29.020h-11.008v-13.017h11.008v13.017z'></path>
  </svg>
)

const Confetti = () => {
  const [isConfettiActive, setConfettiActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null) // Tipagem correta aqui

  useEffect(() => {
    if (isConfettiActive) {
      generateConfetti()
    }
  }, [isConfettiActive])

  const generateRandomColor = () => {
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)]
    }
    return color
  }

  const generateConfetti = () => {
    const container = containerRef.current
    if (container) {
      for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div')
        const positionX = Math.random() * window.innerWidth
        const positionY = Math.random() * window.innerHeight
        const rotation = Math.random() * 360
        const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5 // Set confetti styles
        confetti.style.left = `${positionX}px`
        confetti.style.top = `${positionY}px`
        confetti.style.transform = `rotate(${rotation}deg)`
        confetti.className =
          'confetti ' + SHAPES[Math.floor(Math.random() * 3)]
        confetti.style.width = `${size}px`
        confetti.style.height = `${size}px`
        confetti.style.backgroundColor = generateRandomColor() // Append confetti to the container
        container.appendChild(confetti)
        // Remove confetti element after animation duration (4 seconds)
        setTimeout(() => {
          container.removeChild(confetti)
        }, 3000)
      }
    }
  }

  const handleClick = () => {
    setConfettiActive(true)
    setTimeout(() => {
      setConfettiActive(false)
    }, 3000)
  }

  return (
    <div>
      <button className='font-bold text-xl' onClick={handleClick}>
        {PresentIcon}
      </button>
      <div
        className='fixed top-0 left-0 w-full h-full pointer-events-none'
        ref={containerRef}
        id='confetti-container'
      ></div>
    </div>
  )
}

export default Confetti
