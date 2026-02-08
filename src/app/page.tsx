"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import ColombiaMap from "@/components/ColombiaMap";
import DichoFeed from "@/components/DichoFeed";
import CreateDichoModal from "@/components/CreateDichoModal";
import { DichoWithRelations, DepartamentoData } from "@/lib/types";

const DEMO_USER_ID = "demo-user-001";

export default function Home() {
  const [dichos, setDichos] = useState<DichoWithRelations[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoData[]>([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchDichos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDepartamento) {
        params.set("departamentoId", selectedDepartamento);
      }
      const res = await fetch(`/api/dichos?${params}`);
      const data = await res.json();
      setDichos(data.dichos);
    } finally {
      setLoading(false);
    }
  }, [selectedDepartamento]);

  useEffect(() => {
    fetch("/api/departamentos")
      .then((res) => res.json())
      .then(setDepartamentos);
  }, []);

  useEffect(() => {
    fetchDichos();
  }, [fetchDichos]);

  const selectedDeptName = selectedDepartamento
    ? departamentos.find((d) => d.id === selectedDepartamento)?.name
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header onCreateClick={() => setShowCreateModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Sabidur&iacute;a popular colombiana
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Descubre, comparte y preserva los dichos y refranes que hacen parte
            de nuestra identidad cultural
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map sidebar */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Explora por departamento
              </h3>
              <ColombiaMap
                departamentos={departamentos}
                selectedDepartamento={selectedDepartamento}
                onSelectDepartamento={setSelectedDepartamento}
              />
            </div>
          </aside>

          {/* Feed */}
          <section className="lg:col-span-8 xl:col-span-8">
            {selectedDeptName && (
              <div className="mb-4 flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="text-sm font-medium text-amber-800">
                  Filtrando por: <strong>{selectedDeptName}</strong>
                </span>
              </div>
            )}
            <DichoFeed
              dichos={dichos}
              loading={loading}
              currentUserId={DEMO_USER_ID}
              selectedDepartamento={selectedDepartamento}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="font-bold text-gray-800">ElDicho</span>
            </div>
            <p className="text-sm text-gray-400">
              Preservando la sabidur&iacute;a popular de Colombia
            </p>
          </div>
        </div>
      </footer>

      <CreateDichoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={fetchDichos}
        departamentos={departamentos}
        currentUserId={DEMO_USER_ID}
      />
    </div>
  );
}
