export type PlanTier = "inicial" | "completo" | "premium";

export type Publico =
  | "Infantil"
  | "Adolescente"
  | "Adulto"
  | "Idoso"
  | "Casal"
  | "Familiar";

export type Modalidade = "Online" | "Presencial";

export type Genero = "homem" | "mulher";

export interface Disponibilidade {
  manha: boolean;
  tarde: boolean;
  noite: boolean;
}

export interface Diferencial {
  texto: string;
  tags: string[];
}

export interface Avaliacao {
  id: string;
  paciente: string;
  nota: number; // 1..5
  comentario: string;
  data: string;
}

export interface Terapeuta {
  id: string;
  slug: string;
  nome: string;
  titulo: string; // ex: Psicanalista clínico
  foto: string;
  cidade: string;
  estado: string;
  genero: Genero;
  disponibilidade: Disponibilidade;
  modalidades: Modalidade[];
  especialidades: string[];
  abordagens: string[];
  idiomas: string[];
  publicos: Publico[];
  preco: number; // valor da consulta
  sobre: string;
  formacao: string[];
  plano: PlanTier;
  destaque: boolean;
  agendaAberta: boolean;
  convenio: boolean;
  primeiraGratuita: boolean;
  atendimentoSocial: boolean;
  notaMedia: number;
  totalAvaliacoes: number;
  avaliacoes: Avaliacao[];
  video?: string;
  instagram?: string;
  whatsapp?: string;
  crp?: string;
}

export interface Plano {
  tier: PlanTier;
  nome: string;
  preco: number;
  descricao: string;
  recursos: string[];
  destaque?: boolean;
}

export interface Artigo {
  slug: string;
  titulo: string;
  categoria: string;
  autor: string;
  resumo: string;
  fonteNome: string;
  fonteUrl: string;
}

export interface BlogPost {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  autor: string;
  data: string;
  leitura: string;
  capa: string;
  conteudo: string[];
}
