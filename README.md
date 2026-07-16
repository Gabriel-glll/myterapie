# MyTerapie

Marketplace/SaaS premium que conecta **pacientes** e **terapeutas** (foco inicial em psicanalistas). Inspirado na Headspace — identidade turquesa + azul claro, modo claro e escuro.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · componentes próprios estilo shadcn/ui
- **Supabase** (Postgres + Auth) — scaffolding pronto em `src/lib/supabase`
- Deploy: **Vercel** (recomendado)

> O app roda em **modo demo** com dados de exemplo (`src/lib/data.ts`) sem precisar de backend. Ao configurar as variáveis do Supabase, a camada de dados real entra em ação.

## Rodar localmente

```bash
npm install
npm run dev
# http://localhost:3000
```

## Estrutura

```
src/
  app/
    (site)/          # site público: home, busca, perfil, planos, blog, login...
    painel/          # painel do terapeuta
    paciente/        # painel do paciente
    admin/           # painel administrativo
  components/        # UI, header, footer, cards, dashboard
  lib/               # dados demo, tipos, utils, clients Supabase
supabase/
  migrations/        # 0001_init.sql, 0002_rls.sql
```

## Banco de dados

As migrations em `supabase/migrations/` cobrem todas as entidades do escopo
(usuarios, pacientes, terapeutas, planos, assinaturas, especialidades,
abordagens, idiomas, avaliacoes, agendamentos, agenda_disponibilidade,
blog_posts, categorias, solicitacoes_categoria) + RLS.

Aplicar com a Supabase CLI:

```bash
supabase db push
```

## Configurar Supabase

1. Crie um projeto em supabase.com
2. Rode as migrations
3. Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/buscar` | Busca com filtros |
| `/terapeuta/[slug]` | Perfil / Landing Premium |
| `/para-terapeutas` · `/planos` | Aquisição de terapeutas |
| `/blog` · `/blog/[slug]` | Blog |
| `/entrar` · `/cadastro` | Autenticação (protótipo) |
| `/paciente` | Painel do paciente |
| `/painel` | Painel do terapeuta |
| `/admin` | Painel administrativo |
