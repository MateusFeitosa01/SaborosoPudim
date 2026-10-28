export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
export const DJANGO_BASE_URL = (() => {
  try {
    const url = new URL(API_BASE_URL);
    url.pathname = url.pathname.replace(/\/api\/?$/, "").replace(/\/$/, "") || "/";
    return `${url.origin}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return API_BASE_URL.replace(/\/api$/, "");
  }
})();

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

let accessTokenMemory: string | null = null;
let refreshTokenMemory: string | null = null;

export function getAccessToken() {
  return accessTokenMemory;
}

export function setTokens(access: string, refresh?: string) {
  accessTokenMemory = access;
  if (refresh) refreshTokenMemory = refresh;
}

export function getRefreshToken() {
  return refreshTokenMemory;
}

export function clearTokens() {
  accessTokenMemory = null;
  refreshTokenMemory = null;
}

export async function apiFetch(path: string, options: RequestInit = {}, authenticated = false) {
  const headers = new Headers(options.headers);
  if (authenticated) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", "Bearer " + token);
  }
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text();
  if (!response.ok) {
    const error = new Error(typeof data === "string" ? data : "Erro na comunicaÃ§Ã£o com o servidor") as ApiError;
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export function unwrapList<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

export function mediaUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${DJANGO_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
