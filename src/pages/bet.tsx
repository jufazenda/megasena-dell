import React, { useEffect, useState } from 'react'
import { Noto_Sans } from 'next/font/google'
import Head from 'next/head'
import Inputs from './components/Inputs'
import Image from 'next/image'
import Apostas from './components/Apostas'
import supabase from './api/supabase'
import { PropsApostas } from '@/Types/Props'
import Link from 'next/link'
import { TrevoIconWhite } from '../../public/TrevoWhite'
import {
  getApostas,
  saveApostas,
  saveSorteios,
} from './api/supabaseFunctions'

const noto = Noto_Sans({ subsets: ['latin'] })

const Bet = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [num3, setNum3] = useState(0)
  const [num4, setNum4] = useState(0)
  const [num5, setNum5] = useState(0)
  const [allApostas, setAllApostas] = useState<PropsApostas[]>([])

  const saveAposta = async (e: { preventDefault: () => void }) => {
    const response = await saveApostas(
      nome,
      cpf,
      num1,
      num2,
      num3,
      num4,
      num5
    )

    if (response?.error) {
      throw response.error
    } else {
      setNome('')
      setCpf('')
      setNum1(1)
      setNum2(1)
      setNum3(1)
      setNum4(1)
      setNum5(1)
    }

    getApostas()
  }

  const saveSorteio = async () => {
    const numAleatorio = (
      min: number,
      max: number,
      excludedNumbers: string | any[]
    ) => {
      let num: string | number
      do {
        num = String(Math.floor(Math.random() * (max - min + 1)) + min)
      } while (excludedNumbers.includes(num))
      return num
    }

    const randomNumbers: number[] = []
    while (randomNumbers.length < 5) {
      const newNumber = Number(numAleatorio(1, 50, randomNumbers))
      randomNumbers.push(newNumber)
    }

    const response = await saveSorteios(randomNumbers)

    if (response?.error) {
      throw response.error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apostasData = await getApostas()
        if (apostasData) {
          setAllApostas(apostasData)
        }
      } catch (error) {
        console.error('Erro ao buscar apostas:', error)
      }
    }

    fetchData()
  }, [])

  const apostaSurpresa = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const numAleatorio = (
      min: number,
      max: number,
      excludedNumbers: string | any[]
    ) => {
      let num: string | number
      do {
        num = String(Math.floor(Math.random() * (max - min + 1)) + min)
      } while (excludedNumbers.includes(num))
      return num
    }

    const randomNumbers = []
    while (randomNumbers.length < 5) {
      const newNumber = numAleatorio(1, 50, randomNumbers)
      randomNumbers.push(newNumber)
    }

    // Atribuindo números aos inputs
    setNum1(Number(randomNumbers[0]))
    setNum2(Number(randomNumbers[1]))
    setNum3(Number(randomNumbers[2]))
    setNum4(Number(randomNumbers[3]))
    setNum5(Number(randomNumbers[4]))
  }

  return (
    <>
      <Head>
        <title>IT Academy</title>
      </Head>
      <main
        className={`flex lg:max-h-screen items-center justify-center flex-col w-full lg:flex-row lg:overflow-hidden  ${noto.className}`}
      >
        <div className=' flex min-h-screen lg:w-1/2'>
          <form className='flex flex-col gap-10 p-28 justify-center items-center'>
            <div className='flex mb-10'>
              <Image src={'/2.svg'} alt={'a'} width={100} height={100} />
            </div>
            <Inputs
              type='text'
              placeholder='Nome'
              text={nome}
              setText={setNome}
            />
            <Inputs
              type='text'
              placeholder='CPF'
              text={cpf}
              setText={setCpf}
            />
            <span className='text-xl'>Escolha seus números:</span>
            <div className='flex gap-20'>
              <Inputs type='number' number={num1} setNumber={setNum1} />
              <Inputs type='number' number={num2} setNumber={setNum2} />
              <Inputs type='number' number={num3} setNumber={setNum3} />
              <Inputs type='number' number={num4} setNumber={setNum4} />
              <Inputs type='number' number={num5} setNumber={setNum5} />
            </div>
            <button
              className='bg-blue-secundario text-white rounded-md py-3 font-bold w-full hover:shadow-2xl hover:bg-blue-padrao'
              title='Gera números aleatórios'
              onClick={apostaSurpresa}
            >
              Aposta Surpresa
            </button>

            <button
              className='bg-orange-padrao hover:shadow-2xl hover:bg-orange-light text-white py-5 rounded-md font-bold w-1/2'
              onClick={saveAposta}
            >
              Apostar
            </button>
          </form>
        </div>

        <div className='bg-blue-secundario flex flex-col w-full lg:w-1/2 p-28 gap-16 lg:max-h-screen h-screen lg:overflow-y-auto'>
          <div className='flex w-full justify-between'>
            <span className=' flex gap-5 text-white text-4xl font-semibold'>
              {TrevoIconWhite} Apostas Registradas
            </span>
            <Link href={'results'}>
              <button
                className='bg-orange-padrao text-white rounded-md py-3 font-bold px-16 hover:shadow-2xl hover:bg-orange-light'
                onClick={saveSorteio}
              >
                Sortear
              </button>
            </Link>
          </div>

          {allApostas.length ? (
            allApostas.map((aposta, index) => (
              <Apostas
                key={index}
                nome={aposta.nome}
                cpf={aposta.cpf}
                numeros_apostados={aposta.numeros_apostados}
              />
            ))
          ) : (
            <span className='text-white text-2xl text-center mt-20'>
              Sem apostas registradas
            </span>
          )}
        </div>
      </main>
    </>
  )
}

export default Bet
