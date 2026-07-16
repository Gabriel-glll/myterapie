-- MyTerapie — Schema inicial
-- Entidades: usuarios, pacientes, terapeutas, planos, assinaturas,
-- especialidades, abordagens, idiomas, avaliacoes, agendamentos,
-- agenda_disponibilidade, blog_posts, categorias, solicitacoes_categoria

create extension if not exists "pgcrypto";

-- Enums -----------------------------------------------------------------
create type user_role as enum ('paciente', 'terapeuta', 'admin');
create type plan_tier as enum ('inicial', 'completo', 'premium');
create type modalidade as enum ('online', 'presencial');
create type solicitacao_status as enum ('pendente', 'aprovado', 'recusado', 'alteracao');
create type recorrencia as enum ('unica', 'semanal', 'quinzenal');
create type slot_estado as enum ('livre', 'indisponivel');

-- Usuários (espelha auth.users) -----------------------------------------
create table usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text unique not null,
  role user_role not null default 'paciente',
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Catálogos -------------------------------------------------------------
create table especialidades (id serial primary key, nome text unique not null);
create table abordagens (id serial primary key, nome text unique not null);
create table idiomas (id serial primary key, nome text unique not null);
create table categorias (id serial primary key, nome text unique not null, tipo text not null);

-- Planos ----------------------------------------------------------------
create table planos (
  tier plan_tier primary key,
  nome text not null,
  preco numeric(10,2) not null,
  descricao text,
  recursos jsonb not null default '[]'
);

-- Pacientes -------------------------------------------------------------
create table pacientes (
  id uuid primary key references usuarios(id) on delete cascade,
  telefone text,
  cidade text,
  estado text,
  favoritos uuid[] default '{}',
  created_at timestamptz not null default now()
);

-- Terapeutas ------------------------------------------------------------
create table terapeutas (
  id uuid primary key references usuarios(id) on delete cascade,
  slug text unique not null,
  titulo text,
  foto_url text,
  cidade text,
  estado text,
  modalidades modalidade[] default '{}',
  publicos text[] default '{}',
  sobre text,
  formacao text[] default '{}',
  preco numeric(10,2),
  plano plan_tier not null default 'inicial',
  destaque boolean default false,
  agenda_aberta boolean default true,
  convenio boolean default false,
  primeira_gratuita boolean default false,
  atendimento_social boolean default false,
  video_url text,
  instagram text,
  whatsapp text,
  crp text,
  nota_media numeric(2,1) default 0,
  total_avaliacoes int default 0,
  created_at timestamptz not null default now()
);

-- Relações N:N ----------------------------------------------------------
create table terapeuta_especialidades (
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  especialidade_id int references especialidades(id) on delete cascade,
  primary key (terapeuta_id, especialidade_id)
);
create table terapeuta_abordagens (
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  abordagem_id int references abordagens(id) on delete cascade,
  primary key (terapeuta_id, abordagem_id)
);
create table terapeuta_idiomas (
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  idioma_id int references idiomas(id) on delete cascade,
  primary key (terapeuta_id, idioma_id)
);

-- Assinaturas -----------------------------------------------------------
create table assinaturas (
  id uuid primary key default gen_random_uuid(),
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  tier plan_tier not null,
  ativa boolean default true,
  inicio timestamptz not null default now(),
  fim timestamptz
);

-- Agenda ----------------------------------------------------------------
create table agenda_disponibilidade (
  id uuid primary key default gen_random_uuid(),
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  dia_semana int not null check (dia_semana between 0 and 6),
  horario time not null,
  estado slot_estado not null default 'livre'
);

create table agendamentos (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid references pacientes(id) on delete cascade,
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  data date not null,
  horario time not null,
  recorrencia recorrencia not null default 'unica',
  observacoes text,
  status solicitacao_status not null default 'pendente',
  created_at timestamptz not null default now()
);

-- Avaliações ------------------------------------------------------------
create table avaliacoes (
  id uuid primary key default gen_random_uuid(),
  terapeuta_id uuid references terapeutas(id) on delete cascade,
  paciente_id uuid references pacientes(id) on delete cascade,
  nota int not null check (nota between 1 and 5),
  comentario text,
  created_at timestamptz not null default now(),
  unique (terapeuta_id, paciente_id)
);

-- Blog ------------------------------------------------------------------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumo text,
  conteudo text,
  categoria text,
  autor text,
  capa_url text,
  publicado boolean default false,
  created_at timestamptz not null default now()
);

-- Solicitações de nova categoria ---------------------------------------
create table solicitacoes_categoria (
  id uuid primary key default gen_random_uuid(),
  solicitante_id uuid references usuarios(id) on delete set null,
  tipo text not null,
  valor text not null,
  status solicitacao_status not null default 'pendente',
  created_at timestamptz not null default now()
);

-- Índices ---------------------------------------------------------------
create index idx_terapeutas_cidade on terapeutas (cidade, estado);
create index idx_agendamentos_terapeuta on agendamentos (terapeuta_id, status);
create index idx_avaliacoes_terapeuta on avaliacoes (terapeuta_id);
