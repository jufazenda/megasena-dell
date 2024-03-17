import { PropsInput } from '@/Types/Props'
import React from 'react'

const Inputs = ({ type, placeholder }: PropsInput) => {
  return (
    <input
      className='flex bg-gray-200 w-full border-0 mb-4 p-4 text-md rounded-md focus:border-transparent focus:outline-none'
      type={type}
      placeholder={placeholder}
    />
  )
}

export default Inputs
