import dynamic from 'next/dynamic'
import React from 'react'

const AnimatedNumbers = dynamic(
  () => {
    return import('react-animated-numbers')
  },
  {
    ssr: false,
  }
)

const numerosSorteados = [30, 40, 40, 40, 50, 50, 60, 100]

const Results = () => {
  return (
    <main>
      <div className='flex gap-20'>
        {numerosSorteados.map((numero, index) => (
          <AnimatedNumbers
            includeComma
            key={index}
            animateToNumber={numero}
            locale='pt-BR'
            className='text-md font-bold text-center w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'
          />
        ))}
      </div>
    </main>
  )
}

export default Results
