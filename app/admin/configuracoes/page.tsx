"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Shield, Bell } from "lucide-react";
import { useState } from "react";
import { updateSettings } from "@/lib/services/settings";

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState({
    lojaNome: "Leve Pudim",
    email: "contato@levepudim.com",
    telefone: "(83) 9 9999-9999",
    endereco: "João Pessoa, PB",
    taxaEntrega: "10.00",
    tempoEntrega: "24-48 horas",
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await updateSettings(settings);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar settings:", err);
      alert("Erro ao salvar configurações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Settings className="text-amber-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">
            ✓ Configurações salvas com sucesso!
          </p>
        </div>
      )}

      {/* LOJA */}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-lg font-semibold">Informações da Loja</h2>

        <div>
          <Label>Nome</Label>
          <Input
            value={settings.lojaNome}
            onChange={(e) =>
              setSettings({ ...settings, lojaNome: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            value={settings.email}
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Telefone</Label>
          <Input
            value={settings.telefone}
            onChange={(e) =>
              setSettings({ ...settings, telefone: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Endereço</Label>
          <Input
            value={settings.endereco}
            onChange={(e) =>
              setSettings({ ...settings, endereco: e.target.value })
            }
          />
        </div>
      </div>

      {/* ENTREGA */}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-lg font-semibold">Entrega</h2>

        <div>
          <Label>Taxa</Label>
          <Input
            type="number"
            value={settings.taxaEntrega}
            onChange={(e) =>
              setSettings({ ...settings, taxaEntrega: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Tempo</Label>
          <Input
            value={settings.tempoEntrega}
            onChange={(e) =>
              setSettings({ ...settings, tempoEntrega: e.target.value })
            }
          />
        </div>
      </div>

      {/* BOTÃO */}
      <Button
        onClick={handleSave}
        disabled={loading}
        className="bg-amber-600 hover:bg-amber-700 w-full"
      >
        {loading ? "Salvando..." : "Salvar Configurações"}
      </Button>
    </div>
  );
}