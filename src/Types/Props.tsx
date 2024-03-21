//Arquivo de tipagem para os componentes

export interface PropsInput {
  type: string
  placeholder?: string
  setNumber?: (value: number) => void
  number?: number
  text?: string
  setText?: (value: string) => void
}

export interface PropsApostas {
  id?: number
  nome: string
  cpf: string
  numeros_apostados: number[]
}

export interface PropsSorteio {
  id: number
  numeros_sorteados: number[]
  id_vencedores: number
}

export interface PropsVencedores {
  id: number
  id_sorteio: number
  id_aposta: number
}

export interface ModalComponents {
  [key: string]: JSX.Element
}

export interface PropsConfirmarModal {
  setModalAtivo: (value: boolean) => void
}
