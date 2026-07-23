# Landing Page do Terapeuta — Padrão e Variáveis

Este documento define o **modelo padronizado** da landing page e **quais partes são
variáveis** (preenchidas pelo terapeuta no configurador em `/painel/landing`).

O fluxo é:

1. O terapeuta responde o questionário no painel (`/painel/landing`).
2. O site gera um arquivo **`.md`** com as respostas e ele baixa.
3. O terapeuta envia o `.md` → você me envia → eu crio a landing a partir deste padrão.

---

## Estrutura padrão (fixa)

Toda landing segue o mesmo esqueleto e componentes da plataforma
(`/terapeuta/[slug]/landing`). O que muda são os valores das variáveis e
quais seções ficam ligadas.

Ordem das seções:

1. **Hero / Introdução** — foto, nome, título, frase de destaque, subtítulo, CTA.
2. **Sobre** — texto do profissional.
3. **Especialidades** — chips de temas/abordagens.
4. **Vídeo** — embed do YouTube (opcional).
5. **Depoimentos** — avaliações de pacientes.
6. **Agenda** — widget de agendamento / botão.
7. **Blog / Artigos** — lista de conteúdos (opcional).
8. **FAQ** — perguntas e respostas (opcional).
9. **Localização / Mapa** — cidade/estado.
10. **Redes sociais** — Instagram, WhatsApp.
11. **CTA final** — chamada para agendar.

---

## Variáveis (o que o usuário define)

### Identidade
- `nome` — nome do profissional
- `titulo` — profissão/título
- `slug` — endereço: `myterapie.com/{slug}`
- `corPrincipal` — hex
- `corSecundaria` — hex
- `estilo` — Minimalista | Aconchegante | Moderno | Clássico | Premium
- `modo` — Claro | Escuro | Ambos

### Seções ligadas/desligadas
`hero, sobre, especialidades, video, depoimentos, blog, agenda, faq, localizacao, redes`

### Conteúdo
- `heroFrase`, `heroSub`
- `sobreTexto`
- `especialidades[]`
- `videoLink`
- `faqTexto` (linhas `Pergunta | Resposta`)

### Contato / CTA
- `whatsapp`, `instagram`, `email`, `cidade`, `estado`
- `ctaTexto`, `ctaDestino` (Agenda | WhatsApp | Formulário)

### Livre
- `observacoes` — pedidos específicos

---

## Formato do `.md` gerado

O configurador gera um `.md` com as seções: Profissional, Identidade visual,
Seções ativas (checklist), Conteúdo, Contato, CTA e Observações. Basta me enviar
esse arquivo que eu monto a página.
