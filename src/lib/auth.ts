export type Role = "paciente" | "terapeuta" | "admin";

export interface SessionUser {
  nome: string;
  email: string;
  role: Role;
}

/**
 * Contas de teste (protótipo — sem backend).
 * Quando o Supabase Auth for integrado, isto é substituído.
 */
export const TEST_ACCOUNTS: Array<SessionUser & { senha: string }> = [
  {
    nome: "Marina Lopes",
    email: "paciente@myterapie.com",
    senha: "teste123",
    role: "paciente",
  },
  {
    nome: "Ana Beatriz",
    email: "terapeuta@myterapie.com",
    senha: "teste123",
    role: "terapeuta",
  },
];

const KEY = "myterapie_user";

export function login(email: string, senha: string): SessionUser | null {
  const acc = TEST_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.senha === senha,
  );
  if (!acc) return null;
  const user: SessionUser = { nome: acc.nome, email: acc.email, role: acc.role };
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(user));
  }
  return user;
}

export function setSession(user: SessionUser) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(user));
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function panelPath(role: Role) {
  return role === "terapeuta" ? "/painel" : role === "admin" ? "/admin" : "/paciente";
}
