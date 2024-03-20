import dynamic from 'next/dynamic'
import { Noto_Sans } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { TrevoIconBlack } from '../../public/TrevoBlack'
import { TrevoIconWhite } from '../../public/TrevoWhite'
import supabase from './api/supabase'
import { PropsApostas, PropsSorteio } from '@/Types/Props'
import { getApostas, getSorteios } from './api/supabaseFunctions'
const noto = Noto_Sans({ subsets: ['latin'] })

const AnimatedNumbers = dynamic(
  () => {
    return import('react-animated-numbers')
  },
  {
    ssr: false,
  }
)

const Results = () => {
  const [sorteios, setSorteios] = useState<PropsSorteio[]>([])
  const [aposta, setAposta] = useState<PropsApostas[]>([])
  const [numerosSorteados, setNumerosSorteados] = useState<number[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const sorteioData = await getSorteios()
        if (sorteioData) {
          setNumerosSorteados(sorteioData[0].numeros_sorteados)
        }
       /*  const apostasData = await getApostas()
        if (apostasData) {
          setAposta(apostasData)
        } */
      } catch (error) {
        console.error('Erros:', error)
      }
    }

    fetch()
  }, [])

  console.log(numerosSorteados)

  /*   const getVencedores = async () => {
    const { data, error } = await supabase
      .from('Apostas')
      .select('*')
      .order('nome')

    if (error) {
      console.error('Erro ao buscar dados:', error.message)
      return
    }
    setAposta(data)
  }

  useEffect(() => {
    setTimeout(() => {
      getVencedores()
    }, 3000)
  }, []) */

  const saveSorteio = async () => {
    const response = await supabase.from('Sorteios').insert([
      {
        numeros_sorteados: numerosSorteados.map(numero => Number(numero)),
        id_aposta: 1,
      },
    ])

    if (response.error) {
      throw response.error
    } else {
      /*  setIdAposta(nextId)
    setNome('')
    setCpf('')
    setNum1(1)
    setNum2(1)
    setNum3(1)
    setNum4(1)
    setNum5(1) */
    }
  }
  return (
    <main
      className={`flex lg:max-h-screen items-center justify-center flex-col w-full lg:flex-row lg:overflow-hidden  ${noto.className}`}
    >
      <div className=' flex min-h-screen lg:w-1/2 justify-center items-center text-white bg-blue-secundario w-full '>
        <div className='flex gap-20 flex-col justify-center items-center'>
          <span className=' flex gap-5 text-4xl font-semibold'>
            {TrevoIconWhite} Números Sorteados
          </span>
          <div className='flex gap-10'>
            {numerosSorteados.map((numero, index) => (
              <AnimatedNumbers
                key={index}
                includeComma
                animateToNumber={numero}
                locale='en-US'
                transitions={index => ({
                  type: 'tween',
                  duration: index + 2,
                })}
                fontStyle={{
                  fontSize: 40,
                }}
                className='font-bold w-20 h-20 bg-white text-black rounded-lg flex items-center justify-center'
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full lg:w-1/2 p-28 gap-16 lg:max-h-screen h-screen lg:overflow-y-auto'>
        <span className='flex gap-5 items-center text-4xl font-semibold'>
          {TrevoIconBlack} Vencedores
        </span>
        <div className='flex gap-8 flex-col'>
          {/*  {sorteios ? (
            sorteios.map((sorteio, index) => (
              <div
                key={index}
                className='flex bg-gray-200 p-6 rounded-md justify-between w-full '
              >
                <span className='text-xl capitalize w-1/2'>{sorteio.}</span>
                <span className='text-xl capitalize flex justify-end w-1/2'>
                  {sorteio}
                </span>
              </div>
            ))
          ) : (
            <span className='text-xl font-semibold flex justify-center mt-20'>
              Nenhum vencedor nesta rodada
            </span>
          )} */}
        </div>
      </div>
    </main>
  )
}
export default Results
