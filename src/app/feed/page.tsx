"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import ColombiaMap from "@/components/ColombiaMap";
import DichoFeed from "@/components/DichoFeed";
import CreateDichoModal from "@/components/CreateDichoModal";
import { DichoWithRelations, DepartamentoData } from "@/lib/types";
import { fetchDichos, fetchDepartamentos } from "@/lib/api";
import { fetchCurrentUser, isLoggedIn, CurrentUser } from "@/lib/auth";

export default function FeedPage() {
  const [dichos, setDichos] = useState<DichoWithRelations[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoData[]>([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      if (isLoggedIn()) {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  const loadDichos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDichos({
        departamentoId: selectedDepartamento,
      });
      setDichos(data.dichos);
    } catch (err) {
      console.error("Error loading dichos:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedDepartamento]);

  useEffect(() => {
    fetchDepartamentos()
      .then(setDepartamentos)
      .catch((err) => console.error("Error loading departamentos:", err));
  }, []);

  useEffect(() => {
    if (authChecked) {
      loadDichos();
    }
  }, [loadDichos, authChecked]);

  const selectedDeptName = selectedDepartamento
    ? departamentos.find((d) => d.id === selectedDepartamento)?.name
    : null;

  const handleCreateClick = () => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <Header onCreateClick={handleCreateClick} currentUser={currentUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Sabiduria popular colombiana
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Descubre, comparte y preserva los dichos y refranes que hacen parte
            de nuestra identidad cultural
          </p>
        </div>

        {/* Mobile map toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {selectedDeptName
                ? `Filtrando: ${selectedDeptName}`
                : "Explorar mapa de Colombia"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${showMap ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMap && (
            <div className="mt-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <ColombiaMap
                departamentos={departamentos}
                selectedDepartamento={selectedDepartamento}
                onSelectDepartamento={setSelectedDepartamento}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Desktop sidebar map */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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

          <section className="lg:col-span-8 xl:col-span-8">
            {selectedDeptName && (
              <div className="mb-4 flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium text-amber-800">
                  Filtrando por: <strong>{selectedDeptName}</strong>
                </span>
                <button
                  onClick={() => setSelectedDepartamento(null)}
                  className="ml-auto text-amber-600 hover:text-amber-800 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <DichoFeed
              dichos={dichos}
              loading={loading}
              selectedDepartamento={selectedDepartamento}
              isLoggedIn={!!currentUser}
            />
          </section>
        </div>
      </main>

      {currentUser && (
        <CreateDichoModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreated={loadDichos}
          departamentos={departamentos}
        />
      )}
    </div>
  );
}
