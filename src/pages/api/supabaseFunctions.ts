import { PropsApostas, PropsSorteio, PropsVencedores } from '@/Types/Props'
import supabase from './supabase'

//Arquivo de funções do Supabase

export const getApostas = async (): Promise<
  PropsApostas[] | undefined
> => {
  const { data, error } = await supabase
    .from('Apostas')
    .select('*')
    .order('nome')

  if (error) {
    console.error('Erro ao buscar dados:', error.message)
    return
  } else {
    return data
  }
}

export const saveApostas = async (
  nome: string,
  cpf: string,
  num1: number,
  num2: number,
  num3: number,
  num4: number,
  num5: number
) => {
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

  return response
}

export const saveSorteios = async (numerosSorteados: number[]) => {
  const response = await supabase.from('Sorteios').insert([
    {
      numeros_sorteados: numerosSorteados,
    },
  ])

  return response
}

export const getSorteios = async (): Promise<
  PropsSorteio[] | undefined
> => {
  const { data, error } = await supabase
    .from('Sorteios')
    .select('*')
    .order('id')

  if (error) {
    console.error('Erro ao buscar dados:', error.message)
    return
  } else {
    return data
  }
}

export const getVencedores = async (): Promise<
  PropsVencedores[] | undefined
> => {
  const { data, error } = await supabase
    .from('Vencedores')
    .select('*')
    .order('id')

  if (error) {
    console.error('Erro ao buscar dados:', error.message)
    return
  } else {
    return data
  }
}

export const verifyVencedores = async (
  idAposta: number,
  idSorteio: number
) => {
  const { data: vencedoresExistente, error: errorVencedoresExistente } =
    await supabase
      .from('Vencedores')
      .select('*')
      .eq('id_aposta', idAposta)
      .eq('id_sorteio', idSorteio)

  if (errorVencedoresExistente) {
    console.error(
      'Erro ao verificar se o vencedor já existe:',
      errorVencedoresExistente.message
    )
    return
  } else {
    return vencedoresExistente
  }
}

export const saveVencedores = async (
  idAposta: number,
  idSorteio: number
) => {
  const { data: vencedor, error: errorVencedor } = await supabase
    .from('Vencedores')
    .insert([{ id_aposta: idAposta, id_sorteio: idSorteio }])

  if (errorVencedor) {
    console.error('Erro ao salvar o vencedor:', errorVencedor.message)
    return
  } else {
    return vencedor
  }
}

export const deleteAllVencedores = async () => {
  const { data, error } = await supabase
    .from('Vencedores')
    .delete()
    .neq('id', 0)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteAllSorteios = async () => {
  const { data, error } = await supabase
    .from('Sorteios')
    .delete()
    .neq('id', 0)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteAllApostas = async () => {
  const { data, error } = await supabase
    .from('Apostas')
    .delete()
    .neq('id', 0)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
