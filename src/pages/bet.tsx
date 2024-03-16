import React from 'react'
import { Noto_Sans } from 'next/font/google'
import Head from 'next/head'
import Inputs from './components/Inputs'

const noto = Noto_Sans({ subsets: ['latin'] })

const Bet = () => {
  const apostasTestes = [
    {
      nome: 'teste',
      cpf: '52631664820',
      num1: 15,
      num2: 30,
      num3: 34,
      num4: 8,
      num5: 24,
    },
    {
      nome: 'exemplo1',
      cpf: '12345678901',
      num1: 10,
      num2: 20,
      num3: 30,
      num4: 40,
      num5: 50,
    },
    {
      nome: 'exemplo2',
      cpf: '98765432109',
      num1: 7,
      num2: 14,
      num3: 21,
      num4: 28,
      num5: 35,
    },
    {
      nome: 'exemplo3',
      cpf: '13579246800',
      num1: 3,
      num2: 6,
      num3: 9,
      num4: 12,
      num5: 15,
    },
  ]

  return (
    <>
      <Head>
        <title>IT Academy</title>
      </Head>
      <main
        className={`flex min-h-screen items-center justify-center  ${noto.className}`}
      >
        <div className=' flex min-h-screen w-1/2'>
          <form className='flex flex-col gap-10 p-28 justify-center items-center'>
            <Inputs type='text' placeholder='Nome' />
            <Inputs type='text' placeholder='CPF' />
            <span className='text-xl'>Escolha seus números:</span>
            <div className='flex gap-20'>
              <Inputs type='number' />
              <Inputs type='number' />
              <Inputs type='number' />
              <Inputs type='number' />
              <Inputs type='number' />
            </div>
            <button className='bg-blue-padrao py-3 font-bold w-full'>
              Gerar Número Aleatório
            </button>

            <button className='bg-yellow-padrao py-5 font-bold w-1/2'>
              Apostar
            </button>
          </form>
        </div>

        <div className='bg-blue-padrao flex flex-col min-h-screen w-1/2 p-28 gap-16'>
          <span className='text-4xl font-semibold'>
            Apostas Registradas
          </span>
          {apostasTestes.map((aposta, index) => (
            <div key={index} className='flex w-full justify-between'>
              <span className='text-xl'>{aposta.nome}</span>
              <span>{aposta.cpf}</span>
              <div>
                <span className='inline-block'>{aposta.num1}</span>
                <hr className='inline-block border-l border-black mx-2 h-6' />
                <span className='inline-block'>{aposta.num2}</span>
                <hr className='inline-block border-l border-black mx-2 h-6' />
                <span className='inline-block'>{aposta.num3}</span>
                <hr className='inline-block border-l border-black mx-2 h-6' />
                <span className='inline-block'>{aposta.num4}</span>
                <hr className='inline-block border-l border-black mx-2 h-6' />
                <span className='inline-block'>{aposta.num5}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Bet
