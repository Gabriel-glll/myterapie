-- MyTerapie — Row Level Security
-- Visitante lê perfis públicos; interações exigem autenticação.

alter table usuarios enable row level security;
alter table pacientes enable row level security;
alter table terapeutas enable row level security;
alter table agendamentos enable row level security;
alter table avaliacoes enable row level security;
alter table solicitacoes_categoria enable row level security;

-- Perfis de terapeuta são públicos (busca / landing pages)
create policy "terapeutas_public_read" on terapeutas
  for select using (true);

create policy "blog_public_read" on blog_posts
  for select using (publicado = true);

-- Usuário lê e edita o próprio registro
create policy "usuarios_self" on usuarios
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "pacientes_self" on pacientes
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "terapeutas_self_write" on terapeutas
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Agendamentos: paciente cria/vê os seus; terapeuta vê/atualiza os que recebe
create policy "agendamentos_paciente" on agendamentos
  for all using (auth.uid() = paciente_id) with check (auth.uid() = paciente_id);

create policy "agendamentos_terapeuta" on agendamentos
  for update using (auth.uid() = terapeuta_id);

create policy "agendamentos_terapeuta_read" on agendamentos
  for select using (auth.uid() = terapeuta_id);

-- Avaliações: leitura pública, escrita apenas por paciente autenticado
create policy "avaliacoes_public_read" on avaliacoes
  for select using (true);

create policy "avaliacoes_paciente_write" on avaliacoes
  for insert with check (auth.uid() = paciente_id);
