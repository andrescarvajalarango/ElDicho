import { getToken } from "./auth";
import { DichoWithRelations, DepartamentoData, CommentData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  }
  return { "Content-Type": "application/json" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformDicho(d: any): DichoWithRelations {
  return {
    id: d.id,
    text: d.text,
    meaning: d.meaning || null,
    author: d.author || null,
    isAnonymous: d.is_anonymous ?? false,
    createdAt: d.created_at,
    user: d.user || { id: "unknown", username: "usuario", name: "Usuario", avatar: null },
    departamento: d.departamento || { id: "unknown", name: "Desconocido", code: "UNK", region: "Desconocida" },
    _count: {
      likes: d.engagement?.likes ?? 0,
      comments: d.engagement?.comments ?? 0,
      shares: d.engagement?.shares ?? 0,
    },
    comments: (d.comments || []).map(transformComment),
    userLiked: d.user_liked ?? false,
    userShared: d.user_shared ?? false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformComment(c: any): CommentData {
  return {
    id: c.id,
    text: c.text,
    createdAt: c.created_at,
    user: c.user || { id: "unknown", username: "usuario", name: "Usuario", avatar: null },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformDepartamento(d: any): DepartamentoData {
  return {
    id: d.id,
    name: d.name,
    code: d.code,
    region: d.region,
    _count: {
      dichos: d.dicho_count ?? 0,
    },
  };
}

// --- Dichos ---

export async function fetchDichos(params?: {
  departamentoId?: string | null;
  page?: number;
  limit?: number;
}): Promise<{ dichos: DichoWithRelations[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> {
  const searchParams = new URLSearchParams();
  if (params?.departamentoId) searchParams.set("departamentoId", params.departamentoId);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const res = await fetch(`${API_URL}/api/v1/dichos?${searchParams}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Error al cargar dichos");

  const data = await res.json();
  return {
    dichos: (data.dichos || []).map(transformDicho),
    pagination: {
      page: data.pagination?.page ?? 1,
      limit: data.pagination?.limit ?? 20,
      total: data.pagination?.total ?? 0,
      totalPages: data.pagination?.total_pages ?? 0,
    },
  };
}

export async function createDicho(data: {
  text: string;
  meaning?: string | null;
  author?: string | null;
  isAnonymous: boolean;
  departamentoId: string;
}): Promise<DichoWithRelations> {
  const res = await fetch(`${API_URL}/api/v1/dichos`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      text: data.text,
      meaning: data.meaning || null,
      author: data.author || null,
      is_anonymous: data.isAnonymous,
      departamento_id: data.departamentoId,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Error al crear dicho");
  }

  const dicho = await res.json();
  return transformDicho(dicho);
}

// --- Departamentos ---

export async function fetchDepartamentos(): Promise<DepartamentoData[]> {
  const res = await fetch(`${API_URL}/api/v1/departamentos`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al cargar departamentos");

  const data = await res.json();
  return (data || []).map(transformDepartamento);
}

// --- Likes ---

export async function toggleLike(dichoId: string): Promise<{ liked: boolean }> {
  const res = await fetch(`${API_URL}/api/v1/dichos/${dichoId}/like`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Error al dar like");
  }

  return res.json();
}

// --- Comments ---

export async function addComment(dichoId: string, text: string): Promise<CommentData> {
  const res = await fetch(`${API_URL}/api/v1/dichos/${dichoId}/comment`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Error al comentar");
  }

  const comment = await res.json();
  return transformComment(comment);
}

// --- Shares ---

export async function shareDicho(dichoId: string): Promise<{ shared: boolean }> {
  const res = await fetch(`${API_URL}/api/v1/dichos/${dichoId}/share`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Error al compartir");
  }

  return res.json();
}
