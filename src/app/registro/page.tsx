"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const REGIONES = [
  "Andina",
  "Caribe",
  "Pacifica",
  "Orinoquia",
  "Amazonia",
  "Insular",
];

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    region: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }

    if (form.password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          name: form.name.trim(),
          region: form.region || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (typeof data.detail === "string") {
          setError(data.detail);
        } else if (Array.isArray(data.detail)) {
          setError(data.detail.map((d: { msg: string }) => d.msg).join(". "));
        } else {
          setError("Error al crear la cuenta");
        }
        return;
      }

      // Auto-login after registration
      const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      });

      if (loginRes.ok) {
        const tokens = await loginRes.json();
        localStorage.setItem("access_token", tokens.access_token);
        localStorage.setItem("refresh_token", tokens.refresh_token);
      }

      router.push("/feed");
    } catch {
      setError("No se pudo conectar con el servidor. Verifica que el backend este corriendo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex flex-col">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">MejorDicho!</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta</h2>
            <p className="text-gray-500">Unete a la comunidad y comparte la sabiduria de tu region</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Juan Carlos Gomez"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre de usuario *
                </label>
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  placeholder="juancho_paisa"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  autoComplete="username"
                  pattern="^[a-zA-Z0-9_]+$"
                  title="Solo letras, numeros y guiones bajos"
                  minLength={3}
                />
                <p className="text-xs text-gray-400 mt-1">Solo letras, numeros y guiones bajos (_)</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Correo electronico *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="juancho@correo.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Region (opcional)
                </label>
                <select
                  id="region"
                  value={form.region}
                  onChange={(e) => updateField("region", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                >
                  <option value="">Selecciona tu region</option>
                  {REGIONES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contrasena *
                </label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Minimo 8 caracteres"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirmar contrasena *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  placeholder="Repite tu contrasena"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !form.username || !form.email || !form.password || !form.name}
                className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer mt-2"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            Ya tienes cuenta?{" "}
            <Link href="/login" className="text-amber-600 font-medium hover:text-amber-700">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
