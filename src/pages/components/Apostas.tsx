import { PropsApostas } from '@/Types/Props'
import React from 'react'

const Apostas = ({ nome, cpf, numeros_apostados }: PropsApostas) => {
  return (
    <div className='flex w-full justify-between flex-col items-center gap-10 '>
      <div className='flex justify-between w-full '>
        <span className='text-xl text-white capitalize w-1/2'>{nome}</span>
        <span className='text-xl text-white capitalize flex justify-end w-1/2'>
          {cpf}
        </span>
      </div>

      <div className='flex gap-5 items-center w-/3'>
        {numeros_apostados.map((numero, index) => (
          <span
            key={index}
            className='flex text-xl w-14 h-14 font-semibold rounded-md justify-center items-center bg-white'
          >
            {numero}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Apostas
