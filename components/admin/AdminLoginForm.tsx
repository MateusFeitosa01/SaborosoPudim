"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Credenciais inválidas");
      return;
    }

    router.push("/admin");
  }

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 max-w-sm w-full mx-auto mt-10 sm:mt-20 px-4"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Login</h1>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-base"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-base"
        required
      />
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 font-semibold text-base"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
