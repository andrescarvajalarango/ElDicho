"use client";

import { DichoWithRelations } from "@/lib/types";
import DichoCard from "./DichoCard";

interface DichoFeedProps {
  dichos: DichoWithRelations[];
  loading: boolean;
  currentUserId: string;
  selectedDepartamento: string | null;
}

export default function DichoFeed({
  dichos,
  loading,
  currentUserId,
  selectedDepartamento,
}: DichoFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gray-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-full" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (dichos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          {selectedDepartamento
            ? "No hay dichos para este departamento"
            : "No hay dichos aun"}
        </h3>
        <p className="text-gray-400 text-sm">
          {selectedDepartamento
            ? "Se el primero en compartir un dicho de esta region"
            : "Comienza compartiendo el primer dicho colombiano"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dichos.map((dicho) => (
        <DichoCard
          key={dicho.id}
          dicho={dicho}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
