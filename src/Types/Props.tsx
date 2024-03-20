export interface PropsInput {
  type: string
  placeholder?: string
  setNumber?: (value: number) => void
  number?: number
  text?: string
  setText?: (value: string) => void
}

export interface PropsApostas {
  nome: string
  cpf: string
  numeros_apostados: number[]
}

export interface PropsSorteio {
  numeros_sorteados: number[]
  id_vencedores: number
}
