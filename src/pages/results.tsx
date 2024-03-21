/* eslint-disable react-hooks/exhaustive-deps */

import { Noto_Sans } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { TrevoIconBlack } from '../../public/TrevoBlack'
import { TrevoIconWhite } from '../../public/TrevoWhite'
import { PropsApostas, PropsSorteio } from '@/Types/Props'
import {
  deleteAllApostas,
  deleteAllSorteios,
  deleteAllVencedores,
  getApostas,
  getSorteios,
  getVencedores,
  saveVencedores,
  verifyVencedores,
} from './api/supabaseFunctions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Confetti from './components/Confetti'
const noto = Noto_Sans({ subsets: ['latin'] })

const Results = () => {
  const router = useRouter()
  const redirectToBet = () => {
    router.push('/')
  }

  const [sorteios, setSorteios] = useState<PropsSorteio[]>([])
  const [aposta, setAposta] = useState<PropsApostas[]>([])
  const [vencedores, setVencedores] = useState<PropsApostas[]>([])
  const [numerosSorteados, setNumerosSorteados] = useState<number[]>([])

  const [countRodadas, setCountRodadas] = useState<number>(1)

  /* Na função abaixo, deveria gerar o array de até 25 números extras e verificar se existe algum vencedor dentre eles. 
  Porém, a função não está conseguindo limitar o valor de números no array. 
  Por falta de tempo para buscar uma solução melhor, mantive apenas para gerar um possível vencedor. */
  const getAllVencedores = async () => {
    const vencedoresCadastrados = await getVencedores()

    // Verifica se o número apostado está entre os números sorteados
    const matchVencedores = aposta.filter(aposta => {
      const numerosApostados = aposta.numeros_apostados
      const acertos = numerosApostados.filter(numero => {
        return numerosSorteados.includes(numero)
      })

      return acertos.length === 5
    })

    // Aqui deveria ser a função para gerar os números extras e verificar se existe algum vencedor dentre eles
    if (numerosSorteados.length < 30 && matchVencedores.length === 0) {
      let novoNumeroSorteado: number
      do {
        novoNumeroSorteado = Math.floor(Math.random() * 50) + 1 // Gera um número aleatório entre 1 e 50
      } while (numerosSorteados.includes(novoNumeroSorteado)) // Verifica se o número já foi sorteado

      setNumerosSorteados(prevState => [...prevState, novoNumeroSorteado])
      setCountRodadas(prevState => prevState + 1)
    }

    // Verifica se o vencedor já foi cadastrado
    if (vencedoresCadastrados && vencedoresCadastrados.length !== 0) {
      vencedoresCadastrados.forEach(async vencedor => {
        const response = await verifyVencedores(
          vencedor.id_aposta,
          vencedor.id_sorteio
        )
        if (response && response.length > 0) {
          return
        } else {
          if (matchVencedores.length !== 0) {
            for (let i = 0; i < matchVencedores.length; i++) {
              await saveVencedores(
                matchVencedores[i]?.id ?? 0,
                sorteios[0]?.id
              )
            }
          }
        }
      })
    } else {
      if (matchVencedores.length !== 0) {
        for (let i = 0; i < matchVencedores.length; i++) {
          await saveVencedores(
            matchVencedores[i]?.id ?? 0,
            sorteios[0]?.id
          )
        }
      }
    }

    setVencedores(matchVencedores)
  }

  useEffect(() => {
    // Função para buscar os valores do banco de dados ao carregar a página
    const fetch = async () => {
      try {
        const sorteioData = await getSorteios()
        if (sorteioData) {
          setSorteios(sorteioData)
          setNumerosSorteados(sorteioData[0].numeros_sorteados)
        }
        const apostasData = await getApostas()
        if (apostasData) {
          setAposta(apostasData)
        }
      } catch (error) {
        console.error('Erros:', error)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    if (vencedores.length === 0) {
      getAllVencedores()
    }
  }, [aposta, numerosSorteados])

  const numerosApostados = aposta.flatMap(
    aposta => aposta.numeros_apostados
  )

  const contagemNumeros: { [key: number]: number } = {}

  // Contar a quantidade de ocorrências de cada número apostado
  numerosApostados.forEach(numero => {
    contagemNumeros[numero] = (contagemNumeros[numero] || 0) + 1
  })

  // Ordenar os números apostados com base na quantidade de ocorrências
  const numerosOrdenados = Object.keys(contagemNumeros).sort(
    (a, b) => contagemNumeros[parseInt(b)] - contagemNumeros[parseInt(a)]
  )

  useEffect(() => {
    // Redireciona o usuário para a página de apostas caso ele tente acessar a página de resultados diretamente
    const fromBet = router.query.from === 'bet'

    if (!fromBet) {
      redirectToBet()
    }
  }, [])

  // Função de deletar todos os valores do banco de dados a cada nova aposta.
  const deleteValues = async () => {
    await deleteAllVencedores().then(() => {
      deleteAllApostas()
      deleteAllSorteios()
    })
  }

  return (
    <main
      className={`flex lg:max-h-screen items-center justify-center flex-col w-full lg:flex-row lg:overflow-hidden  ${noto.className}`}
    >
      <div className=' flex min-h-screen lg:w-1/2 justify-center items-center text-white bg-blue-secundario w-full '>
        <div className='flex gap-20 flex-col justify-center items-center'>
          <div className='flex w-full justify-between items-center px-20'>
            <span className=' flex gap-5 text-4xl font-semibold'>
              {TrevoIconWhite} Números Sorteados
            </span>
            <span className='flex border-2 p-3 rounded-md text-4xl font-semibold '>
              {countRodadas}
            </span>
          </div>
          <div className='flex gap-10 flex-wrap px-20 justify-center'>
            {numerosSorteados.map((numero, index) => (
              <span
                key={index}
                className='font-bold text-2xl w-20 h-20 bg-white text-black rounded-lg flex items-center justify-center'
              >
                {numero}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full lg:w-1/2 p-28 gap-16 lg:max-h-screen h-screen lg:overflow-y-auto'>
        <div className='flex flex-col w-full gap-16'>
          <div className='flex w-full justify-between items-center'>
            <span className='flex gap-5 items-center text-4xl font-semibold'>
              {TrevoIconBlack} Vencedores
            </span>
            <span className='flex bg-gray-200 p-3 rounded-md text-4xl font-semibold '>
              {vencedores.length}
            </span>
            <Link href={'/'}>
              <button
                className='bg-orange-padrao text-white rounded-md py-3 font-bold px-16 hover:shadow-2xl hover:bg-orange-light'
                onClick={deleteValues}
              >
                Novo Sorteio
              </button>
            </Link>
          </div>
          {vencedores.length ? (
            <div className='flex gap-8 flex-col'>
              {vencedores.map((venceu, index) => (
                <div className='flex gap-5 items-center' key={index}>
                  <div className='flex bg-gray-200 p-6 rounded-md justify-between w-full '>
                    <span className='text-xl capitalize w-1/3'>
                      {venceu.nome}
                    </span>
                    <span className='text-xl capitalize flex  w-1/3'>
                      {venceu.cpf}
                    </span>
                    <span className='text-xl capitalize flex justify-end w-1/3'>
                      {venceu.numeros_apostados.join(' | ')}
                    </span>
                  </div>
                  <Confetti />
                </div>
              ))}
            </div>
          ) : (
            <span className='text-xl font-semibold flex justify-center my-16'>
              Nenhum vencedor nesta rodada
            </span>
          )}
        </div>
        <div>
          <span className='flex gap-5 items-center text-4xl font-semibold'>
            {TrevoIconBlack} Números Apostados
          </span>
          <div className='flex p-6 rounded-md justify-between gap-44 w-full mt-10 font-semibold'>
            <span className='text-xl w-1/2'>Número</span>
            <span className='text-xl flex w-1/2'>
              Quantidade de Apostas
            </span>
          </div>
          <hr />
          {numerosOrdenados.map((numero, index) => (
            <>
              <div
                key={index}
                className='flex p-6 rounded-md justify-between gap-44 w-full '
              >
                <span className='text-xl capitalize  w-1/2'>{numero}</span>
                <span className='text-xl capitalize flex pr-2  w-1/2'>
                  {contagemNumeros[parseInt(numero)]}
                </span>
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Results
