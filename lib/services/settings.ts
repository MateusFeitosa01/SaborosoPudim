import { supabase } from "@/lib/supabase";

export interface Settings {
  id: number;
  loja_nome: string;
  email: string;
  telefone: string;
  endereco: string;
  taxa_entrega: number;
  tempo_entrega: string;
}

/**
 * Pega a configuração da loja (registro único)
 */
export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw error;

  return data as Settings;
}

/**
 * Atualiza configuração da loja (registro único)
 */
export async function updateSettings(payload: {
  lojaNome: string;
  email: string;
  telefone: string;
  endereco: string;
  taxaEntrega: string | number;
  tempoEntrega: string;
}) {
  const { error } = await supabase
    .from("settings")
    .update({
      loja_nome: payload.lojaNome,
      email: payload.email,
      telefone: payload.telefone,
      endereco: payload.endereco,
      taxa_entrega: Number(payload.taxaEntrega),
      tempo_entrega: payload.tempoEntrega,
    })
    .eq("id", 1);

  if (error) throw error;
}