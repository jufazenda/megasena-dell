import { PropsApostas } from '@/Types/Props'
import React from 'react'

const Apostas = ({
  nome,
  cpf,
  num1,
  num2,
  num3,
  num4,
  num5,
}: PropsApostas) => {
  return (
    <div className='flex w-full justify-between flex-col items-center gap-10 '>
      <div className='flex justify-between w-full '>
        <span className='text-xl text-white capitalize w-1/2'>{nome}</span>
        <span className='text-xl text-white capitalize flex justify-end w-1/2'>
          {cpf}
        </span>
      </div>

      <div className='flex gap-5 items-center  w-/3'>
        <span className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white '>
          {num1}
        </span>
        <span className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white '>
          {num2}
        </span>
        <span className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white '>
          {num3}
        </span>
        <span className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white '>
          {num4}
        </span>
        <span className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white '>
          {num5}
        </span>
      </div>
    </div>
  )
}

export default Apostas
