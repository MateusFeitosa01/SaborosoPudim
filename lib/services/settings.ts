import { apiFetch, unwrapList } from "@/lib/api";
export interface Settings { id?: number; name?: string; phone?: string; whatsapp?: string; address?: string; taxa_entrega?: string | number; pedido_minimo?: string | number; loja_aberta?: boolean; horario_abertura?: string; horario_fechamento?: string }
export async function getSettings(): Promise<Settings> { const data = await apiFetch("/store/store/"); const list = unwrapList<Settings>(data); return list[0] || (data as Settings); }
