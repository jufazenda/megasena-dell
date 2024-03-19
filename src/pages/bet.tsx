import React, { useEffect, useState } from 'react'
import { Noto_Sans } from 'next/font/google'
import Head from 'next/head'
import Inputs from './components/Inputs'
import Image from 'next/image'
import Apostas from './components/Apostas'
import supabase from './api/supabase'
import { PropsApostas } from '@/Types/Props'
import Link from 'next/link'

const noto = Noto_Sans({ subsets: ['latin'] })

const TrevoIconWhite = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='36'
    zoomAndPan='magnify'
    viewBox='0 0 375 374.999991'
    height='36'
    preserveAspectRatio='xMidYMid meet'
    version='1.0'
  >
    <path
      fill='#ffffff'
      d='M 183.105469 170.691406 C 184.277344 171.863281 185.867188 172.523438 187.527344 172.523438 C 189.183594 172.523438 190.773438 171.863281 191.945312 170.691406 L 265.328125 97.257812 C 287.546875 75.042969 287.546875 38.890625 265.328125 16.671875 C 254.578125 5.921875 240.277344 0 225.0625 0 C 211.113281 0 197.933594 4.972656 187.507812 14.128906 C 177.15625 4.992188 163.953125 0 149.9375 0 C 134.671875 0 120.363281 5.925781 109.671875 16.671875 C 87.453125 38.890625 87.453125 75.039062 109.671875 97.257812 Z M 118.519531 25.5 C 126.859375 17.117188 138.019531 12.5 149.9375 12.5 C 161.859375 12.5 173.015625 17.117188 181.371094 25.515625 L 183.105469 27.246094 C 184.289062 28.429688 186.082031 29.070312 187.566406 29.074219 C 189.238281 29.0625 190.835938 28.382812 192.003906 27.183594 L 193.628906 25.511719 C 202.019531 17.121094 213.183594 12.5 225.0625 12.5 C 236.9375 12.5 248.101562 17.121094 256.492188 25.511719 C 264.890625 33.910156 269.515625 45.078125 269.515625 56.964844 C 269.515625 68.851562 264.890625 80.019531 256.492188 88.421875 L 187.523438 157.433594 L 118.507812 88.421875 C 110.109375 80.019531 105.484375 68.851562 105.484375 56.964844 C 105.484375 45.078125 110.109375 33.910156 118.519531 25.5 Z M 118.519531 25.5 '
      fillOpacity='1'
      fillRule='nonzero'
    />
    <path
      fill='#ffffff'
      d='M 183.054688 204.308594 L 109.671875 277.742188 C 98.910156 288.5 92.984375 302.808594 92.984375 318.035156 C 92.984375 333.261719 98.910156 347.570312 109.671875 358.328125 C 120.421875 369.078125 134.722656 375 149.9375 375 C 163.886719 375 177.066406 370.027344 187.492188 360.871094 C 197.84375 370.007812 211.046875 375 225.058594 375 C 240.328125 375 254.636719 369.074219 265.328125 358.328125 C 276.085938 347.570312 282.015625 333.261719 282.015625 318.035156 C 282.015625 302.808594 276.085938 288.5 265.328125 277.742188 L 191.894531 204.308594 C 189.550781 201.964844 185.398438 201.957031 183.054688 204.308594 Z M 256.492188 286.578125 C 264.890625 294.980469 269.515625 306.148438 269.515625 318.035156 C 269.515625 329.921875 264.890625 341.089844 256.480469 349.5 C 248.140625 357.882812 236.980469 362.5 225.0625 362.5 C 213.140625 362.5 201.984375 357.882812 193.628906 349.484375 L 191.894531 347.753906 C 190.722656 346.582031 189.132812 345.925781 187.476562 345.925781 C 187.460938 345.925781 187.445312 345.925781 187.429688 345.925781 C 185.757812 345.9375 184.160156 346.617188 182.996094 347.816406 L 181.371094 349.488281 C 172.980469 357.878906 161.816406 362.5 149.9375 362.5 C 138.0625 362.5 126.898438 357.878906 118.507812 349.488281 C 110.109375 341.089844 105.484375 329.921875 105.484375 318.035156 C 105.484375 306.148438 110.109375 294.980469 118.507812 286.578125 L 187.476562 217.566406 Z M 256.492188 286.578125 '
      fillOpacity='1'
      fillRule='nonzero'
    />
    <path
      fill='#ffffff'
      d='M 358.328125 109.671875 C 347.570312 98.910156 333.261719 92.984375 318.035156 92.984375 C 302.808594 92.984375 288.5 98.910156 277.742188 109.671875 L 204.308594 183.105469 C 203.136719 184.277344 202.476562 185.867188 202.476562 187.527344 C 202.476562 189.183594 203.136719 190.773438 204.308594 191.945312 L 277.742188 265.328125 C 288.5 276.089844 302.808594 282.015625 318.035156 282.015625 C 333.261719 282.015625 347.570312 276.089844 358.328125 265.328125 C 369.078125 254.578125 375 240.277344 375 225.0625 C 375 211.113281 370.027344 197.933594 360.871094 187.507812 C 370.007812 177.15625 375 163.953125 375 149.941406 C 375 134.671875 369.074219 120.363281 358.328125 109.671875 Z M 347.816406 192.003906 L 349.488281 193.628906 C 357.878906 202.019531 362.5 213.183594 362.5 225.0625 C 362.5 236.9375 357.882812 248.101562 349.488281 256.492188 C 341.089844 264.890625 329.921875 269.515625 318.035156 269.515625 C 306.148438 269.515625 294.980469 264.890625 286.582031 256.492188 L 217.566406 187.523438 L 286.582031 118.507812 C 294.980469 110.109375 306.148438 105.484375 318.035156 105.484375 C 329.921875 105.484375 341.09375 110.109375 349.5 118.519531 C 357.886719 126.859375 362.5 138.019531 362.5 149.9375 C 362.5 161.859375 357.886719 173.015625 349.484375 181.371094 L 347.753906 183.105469 C 346.574219 184.289062 345.914062 185.894531 345.925781 187.566406 C 345.9375 189.238281 346.617188 190.839844 347.816406 192.003906 Z M 347.816406 192.003906 '
      fillOpacity='1'
      fillRule='nonzero'
    />
    <path
      fill='#ffffff'
      d='M 16.671875 265.328125 C 27.429688 276.089844 41.738281 282.015625 56.964844 282.015625 C 72.191406 282.015625 86.5 276.089844 97.257812 265.328125 L 170.691406 191.894531 C 171.863281 190.722656 172.523438 189.132812 172.523438 187.472656 C 172.523438 185.816406 171.863281 184.226562 170.691406 183.054688 L 97.257812 109.671875 C 86.5 98.910156 72.191406 92.984375 56.964844 92.984375 C 41.738281 92.984375 27.429688 98.910156 16.671875 109.671875 C 5.921875 120.421875 0 134.722656 0 149.9375 C 0 163.886719 4.972656 177.066406 14.128906 187.492188 C 4.992188 197.84375 0 211.046875 0 225.0625 C 0 240.328125 5.925781 254.636719 16.671875 265.328125 Z M 27.183594 182.996094 L 25.511719 181.371094 C 17.121094 172.980469 12.5 161.816406 12.5 149.9375 C 12.5 138.0625 17.121094 126.898438 25.511719 118.507812 C 33.910156 110.109375 45.078125 105.484375 56.964844 105.484375 C 68.851562 105.484375 80.019531 110.109375 88.421875 118.507812 L 157.433594 187.476562 L 88.421875 256.492188 C 80.019531 264.890625 68.851562 269.515625 56.964844 269.515625 C 45.078125 269.515625 33.910156 264.890625 25.5 256.480469 C 17.117188 248.140625 12.5 236.980469 12.5 225.0625 C 12.5 213.140625 17.117188 201.984375 25.515625 193.628906 L 27.246094 191.894531 C 28.429688 190.710938 29.085938 189.105469 29.074219 187.433594 C 29.0625 185.761719 28.382812 184.160156 27.183594 182.996094 Z M 27.183594 182.996094 '
      fillOpacity='1'
      fillRule='nonzero'
    />
  </svg>
)

const Bet = () => {
  const [idAposta, setIdAposta] = useState(1000)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [num3, setNum3] = useState(0)
  const [num4, setNum4] = useState(0)
  const [num5, setNum5] = useState(0)
  const [allApostas, setAllApostas] = useState<PropsApostas[]>([])

  const getApostas = async () => {
    const { data, error } = await supabase
      .from('Apostas')
      .select('*')
      .order('nome')

    if (error) {
      console.error('Erro ao buscar dados:', error.message)
      return
    }
    setAllApostas(data)
  }

  const saveAposta = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const { data: ultimaAposta, error } = await supabase
      .from('Apostas')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Erro ao buscar a última aposta:', error.message)
      return
    }

    const lastId = ultimaAposta.length > 0 ? ultimaAposta[0].id : 1000
    const nextId = lastId + 1

    const response = await supabase.from('Apostas').insert([
      {
        id: nextId,
        nome: nome,
        cpf: cpf,
        numeros_apostados: [num1, num2, num3, num4, num5],
      },
    ])

    if (response.error) {
      throw response.error
    } else {
      setIdAposta(nextId)
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

  useEffect(() => {
    getApostas()
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
              <button className='bg-orange-padrao text-white rounded-md py-3 font-bold px-16 hover:shadow-2xl hover:bg-orange-light'>
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
