import { PropsInput } from '@/Types/Props'
import React from 'react'

const Inputs = ({
  type,
  placeholder,
  setNumber,
  number,
  text,
  setText,
}: PropsInput) => {
  return (
    <input
      className='flex bg-gray-200 w-full border-0 mb-4 p-4 text-md rounded-md focus:border-transparent focus:outline-none'
      type={type}
      placeholder={placeholder}
      value={number || text}
      onChange={e => {
        if (setNumber) {
          setNumber(+e.target.value)
        } else if (setText) {
          setText(e.target.value)
        }
      }}
    />
  )
}

export default Inputs
